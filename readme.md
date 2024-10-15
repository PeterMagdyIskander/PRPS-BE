# User Management Module

This Module manages user information, including creating, retrieving, updating, and deleting user data.

## Endpoints

### 1. Get User Information

- **Endpoint:** `GET users/:email`
- **Description:** Retrieves information for a specific user based on their email.
- **Request DTO:**
  - **Path Parameters:**
    - `email` (string): The email address of the user.
- **Response DTO:**
  - `id` (number): The unique identifier of the user.
  - `email` (string): The user's email address.
  - `password` (string): The user's password.
  - Other fields related to user details (e.g., role, company, occupation).

- **Example Response:**
  ```json
  {
    "id": 1,
    "email": "user@example.com",
    "password": "hashed_password",
    "role": "EMPLOYEE"
  }

### 2. Delete User Information

- **Endpoint:** `DELETE users/:email`
- **Description:** Removes information for a specific user based on their email.
- **Request DTO:**
  - **Path Parameters:**
    - `email` (string): The email address of the user.
- **Response DTO:**
  - `message` (string): Whether the user was deleted or not.

- **Example Response:**
  ```json
  {
    "message": "User deleted successfuly",
  }

### 3. Create User Information

- **Endpoint:** `POST users/signup`
- **Description:** Add a new user to the system
- **Request DTO:**
  - `firstName` (string): First name of the user.
  - `lastName` (string): Last name of the user.
  - `email` (string): The email address of the user.
  - `company` (string): Where does the user work.
  - `occupation` (string): What does the user work.
- **Response DTO:**
  - `message` (string): Whether the user was added or not.

- **Example Response:**
  ```json
  {
    "message": "User info has been saved",
  }

### 4. Update User Password

- **Endpoint:** `POST users/updatePassword`
- **Description:** Update user password
- **Request DTO:**
  - `email` (string): The email address of the user.
  - `password` (string): New Password of the user.
- **Response DTO:**
  - `message` (string): Whether the password was updated or not.

- **Example Response:**
  ```json
  {
    "message": "Password updated successfully",
  }


# Authenticator Module

This Module manages the authentication of users.

## Endpoints

### 1. Login

- **Endpoint:** `POST auth/login`
- **Description:** Logs in the user on the system by creating a JWT token for the user
- **Request DTO:**
  - `email` (string): The email address of the user.
  - `password` (string): The password of the user.
- **Response DTO:**
  - `id` (number): The unique identifier of the user.
  - `token` (string): JWT toke.
  - `role` (string): Role of the user.
  - `message` (string): Status message.

- **Example Response:**
  ```json
  {
    "id": 1,
    "token": "mdsofmois-fsd",
    "role": "EMPLOYEE",
    "message": "success",
  }

### 2. Verify JWT

- **Endpoint:** `POST auth/verify`
- **Description:** Verifies that the provided JWT is a valid one.
- **Headers:**
    - `Bearer <JWT token>` (string): The JWT token.
- **Response DTO:**
  - `message` (string): Whether the JWT token was valid or not.

- **Example Response:**
  ```json
  {
    "message": "success",
  }

### 3. Create User Information

- **Endpoint:** `POST auth/signup`
- **Description:** Add a new user to the system
- **Request DTO:**
  - `firstName` (string): First name of the user.
  - `lastName` (string): Last name of the user.
  - `email` (string): The email address of the user.
  - `company` (string): Where does the user work.
  - `occupation` (string): What does the user work.
- **Response DTO:**
  - `message` (string): Whether the user was added or not.

- **Example Response:**
  ```json
  {
    "message": "User info has been saved and sent to another service.",
  }

### 4. Update User Password

- **Endpoint:** `POST auth/updatePassword`
- **Description:** Update user password
- **Request DTO:**
  - `email` (string): The email address of the user.
  - `password` (string): New Password of the user.
- **Response DTO:**
  - `message` (string): Whether the password was updated or not.

- **Example Response:**
  ```json
  {
    "message": "Password has been updated successfully",
  }

### 4. Forgot User Password

- **Endpoint:** `POST auth/forgotPassword`
- **Description:** Send an email to the provided email address
- **Request DTO:**
  - `email` (string): The email address of the user.
- **Response DTO:**
  - `message` (string): Whether the password was updated or not.

- **Example Response:**
  ```json
  {
    "message": "Email sent",
  }

