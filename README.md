# API Documentation

https://www.postman.com/universal-station-311319/workspace/digital-equb


# Digital Equb Backend

This project is a backend application for a digital Equb system built with Node.js and Express.js.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Introduction

The digital Equb backend provides APIs to manage a traditional Ethiopian rotating savings and credit association (Equb). Users can join Equbs, contribute payments, and handle withdrawals.

## Features

- User registration and authentication
- Creating and joining Equbs
- Managing contributions
- Withdrawal management

## Technologies Used

- Node.js
- Express.js
- MongoDB (or any other database used)
- JWT for authentication

## Installation

To run this project locally:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/digital-equb-backend.git
    cd digital-equb-backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary environment variables (example below):

    ```
    PORT=5000
    MONGO_URI='your_mongo_connection_string'
    JWT_SECRET='your_jwt_secret'
    ```

4. **Run the application:**
    ```bash
    npm start
    ```

## Configuration

Ensure you have a MongoDB instance running and the connection URI set in your `.env` file.

## API Endpoints

Here are some example endpoints available in your API. More detailed documentation can be imported from the provided Postman collection.

### Authentication

- **POST /api/register** - Register a new user
- **POST /api/login** - Authenticate a user and return a token

### Equbs

- **POST /api/equbs** - Create a new Equb
- **GET /api/equbs** - List all Equbs
- **GET /api/equbs/:id** - Get details of a specific Equb
- **POST /api/equbs/:id/join** - Join an Equb

### Contributions

- **POST /api/contributions** - Make a contribution
- **GET /api/contributions** - List user contributions

### Withdrawals

- **POST /api/withdrawals** - Request a withdrawal
- **GET /api/withdrawals** - List user withdrawals

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
