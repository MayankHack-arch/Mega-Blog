const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDbId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteStatisticCollectionId: String(import.meta.env.VITE_APPWRITE_STATISTICS_COLLECTION_ID),
    appwriteSubscribersCollectionId: String(import.meta.env.VITE_APPWRITE_SUBSCRIBERS_COLLECTION_ID) ,
}

export default conf;