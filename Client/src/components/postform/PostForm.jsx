import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index.js";
import appwriteService from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, reset, control } = useForm({
        defaultValues: {
            title: "",
            slug: "",
            content: "",
            status: "",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Reset form values when `post` changes
    useEffect(() => {
        if (post) {
            reset({
                title: post.title,
                slug: post.slug || post.$id || "",
                content: post.content,
                status: post.status,
            });
        }
    }, [post, reset]);

    const slugTransform = useCallback((value) => {
        return value
            ?.trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
            .replace(/\s+/g, "-") || "";
    }, []);

    useEffect(() => {
        const subscription = watch(({ title }, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(title));
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
        const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

        if (post) {
            if (file) appwriteService.deleteFile(post.featuredImage);
            const updatedPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file?.$id,
            });
            if (updatedPost) navigate(`/post/${updatedPost.$id}`);
        } else {
            if (file) data.featuredImage = file.$id;
            const newPost = await appwriteService.createPost({
                ...data,
                userId: userData.$id,
            });
            if (newPost) {
                appwriteService.createStatistics(newPost.$id);
                navigate(`/post/${newPost.$id}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-4">
            <div className="w-full lg:w-2/3 px-2 space-y-4">
                <Input
                    label="Title :"
                    placeholder="Title"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }
                />
                <RTE
                    label="Content :"
                    control={control}
                    onChange={(content) => setValue("content", content, { shouldValidate: true })}
                />
            </div>

            <div className="w-full lg:w-1/3 px-2 space-y-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    accept="image/*"
                    {...register("image", { required: !post })}
                />
                {post?.featuredImage && (
                    <div>
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}
                />
                <Button type="submit" className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
