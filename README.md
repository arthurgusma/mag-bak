# Mag-Bak Project

Mag-Bak is a financial management application that allows users to perform basic financial operations such as viewing their balance, performing transactions (TED/PIX), and reviewing transaction history. The project is built using **Next.js**, **Tailwind CSS**, and **Firebase**, with user authentication via **JWT** and **next-auth** .

![](/public/magbankmockup.png)

## Access the production project here

[http://mag-bak.vercel.app](http://mag-bak.vercel.app)

---

## Table of Contents
1. [Features](#features)  
2. [Technologies](#technologies)  
3. [Installation](#installation)  
4. [Environment Variables](#environment-variables)  
5. [Running Locally](#running-locally)  
6. [Folder Structure](#folder-structure)  

---

## Features

### 1. User Authentication
- Login and logout functionality.
- User authentication using JWT for secure sesHome
- Displays the user's current balance.
- Provides a summary of recent transactions.

### 3. Perform s
- Users can simulate financial transactions, such as TED and PIX.
- Transactions require the user's password for verification.

### 4. Transaction Screen
- Displays the user's current balance.
- Fields ## Technologies

The project leverages the following technologies:
- **Next.js** (v15.0.3): React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Firebase**: Backend as a service for authentication, Firestore, and hosting.
- **JWT**: Secure authentication.
- **React Hook Form**: For form handling and validation.
- **Zod**: Schema validation.

---

## Installation

### Prerequisites
1. **Node.js** (v18 or higher) and **npm** or **yarn** installed.
2. Firebase project configured.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mag-bak.git
   cd mag-bak

2.	Install dependencies:
    npm install

3.	Configure environment variables (see below).

## Environment Variables
    Create a .env.local file in the root directory with the following keys:

    NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
    AUTH_SECRET==see next-auth documentation to see how to genarate yout key

    Replace your-* with the appropriate values from your Firebase project settings.

## Running Locally

1.	Start the development server:
    npm run dev