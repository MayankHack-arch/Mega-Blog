import React from 'react';
import appwriteService from '../appwrite/config.js';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative w-full h-48 bg-gray-200">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
