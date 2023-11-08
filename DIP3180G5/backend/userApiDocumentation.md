# User Controller and User Model Documentation

This document provides an overview of the User Controller and the User Model. These components handle the functionality related to user data in the application.

## User Controller (userController.js)

### `getUser`
- **Description**: Retrieves a user by their ID.
- **HTTP Method**: GET
- **Route**: `/user/:id`
- **Parameters**: `id` (User ID)
- **Response**: Returns a JSON object representing the user.

### `createUser`
- **Description**: Creates a new user.
- **HTTP Method**: POST
- **Route**: `/createuser`
- **Request Body Parameters**:
  - `name`: User's name.
  - `contact_number`: User's contact number.
  - `email`: User's email address.
- **Response**: Returns the created user as a JSON object.

## User Model (UserModel.js)

The User Model defines the schema for storing user data in the application's database.

### Schema Fields
- `name`: User's name.
- `contact_number`: User's contact number.
- `email`: User's email address.

## Example Usage

Here is an example of how to use the User Controller endpoints in your application:

```javascript
// Make HTTP requests to the endpoints described in the controller documentation.
// For example:
// GET /user/:id
// POST /createUser
// ...