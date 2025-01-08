import conf from '../config/conf.js';
import {Client, ID, Databases, Storage, Query} from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDbId, conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
            )
        } catch (error) {
            console.log("Appwrite service createpost error", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwritee update post error", error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service delete post error", error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite service getpost error", error)
            return false
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getAllPosts :: error", error)
            return false
        }
    }

    //file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("apwrite error uploadfile", error)
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service deleteFile error: ", error)
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
    // next are statistics
    
    async createStatistics(slug){
        try {
            console.log(`static collection id ${conf.appwriteStatisticCollectionId}`)
            return await this.databases.createDocument(conf.appwriteDbId, conf.appwriteStatisticCollectionId, slug,{
                articleId: slug,
                views: 0,
                likes: []
            } )
        } catch (error) {
            console.error("Error creating statistics:", error);
            throw new Error("Failed to create statistics.");
        }
    }
    async incrementView(slug){
        try {
            const statistics = await this.databases.getDocument(conf.appwriteDbId, conf.appwriteStatisticCollectionId, slug);
            return await this.databases.updateDocument(conf.appwriteDbId, conf.appwriteStatisticCollectionId, slug,{
                views: statistics.views + 1
            })
        } catch (error) {
            console.error("Error incrementing views", error);
            throw new Error("Failed to increment views.");
        }
    }
    async toggleLike(slug, userId){
        try {
            const statistics = await this.databases.getDocument(conf.appwriteDbId, conf.appwriteStatisticCollectionId, slug);
            let likes = statistics.likes || [];
            if(likes.includes(userId)){
                likes = likes.filter(Id => Id !== userId)
            }else{
                likes.push(userId)
            }
            return await this.databases.updateDocument(conf.appwriteDbId, conf.appwriteStatisticCollectionId, slug,{likes})
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    }
    async getStats(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDbId, conf.appwriteStatisticCollectionId, slug);
        } catch (error) {
            console.error("Error getting stats:", error);
        }
    }
    // subscribe section
    async subscribeTo(subscriberId, channelId){
        console.log(`sub ${subscriberId} chan ${channelId}`)
        try{
            return await this.databases.createDocument(conf.appwriteDbId, conf.appwriteSubscribersCollectionId, ID.unique(),{
                subscriberId,
                channelId
            })
        }catch(error){
            console.error("Error creating subscriber document:", error);
        }
    }
    async unSubscribeTo(subscriberId, channelId){
        try {
            const queries = [Query.equal('subscriberId', subscriberId), Query.equal('channelId', channelId)]
            const result = await this.databases.listDocuments(conf.appwriteDbId, conf.appwriteSubscribersCollectionId, queries)
            if(result.documents.length > 0){
                const documentId = result.documents[0].$id;
                await this.databases.deleteDocument(conf.appwriteDbId, conf.appwriteSubscribersCollectionId, documentId);
                return true
            }else{
                console.warn(`error in deleting subscription document`)
            }
        } catch (error) {
            
        }
    }
    async getSubscribers(channelId){
        try {
            const queries = [Query.equal('channelId', channelId)];
            return await this.databases.listDocuments(conf.appwriteDbId, conf.appwriteSubscribersCollectionId, queries);
        } catch (error) {
            console.error("Error getting subscribers:", error);
            return false;
        }
    }
    async ifUserSubscribed(subscriberId, channelId){
        try {
            const queries = [Query.equal('channelId', channelId), Query.equal('subscriberId',subscriberId)]
            const result = await this.databases.listDocuments(conf.appwriteDbId, conf.appwriteSubscribersCollectionId, queries)
            return result.documents.length > 0;
        } catch (error) {
            console.error("error in ifUserSubscribed function", error);
            return false
        }
    }

    async getSubscribedChannels(subscriberId){
        try {
            const queries = [Query.equal('subscriberId', subscriberId)];
            return await this.databases.listDocuments(conf.appwriteDbId, conf.appwriteSubscribersCollectionId, queries);
        } catch (error) {
            console.error("Error getting subscribers:", error);
            return false;
        }
    }
}

const service = new Service()
export default service;