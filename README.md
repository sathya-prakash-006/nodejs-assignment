# nodejs-assignment

## Create new account For USER
- http://localhost:2255/api//auth/signup
- By default role will be user.

#### Example : 
{

    "fullname": "sathya",
    "date": "11/06/76",
    "email": "sathya@gmail.com",
    "password": "123456",
    "confirmpassword": "123456"
}

- If user email already exist then will get response as : "User already exists"
-  If password and confirmpassword are same then response is : "Password don't match."
-   If Register successful then user will get success message and token.

## Create new account For ADMIN
- http://localhost:2255/api/auth/signup

#### Example : 
{

    "role": "admin"
    "fullname": "sathya",
    "date": "11/06/76",
    "email": "sathya@gmail.com",
    "password": "1234",
    "confirmpassword": "1234"
}

## Update profile : user can update name and email address

- http://localhost:2255/api//profile/update/:id
- login token is required to update profile
- token should be passesd as header (x-access-token)

#### Example : 
{

    "fullname": "sathya",
    "email": "sathya@gmail.com",
 }
 
 
 ## Get all the users (only admin can access)

- http://localhost:2255/api/all/users
- Need to pass user id in body

#### Example : 
{

    "id": 1
 }
    

## Login to USER/ADMIN account
-  http://localhost:2255/api/auth/sigin

#### Example : 
{
 
    "email": "sathya@gmail.com",
    "password": "1234",
    
}

- If user is not registered then response is : "User doesn't exist."
- If email and password not corect then response : "Invalid Credentials"


