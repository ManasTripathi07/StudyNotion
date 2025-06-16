
# StudyNotion - EdTech Platform
https://study-notionfinal-jwdzh413n-manastripathi07s-projects.vercel.app/ (Link to Website)


StudyNotion is a fully functional EdTech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.

## Table of Contents

- [Introduction](#introduction)
- [System Architecture](#system-architecture)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
  - [Database](#database)
  - [Architecture Diagram](#architecture-diagram)
- [API Design](#api-design)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)


## Introduction

StudyNotion aims to provide a seamless and interactive learning experience for students, making education more accessible and engaging. Additionally, the platform serves as a platform for instructors to showcase their expertise and connect with learners across the globe.

In the following sections, we will cover the technical details of the platform, including the system architecture, API design, installation, usage instructions, and potential future enhancements.

## System Architecture

The StudyNotion EdTech platform consists of three main components: the front-end, the back-end, and the database. The platform follows a client-server architecture, with the front-end serving as the client and the back-end and database serving as the server.

### Front-end

The front-end of the platform is built using ReactJS, which allows for the creation of dynamic and responsive user interfaces, crucial for providing an engaging learning experience to students. The front-end communicates with the back-end using RESTful API calls.

#### Front End Pages

For Students:

- **Homepage:** A brief introduction to the platform with links to the course list and user details.
- **Course List:** A list of all the courses available on the platform, along with their descriptions and ratings.
- **Wishlist:** Displays all the courses that a student has added to their wishlist.
- **Cart Checkout:** Allows the user to complete course purchases.
- **Course Content:** Presents the course content for a particular course, including videos and related material.
- **User Details:** Provides details about the student's account, including their name, email, and other relevant information.
- **User Edit Details:** Allows students to edit their account details.

For Instructors:

- **Dashboard:** Offers an overview of the instructor's courses, along with ratings and feedback for each course.
- **Insights:** Provides detailed insights into the instructor's courses, including the number of views, clicks, and other relevant metrics.
- **Course Management Pages:** Enables instructors to create, update, and delete courses, as well as manage course content and pricing.
- **View and Edit Profile Details:** Allows instructors to view and edit their account details.

#### Front-end Tools and Libraries

To build the front-end, we use frameworks and libraries such as ReactJS, CSS, and Tailwind for styling, and Redux for state management.

### Back-end

The back-end of the platform is built using NodeJS and ExpressJS, providing APIs for the front-end to consume. These APIs include functionalities such as user authentication, course creation, and course consumption. The back-end also handles the logic for processing and storing the course content and user data.

#### Back-end Features

- **User Authentication and Authorization:** Students and instructors can sign up and log in to the platform using their email addresses and passwords. The platform also supports OTP (One-Time Password) verification and forgot password functionality for added security.
- **Course Management:** Instructors can create, read, update, and delete courses, as well as manage course content and media. Students can view and rate courses.
- **Payment Integration:** Students will purchase and enroll in courses by completing the checkout flow, followed by Razorpay integration for payment handling.
- **Cloud-based Media Management:** StudyNotion uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.
- **Markdown Formatting:** Course content in document format is stored in Markdown format, allowing for easier display and rendering on the front-end.

#### Back-end Frameworks, Libraries, and Tools

The back-end of StudyNotion uses various frameworks, libraries, and tools to ensure its functionality and performance, including:

- **Node.js:** Used as the primary framework for the back-end.
- **Express.js:** Used as a web application framework, providing a range of features and tools for building web applications.
- **MongoDB:** Used as the primary database, providing a flexible and scalable data storage solution.
- **JWT (JSON Web Tokens):** Used for authentication and authorization, providing a secure and reliable way to manage user credentials.
- **Bcrypt:** Used for password hashing, adding an extra layer of security to user data.
- **Mongoose:** Used as an Object Data Modeling (ODM) library, providing a way to interact with MongoDB using JavaScript.

#### Data Models and Database Schema

The back-end of StudyNotion uses several data models and database schemas to manage data, including:

- **Student Schema:** Includes fields such as name, email, password, and course details for each student.
- **Instructor Schema:** Includes fields such as name, email, password, and course details for each instructor.
- **Course Schema:** Includes fields such as course name, description, instructor details, and media content.

### Database

The database for the platform is built using MongoDB, a NoSQL database that provides a flexible and scalable data storage solution. MongoDB allows for the storage of unstructured and semi-structured data. The database stores the course content, user data, and other relevant information related to the platform.

![state-table](https://github.com/user-attachments/assets/48f4ec4a-c712-4127-bd91-4d11f6aac060))





### Architecture Diagram

Below is a high-level diagram that illustrates the architecture of the StudyNotion EdTech platform:

![disc](https://github.com/user-attachments/assets/d7de8414-9729-4486-ad94-55ee4b1e1610)


## API Design

The StudyNotion platform's API is designed following the REST architectural style. The API is implemented using Node.js and Express.js. It uses JSON for data exchange and follows standard HTTP request methods such as GET, POST, PUT, and DELETE.

For detailed API documentation and endpoints, refer to the [API Documentation](/api-docs).

## Installation

1. Clone the repository: `git clone https://github.com/ManasTripathi07/repo.git`
2. Navigate to the project directory: `cd StudyNotion`
3. Install dependencies: `npm install`

## Configuration

1. Set up a MongoDB database and obtain the connection URL.
2. Create a `.env` file in the root directory with the following environment variables:
   ```
   MONGODB_URI=<your-mongodb-connection-url>
   JWT_SECRET=<your-jwt-secret-key>
   ```

## Usage

1. Start the server: `npm start`
2. Open a new terminal and navigate to the `client` directory: `cd client`
3. Start the React development server: `npm start`

Access the application in your browser at `http://localhost:3000`.


##Login Credentials to go About Website

##Student Login : Email: test1@gmail.com Pass: 1212


## Few Interface Images of the Project 

![1](https://github.com/user-attachments/assets/c2931d02-446d-46f8-af8f-52bd429dff4c)

![2](https://github.com/user-attachments/assets/373ab075-f698-4c97-902a-03161ec42cdb)

![3](https://github.com/user-attachments/assets/10afd1c4-ca10-4211-9ba1-d6e3002dbd54)

![4](https://github.com/user-attachments/assets/1b07071a-f4f1-47c1-8938-894cef39de81)

![5](https://github.com/user-attachments/assets/53f497ad-bbbd-4b8d-9106-3f9fd8a82de1)

![6](https://github.com/user-attachments/assets/d781e46f-3652-49d5-8666-f53f2b68868b)

![7](https://github.com/user-attachments/assets/11dccf17-ff55-460e-a324-290d1fc7ea70)

![8](https://github.com/user-attachments/assets/1cd956ae-2471-4ade-9c12-de28fb8afe34)

![9](https://github.com/user-attachments/assets/6843190f-3f2f-47b7-817e-ef69545926ef)

![10](https://github.com/user-attachments/assets/28023b0d-6362-4937-9135-deb4b12c86a4)

![11](https://github.com/user-attachments/assets/3c382536-08e8-4348-9121-4f3d1845a6d7)

![12](https://github.com/user-attachments/assets/86ebee98-84ee-4e5c-b7f4-b3888377090e)

![13](https://github.com/user-attachments/assets/55a5c2d7-d2e2-4dbf-b486-8a5348423cc4)

![14](https://github.com/user-attachments/assets/38602fb6-d368-4766-9318-de21fc488f08)

![15](https://github.com/user-attachments/assets/c3c0229b-3f0e-41da-89e3-3191e142b642)

![16](https://github.com/user-attachments/assets/b5a5f01e-3612-4dad-855e-cb3cbff2aed3)

![17](https://github.com/user-attachments/assets/abc84177-f711-4b9d-8b2a-c13a4655ed6d)

![18](https://github.com/user-attachments/assets/a5e3577d-9f83-4de7-aa68-9746eb4812ec)


















