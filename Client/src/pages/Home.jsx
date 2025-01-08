import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config.js';
import { Container, PostCard } from '../components/index.js';
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';

function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state)=> state.auth.userData);

    useEffect(() => {
        if(!userData){
            setPosts([]);
            return;
        }
        const queries = [Query.notEqual('userId', userData.$id)]

        appwriteService.getAllPosts(queries).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, [userData]);

    if (posts.length === 0) {
        return (
            <div className="w-full py-16 text-center bg-gray-50">
                <Container>
                    <div className="flex items-center justify-center h-full">
                        <div className="text-2xl font-bold text-gray-600">
                            Login to read posts or Check network connectivity
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-16 bg-gray-50">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
            <div className="">
                <h2></h2>
            </div>
        </div>
    );
}

export default Home;
