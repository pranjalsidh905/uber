# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: POST

### Description:

This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### Request Body:

The request body should be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `first_name`: A string representing the user's first name. It must be at least 3 characters long.
  - `last_name`: A string representing the user's last name. It must be at least 3 characters long.
- `email`: A string representing the user's email. It must be a valid email address.
- `password`: A string representing the user's password. It must be at least 6 characters long.

Example:

```json
{
  "fullname": {
    "first_name": "John",
    "last_name": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success (201):

- **Description**: User successfully registered.
- **Body**: A JSON object containing the authentication token and user details.

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "first_name": "John",
      "last_name": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Validation Error (401):

- **Description**: Validation failed for the input data.
- **Body**: A JSON object containing the validation errors.

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.first_name",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Server Error (500):

- **Description**: An error occurred on the server.
- **Body**: A JSON object containing the error message.

```json
{
  "error": "Internal Server Error"
}
```



# User Login Endpoint Documentation

## Endpoint: `/users/login`

### Method: POST

### Description:

This endpoint is used to log in an existing user. It requires the user's email and password.

### Request Body:

The request body should be a JSON object containing the following fields:

- `email`: A string representing the user's email. It must be a valid email address.
- `password`: A string representing the user's password. It must be at least 6 characters long.

Example:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success (200):

- **Description**: User successfully logged in.
- **Body**: A JSON object containing the authentication token and user details.

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "first_name": "John",
      "last_name": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Validation Error (401):

- **Description**: Validation failed for the input data.
- **Body**: A JSON object containing the validation errors.

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Server Error (500):

- **Description**: An error occurred on the server.
- **Body**: A JSON object containing the error message.

```json
{
  "error": "Internal Server Error"
}
```

# User Profile Endpoint Documentation

## Endpoint: `/users/profile`

### Method: GET

### Description:
This endpoint is used to get the profile of the logged-in user. It requires the user to be authenticated.

### Request Headers:
- `Authorization`: A string containing the Bearer token.

Example:
```
Authorization: Bearer jwt_token_here
```

### Responses:

#### Success (200):
- **Description**: User profile successfully retrieved.
- **Body**: A JSON object containing the user details.
```json
{
  "_id": "user_id_here",
  "fullname": {
    "first_name": "John",
    "last_name": "Doe"
  },
  "email": "john.doe@example.com"
}
```

#### Unauthorized (401):
- **Description**: User is not authenticated.
- **Body**: A JSON object containing the error message.
```json
{
  "error": "Unauthorized"
}
```

#### Server Error (500):
- **Description**: An error occurred on the server.
- **Body**: A JSON object containing the error message.
```json
{
  "error": "Internal Server Error"
}
```

# User Logout Endpoint Documentation

## Endpoint: `/users/logout`

### Method: GET

### Description:
This endpoint is used to log out the logged-in user. It requires the user to be authenticated.

### Request Headers:
- `Authorization`: A string containing the Bearer token.

Example:
```
Authorization: Bearer jwt_token_here
```

### Responses:

#### Success (200):
- **Description**: User successfully logged out.
- **Body**: A JSON object containing the success message.
```json
{
  "message": "Logout successfully"
}
```

#### Unauthorized (401):
- **Description**: User is not authenticated.
- **Body**: A JSON object containing the error message.
```json
{
  "error": "Unauthorized"
}
```

#### Server Error (500):
- **Description**: An error occurred on the server.
- **Body**: A JSON object containing the error message.
```json
{
  "error": "Internal Server Error"
}
```
# Captain Registration Endpoint Documentation

## Endpoint: `/captains/register`

### Method: POST

### Description:

This endpoint is used to register a new captain. It requires the captain's first name, last name, email, password, and vehicle details.

### Request Body:

The request body should be a JSON object containing the following fields:

- `first_name`: A string representing the captain's first name. It must be at least 3 characters long.
- `last_name`: A string representing the captain's last name.
- `email`: A string representing the captain's email. It must be a valid email address.
- `password`: A string representing the captain's password. It must be at least 6 characters long.
- `color`: A string representing the vehicle's color. It must be at least 3 characters long.
- `model`: A string representing the vehicle's model. It must be at least 3 characters long.
- `plate_number`: A string representing the vehicle's plate number. It must be at least 3 characters long.
- `capacity`: An integer representing the vehicle's capacity. It must be at least 1.
- `vehicle_type`: A string representing the vehicle type. It must be either "car", "auto", or "motorcycle".

Example:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "color": "red",
  "model": "Toyota",
  "plate_number": "XYZ123",
  "capacity": 4,
  "vehicle_type": "car"
}
```

### Responses:

#### Success (201):

- **Description**: Captain successfully registered.
- **Body**: A JSON object containing the captain details.

```json
{
  "_id": "captain_id_here",
  "fullname": {
    "first_name": "John",
    "last_name": "Doe"
  },
  "email": "john.doe@example.com",
  "vehicle": {
    "color": "red",
    "model": "Toyota",
    "plate_number": "XYZ123",
    "capacity": 4,
    "vehicle_type": "car"
  }
}
```

#### Validation Error (401):

- **Description**: Validation failed for the input data.
- **Body**: A JSON object containing the validation errors.

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "first_name",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Color must be at least 3 characters long",
      "param": "color",
      "location": "body"
    },
    {
      "msg": "Plate Number must be at least 3 characters long",
      "param": "plate_number",
      "location": "body"
    },
    {
      "msg": "Model must be at least 3 characters long",
      "param": "model",
      "location": "body"
    },
    {
      "msg": "Capacity must be at least 1",
      "param": "capacity",
      "location": "body"
    },
    {
      "msg": "Vehicle type must be either car, auto, or motorcycle",
      "param": "vehicle_type",
      "location": "body"
    }
  ]
}
```

#### Server Error (500):

- **Description**: An error occurred on the server.
- **Body**: A JSON object containing the error message.

```json
{
  "error": "Internal Server Error"
}
```
