import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config.js';
import { Container, PostCard } from '../components/index.js';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        appwriteService.getAllPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                console.log(posts);
            }
        });
    }, []);
    
    return (
        <div className="w-full py-8 bg-gray-100">
            <Container>
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">All Posts</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <PostCard
                            key={post.$id}
                            $id={post.$id}
                            title={post.title}
                            featuredImage={post.featuredImage}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
