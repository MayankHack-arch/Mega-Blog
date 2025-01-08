import conf from '../config/conf.js';
import {Client, Account, ID} from 'appwrite';
console.log(`1 ${conf.appwriteUrl} 2${conf.appwriteProjectId}`)

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error('Error creating account:', error);
            throw new Error('Failed to create account. Please try again.');
        }
    }
    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            const user = await this.account.get();  
            return user;
        } catch (error) {
            console.error('Error fething account:', error);
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
    async getUserName(userId){
        try {
            const user = await this.account.get(userId);
            if(user){
                return user.name;
            }
            return null;
        } catch (error) {
            console.error('Error fething user:', error);
        }
    }
}

const authService = new AuthService();

export default authService;