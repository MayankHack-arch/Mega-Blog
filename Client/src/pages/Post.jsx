import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { Button, Container } from "../components/index.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth.js";

function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const [stats, setStats] = useState({ views: 0, likes: [] });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post?.userId === userData.$id : false;
    const [authorName, setAuthorName] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subLoading, setSubLoading] = useState(true);

    useEffect(() => {
        const fetchPostData = async () => {
            if (!slug) return navigate("/");
            try {
                const post = await appwriteService.getPost(slug);
                if (!post) return navigate("/");
                setPost(post);

                // Fetch author's name
                const name = await authService.getUserName(post.userId);
                setAuthorName(name);

                // Fetch statistics
                if (userData?.$id !== post.userId) {
                    await appwriteService.incrementView(slug);
                }
                const stats = await appwriteService.getStats(slug);
                setStats(stats);

                // Check if the user is subscribed
                if (userData) {
                    const subscribed = await appwriteService.ifUserSubscribed(userData.$id, post.userId);
                    setIsSubscribed(subscribed);
                }
            } catch (error) {
                console.error("Error fetching post data:", error);
                navigate("/");
            } finally{
                setSubLoading(false)
            }
        };

        fetchPostData();
    }, [slug, navigate, userData]);

    const deletePost = async () => {
        if (!post) return;
        try {
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                await appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleLike = async () => {
        try {
            const updatedStats = await appwriteService.toggleLike(slug, userData?.$id);
            setStats(updatedStats);
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleSubscribe = async () => {
        try {
            await appwriteService.subscribeTo(userData.$id, post.userId);
            setIsSubscribed(true);
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    };

    const handleUnSubscribe = async () => {
        try {
            await appwriteService.unSubscribeTo(userData.$id, post.userId);
            setIsSubscribed(false);
        } catch (error) {
            console.error("Error unsubscribing:", error);
        }
    };

    if (!post) {
        return (
            <div className="py-8 flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="py-8 bg-gray-100 min-h-screen">
            <Container>
                {/* Post Image Section */}
                <div className="relative mb-6">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full max-h-[400px] object-cover rounded-xl shadow-lg"
                    />
                    {isAuthor && (
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="shadow-md">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" className="shadow-md" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Post Title and Content */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
                    <div className="prose max-w-none mb-6">{parse(post.content)}</div>

                    {/* Like and Views Section */}
                    <div className="flex items-center space-x-4">
                        <button
                            className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                                stats.likes.includes(userData?.$id)
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-300 text-gray-700"
                            }`}
                            onClick={handleLike}
                            disabled={!userData}
                        >
                            {stats.likes.includes(userData?.$id) ? "Unlike" : "Like"} ({stats.likes.length})
                        </button>
                        <span className="text-gray-600">{stats.views} Views</span>
                    </div>

                    {!isAuthor && (
                        <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-md">
                            <h3 className="text-lg font-bold">Post Author: {authorName}</h3>
                           {subLoading ? (<button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg" disabled>
                                    Loading...
                                </button>) : isSubscribed ? (
                                <Button bgColor="bg-red-500" className="mt-2" onClick={handleUnSubscribe}>
                                    Unsubscribe
                                </Button>
                            ) : (
                                <Button bgColor="bg-blue-500" className="mt-2" onClick={handleSubscribe}>
                                    Subscribe
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Post;
