# Camera-Service-Application-Using-React-Node-js-and-Mysql

The Camera Service Application allows users to book camera service appointments at various service centers. Users can also edit and delete their bookings, generate PDF bills, and provide feedback.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Portal](#admin-portal)
- [Authors](#authors)

## Features

- User Authentication: Users can create accounts and log in securely.
- Booking System: Users can book camera service appointments, select service centers, and choose time slots.
- Edit and Delete Bookings: Users can modify or cancel their bookings.
- PDF Bill Generation: Bills are generated in PDF format with detailed service and cost information.
- Feedback: Users can provide feedback after downloading their bill.
- Admin Portal: Admins can add, delete, or modify service centers.
- Database Integration: Utilizes MySQL to store user data, booking information, and service center details.

## Installation

To run the Camera Service Application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yaswanthsk/Camera-Service-Application-Using-React-Node-js-and-Mysql.git`
2. Install dependencies for the frontend and backend.
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && npm install`
3. Set up your MySQL database using XAMPP or a similar tool.
4. You can also import the database file 'cameraservice.sql' that i have provided.
5. Start the frontend and backend servers.
   - Frontend: `cd frontend && npm start`
   - Backend: `cd backend && npm start`
6. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. Create a user account or log in.
2. Browse available service centers and select one.
3. Choose a date and time slot for your appointment.
4. Submit your booking.
5. Edit or cancel your booking if needed.
6. Download the generated PDF bill.
7. Provide feedback on your service experience.

## Admin Portal

Admins can access the admin portal to manage service centers:

1. Log in as an admin user. i.e, Username : admin, password: admin.
2. Access the admin portal to add, delete, or modify service center details.
3. Make sure to log out securely from the admin portal.

## Authors

- [YaswanthSK](https://github.com/yaswanthsk)

## Acknowledgments

- React
- Node js
- Express
- Bootstrap
- Xampp
