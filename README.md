# Login-Task

## Base Url : http://localhost:5000

## Api Endpoints :

### /user ( Method : GET )
returns the details of all existing users

Response :
```
[
  {
    email,
    userId,
    password
  },
  {
    email,
    userId,
    password
  },
  ...
]
```


### /user ( Method : POST )
creates a new user ,request body requires only email, and auto generated password and userId are sent as response.

Request body :
```
{
  "email": " user-email"
}
```

Response :
```
{
  email: "user-email",
  password: "auto-generated password",
  userId: "auto-generated user id"
}

or 

{
  message :"Error message here"
}
```

### /user/:userId ( Method : PUT )
updates user password, password should be passed in the request body, sends the new details of user on successful updation.

Request body :
```
{
  "password": "new password here"
}
```

Response :
```
{
  email: "user-email",
  password: "new password",
  userId: "user id"
}

or 

{
  message :"Error message here"
}
```


### /user/:userId ( Method : DELETE )
deletes the user with userid passed in the url param.

Response :
```
{
  message :"message here "
}

```
