# API Documentation

## User Routes

### Register User

`POST /users/register`

#### Description

This endpoint is used to register a new user.

#### Request Body

```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

#### Responses

- **201 Created**
  ```json
  {
    "user": {
      "_id": "user_id",
      "email": "user@example.com",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      }
    },
    "token": "auth_token"
  }
  ```
- **400 Bad Request**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Fullname must be at least 3 characters long",
        "param": "fullname.firstname",
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
  ```json
  {
    "error": "User already exists"
  }
  ```

### Login User

`POST /users/login`

#### Description

This endpoint is used to login a user.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Responses

- **200 OK**
  ```json
  {
    "user": {
      "_id": "user_id",
      "email": "user@example.com",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      }
    },
    "token": "auth_token"
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

### Get User Profile

`GET /users/profile`

#### Description

This endpoint is used to get the profile of the authenticated user.

#### Responses

- **200 OK**
  ```json
  {
    "user": {
      "_id": "user_id",
      "email": "user@example.com",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      }
    }
  }
  ```

### Logout User

`GET /users/logout`

#### Description

This endpoint is used to logout the authenticated user.

#### Responses

- **200 OK**
  ```json
  {
    "message": "Logged out"
  }
  ```

## Captain Routes

### Register Captain

`POST /captains/register`

#### Description

This endpoint is used to register a new captain.

#### Request Body

```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Responses

- **201 Created**
  ```json
  {
    "captain": {
      "_id": "captain_id",
      "email": "captain@example.com",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "token": "auth_token"
  }
  ```
- **400 Bad Request**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      },
      {
        "msg": "Color must be at least 3 characters long",
        "param": "vehicle.color",
        "location": "body"
      },
      {
        "msg": "Plate must be at least 3 characters long",
        "param": "vehicle.plate",
        "location": "body"
      },
      {
        "msg": "Capacity must be at least 1",
        "param": "vehicle.capacity",
        "location": "body"
      },
      {
        "msg": "Invalid vehicle type",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```
  ```json
  {
    "message": "Captain already exist"
  }
  ```
