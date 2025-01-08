# Mega Blog Documentation

## Overview
Mega Blog is a robust blogging platform built using modern technologies such as **React**, **Redux**, and **Appwrite**. This application enables users to create, edit, delete, and view blog posts, along with additional features like user authentication, statistics tracking, and subscription management.

This project was inspired by the **Chai Aur Code** YouTube channel, which provided the foundational code and structure. The functionality has been significantly enhanced, with new features like **statistics**, **likes**, **views**, and **subscriptions** integrated into the platform. Styling and structure have also been improved for better efficiency and user experience.

## Key Features
- **User Authentication**: Secure login and signup functionalities.
- **CRUD for Blog Posts**: Users can create, edit, delete, and manage their blog posts.
- **File Upload**: Users can upload and manage featured images for posts.
- **Statistics**: Tracks likes and views for each post.
- **Subscriptions**: Users can subscribe to authors to follow their posts.

---

## Project Structure
The project follows a modular structure to ensure scalability and maintainability.

### Directories and Files
```
/src
  |-- appwrite
  |   |-- auth.js         # Handles user authentication
  |   |-- config.js       # Appwrite configuration and service definitions
  |-- components
  |   |-- header          # Header and navigation bar
  |   |-- footer          # Footer of the application
  |   |-- container       # Reusable container component
  |   |-- postform        # Form for creating/editing blog posts
  |   |-- postcard        # Component for displaying individual posts
  |   |-- authlayout      # Layout to enforce authentication
  |   |-- login           # Login component
  |   |-- signup          # Signup component
  |-- pages
  |   |-- Home.jsx        # Homepage showing a feed of posts
  |   |-- AddPost.jsx     # Page for creating new posts
  |   |-- EditPost.jsx    # Page for editing existing posts
  |   |-- Post.jsx        # Single post view
  |   |-- MyPosts.jsx     # Page displaying user's posts
  |   |-- AllPosts.jsx    # Page displaying all public posts
  |   |-- Login.jsx       # Page for user login
  |   |-- Signup.jsx      # Page for user signup
  |-- store
  |   |-- authSlice.js    # Redux slice for authentication state
  |   |-- store.js        # Redux store configuration
```

---

## Dependencies
The project uses the following dependencies:
- **React**: Frontend library for building user interfaces.
- **Redux Toolkit**: For managing global state.
- **React Router**: For routing and navigation.
- **Appwrite**: Backend-as-a-Service for authentication, database, and file storage.
- **React Hook Form**: For managing form state and validation.
- **TinyMCE**: Rich text editor for creating and editing blog content.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **@reduxjs/toolkit**: Simplified Redux state management.

---

## Configuration
### Environment Variables
The application uses environment variables for Appwrite configuration:
```env
VITE_APPWRITE_URL=https://your-appwrite-instance-url.com
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_APPWRITE_STATISTICS_COLLECTION_ID=your_statistics_collection_id
VITE_APPWRITE_SUBSCRIBERS_COLLECTION_ID=your_subscribers_collection_id
```
These variables are loaded via `import.meta.env` in `config.js`:
```javascript
const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDbId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteStatisticCollectionId: String(import.meta.env.VITE_APPWRITE_STATISTICS_COLLECTION_ID),
    appwriteSubscribersCollectionId: String(import.meta.env.VITE_APPWRITE_SUBSCRIBERS_COLLECTION_ID),
};
export default conf;
```

---

## API Endpoints

### Authentication
- **Login**: `authService.login({ email, password })`
- **Logout**: `authService.logout()`
- **Sign Up**: `authService.createAccount({ email, password, name })`
- **Get Current User**: `authService.getCurrentUser()`

### Posts
- **Create Post**: `appwriteService.createPost({ title, slug, content, featuredImage, status, userId })`
- **Update Post**: `appwriteService.updatePost(slug, { title, content, featuredImage, status })`
- **Delete Post**: `appwriteService.deletePost(slug)`
- **Get Post**: `appwriteService.getPost(slug)`
- **List Posts**: `appwriteService.getAllPosts(queries)`

### File Management
- **Upload File**: `appwriteService.uploadFile(file)`
- **Delete File**: `appwriteService.deleteFile(fileId)`
- **Get File Preview**: `appwriteService.getFilePreview(fileId)`

### Statistics
- **Create Statistics**: `appwriteService.createStatistics(slug)`
- **Increment View**: `appwriteService.incrementView(slug)`
- **Toggle Like**: `appwriteService.toggleLike(slug, userId)`
- **Get Statistics**: `appwriteService.getStats(slug)`

### Subscriptions
- **Subscribe**: `appwriteService.subscribeTo(subscriberId, channelId)`
- **Unsubscribe**: `appwriteService.unSubscribeTo(subscriberId, channelId)`
- **Check Subscription**: `appwriteService.ifUserSubscribed(subscriberId, channelId)`

---

## Frontend Components

### Header
Located in `components/header/Header.jsx`, it includes navigation and logout functionality. It dynamically displays links based on authentication status.

### Footer
Located in `components/footer/Footer.jsx`, it provides site information and links.

### PostCard
Displays individual posts in a grid. Each card links to the single post page.

### PostForm
A form for creating and editing posts. Handles slug generation, file uploads, and field validations.

### Login
Located in `components/login/Login.jsx`, it provides the login form and handles user authentication.

### Signup
Located in `components/signup/Signup.jsx`, it provides the signup form and handles account creation.

---

## Styling
The project uses **Tailwind CSS** for styling, which provides utility-first classes for rapid UI development. Key benefits include:
- Responsive design out-of-the-box.
- Customizable themes and colors.
- Minimal custom CSS required.

---

## Deployment
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env`.
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Deploy the `dist` folder to your hosting provider.

---

## Usage
- **View Posts**: Navigate to the homepage or "All Posts".
- **Create a Post**: Log in and click "Add Post".
- **Edit/Delete Posts**: Access "My Posts" and use the respective options.
- **Subscribe to Authors**: View a post and click "Subscribe".

---

## Contributing
- Fork the repository and create a feature branch.
- Submit pull requests for review.

---

## Support
For any issues or questions, contact the project maintainer or refer to the documentation.
- **Email**: vasishthmayank9@gmail.com