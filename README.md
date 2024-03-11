# shopping-app-api


This document provides an overview of the backend API for a collaborating shopping list application. The API facilitates user management, shopping list creation and management, collaboration features, and real-time data synchronization.

Technologies Used
Backend Framework: Express.js
Authentication: JWT (JSON Web Token)
Database: MySQL
Data Validation: Express Validator
API Documentation: Swagger
Database Schema
The following tables represent the core data model for the application:

users:

id (INT PRIMARY KEY),
username (VARCHAR(255) UNIQUE),
mobile_number (VARCHAR(20) UNIQUE),
email (VARCHAR(255) UNIQUE),
password (VARCHAR(255))

shopping_lists:

id (INT PRIMARY KEY),
name (VARCHAR(255)),
created_user_id (INT FOREIGN KEY REFERENCES users(id)),
description (TEXT)

list_items:

id (INT PRIMARY KEY),
name (VARCHAR(255)),
quantity (INT),
shopping_list_id (INT FOREIGN KEY REFERENCES shopping_lists(id)),
aisle_id (INT FOREIGN KEY REFERENCES aisle(id)),
bought (BOOLEAN)

shopping_list_access:

id (INT PRIMARY KEY),
created_user_id (INT FOREIGN KEY REFERENCES users(id)),
access_user_id (INT FOREIGN KEY REFERENCES users(id)),
shopping_list_id (INT FOREIGN KEY REFERENCES shopping_lists(id)

aisle:

id (INT PRIMARY KEY),
name (VARCHAR(255))

Design Choices
Authentication: JWT authentication was chosen for its stateless nature and ease of implementation.
Database: MySQL, This decision depends on factors like data structure, query patterns, and scalability needs.


RESTful API Design: The API adheres to RESTful principles with clear endpoints for CRUD (Create, Read, Update, Delete) operations on users, shopping lists, and list items. It also includes endpoints for collaboration features and item purchase status updates.

Swagger Specification: Located at the /docs endpoint, providing interactive API documentation.


Getting Started

Clone the repository containing the source code.

Install dependencies using npm install.

Configure database connection details.

Run the application using npm run start.

Access the Swagger documentation at http://localhost:PORT/docs (replace PORT with the application port).
