# Project Overview
## Restaurant Food Ordering Platform
This project is a comprehensive web application for a restaurant that allows users to view available food items along with their prices and provides user authentication functionalities. The application is designed to offer a seamless user experience with static display elements and integrated user authentication via Firebase.

# Features
# 1. Home Page
Static Display of Food Items: Users can view a list of food items available in the restaurant along with their respective prices. This is a static display to provide users with an overview of the menu.
# 2. User Authentication
### Signup/Login: 
Users can sign up or log in using their email and password or through Google authentication. This functionality is powered by Firebase Authentication.
### Firebase Integration:
User data is securely stored and managed on Firebase, ensuring a reliable and scalable authentication process.
### Logout: 
Users can easily log out from their account, ensuring their session ends securely.

# Technical Details
# Frontend
### React: 
The frontend is built using React, offering a dynamic and responsive user interface.
### Tailwind CSS: 
Tailwind CSS is used for styling, providing a modern and consistent design across the application.
# User Authentication Flow
### Signup/Login Page:
When users click on the signup button on the home page, they are redirected to the authentication page where they can either sign up or log in.
### Email/Password Authentication:
Users can sign up or log in using their email address and password.
### Google Authentication:
Users have the option to use their Google account for authentication.
### Firebase Authentication:
Firebase handles all authentication processes, ensuring that user credentials are stored securely.
### Local Storage: 
Once authenticated, the user’s email is stored in local storage to maintain the session state.
### Logout:
Users can log out by clearing their session data, ensuring their information remains secure.
<hr>
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Home Page
  The Home page welcomes users with a visually appealing carousel, parallax design, and interactive images.
  Users can navigate to the sign-up page by clicking on the designated button.
# Sign-Up and Login
  Users have the option to sign up using their email/password or via Google sign-in.
  For returning users, a login button is available to access their accounts.
  Once logged in, users are directed to the save profile page.
# Save Profile Page
  In the save profile page, users are prompted to enter all necessary details to complete their profile.
  The provided data is securely stored in MongoDB database.
# Profile Page
  After saving their profile, users are redirected to their profile page.
  The profile page displays user information and offers options to edit, delete, and generate a QR code for the profile.
  Editing the profile allows users to modify all details except email and date of birth.
  Deleting the profile prompts a confirmation pop-up, ensuring the user's intent.
  Generating a QR code enables users to share their profile with others.
# Log Out
  A log-out button is accessible on the profile page, allowing users to securely log out from the website.
# User Authentication
  Access to all features and functionalities is restricted to logged-in users, ensuring a personalized and secure experience.
This web application offers a user-friendly interface and robust functionalities to enhance the user's profile management experience. Whether signing up, logging in, or managing profile details, users can expect a seamless and intuitive journey throughout the platform.
