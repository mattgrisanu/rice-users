# Rice Users Service

Rice Users service handles and stores all user-related information for the application.

## Table of Contents
#####[Getting started](#Getting-Started)
#####[Technologies] (#Technologies)
#####[Structure](#Structure) 
#####[API Endpoints](#Endpoint)
#####[Contributing] (#Contributing)

## <a id="Getting-Started"></a> Getting Started
#### 1. Clone the repository

  Start by cloning the latest version of the `rice-users` repository on your local machine by running:

  ```sh
  $ git clone https://github.com/dadamaka/rice-users
  $ cd rice-users
  ```
  
#### 2. Install Dependencies
  In the root directory, run the following command to install dependencies:

  ```sh
  $ npm install
  ```
  
#### 3. Setup Environment Variables

##### Server side setup

  1. Copy and save the  ``` example.env ``` file in the env folder as ``` development.env ```.
  2. Enter your desired ```PORT```

#### 4. Run the application

1. Start the server by running the following command from the root directory:

    ```sh
    $ npm start
    ```
2. Your server is now live at ```http://localhost:PORT```

#### 5. Run tests

1. Run the following command from the root directory to run tests.

    ```sh
    $ npm test
    ```
    
## <a id="Technologies"></a>Technologies

##### Server:
- Node
- Express

##### Database:
- Bookshelf/Knex
- MySQL

##### Testing:
- Mocha
- Chai

##### Deployment:
- AWS EC2
- AWS RDS
- Docker

## <a id="Structure"></a>Structure

### Directory Layout
```
├── /node_modules/              # 3rd-party libraries and utilities
├── /server/                    # Server source code
│   ├── /config/                # Server configuration files
│   ├── /controller/            # Database interaction functions
│   ├── /env/                   # Environment variables
│   ├── /models/                # Database mySQL models and schemas
│   ├── /routes/                # Routes for incoming AJAX requests
│   ├── /lib/                   # Library for utility functions
│   └── /server.js              # Server-side startup script
├── /test/                      # Server-side tests
└── package.json                # npm configuration file
└── .README.md                  # Quick overview of the Users Service
└── Dockerfile                  # Docker build file
```
## <a id="Endpoint"></a>API Endpoints

`GET` [/api/users/users](#usersusersget)  
`POST` [/api/users/user](#usersuserpost)  
`POST` [/api/users/user/update](#usersuserupdatepost)  
`POST` [/api/users/friends](#usersfriendspost)  
`POST` [/api/users/friends/new](#usersfriendsnewpost)  
`POST` [/api/users/preferences](#userspreferencespost)  
`POST` [/api/users/preferences/update](#userspreferencesupdatepost)  
`POST` [/api/users/group/preferences](#usersgrouppreferencespost)  
  
***

###<a id="usersusersget"></a>`GET` /api/users/users  

Objective: Get all Users profile in the database

Output:
 
```
[
    {
        id           : *integer*,
        clientId     : *string*,
        name         : *string*,  
        email        : *string*,  
        review_count : *integer*,  
        isOnboarded  : *binary*,  
        password     : *string*
    },
    
    {
        ...
    },
    
    {
        id           : *integer*,
        clientId     : *string*,
        name         : *string*,  
        email        : *string*,  
        review_count : *integer*,  
        isOnboarded  : *binary*,  
        password     : *string*
    }
]
```
  
###<a id="usersuserpost"></a>```POST``` /api/users/user

Objective: Get a Users's profile

Input: 

```
{ 
    clientId: *string*  
}
```

Output:
 
```
{
    id           : *integer*,
    clientId     : *string*,
    name         : *string*,  
    email        : *string*,  
    review_count : *integer*,  
    isOnboarded  : *binary*,  
    password     : *string*
}
```

###<a id="usersuserupdatepost"></a>`POST` /api/users/user/update  

Objective: Updates a User's profile

Input: 

```
{ 
    clientId     : *string*,
    name         : *string* (optional),  
    email        : *string* (optional),  
    review_count : *integer* (optional),  
    isOnboarded  : *binary* (optional),  
    password     : *string* (optional),
    preferences  : *array of string (preference)* (optional)
}
```

Output:
 
```'Successfully Updated User Profile'```

###<a id="usersfriendspost"></a>`POST` /api/users/friends  

Objective: Get all of a Users's friends 

Input: 

```
{ 
    clientId: *string*  
}
```

Output:
 
```
[
    {
        id           : *integer*,
        clientId     : *string*,
        name         : *string*,  
        email        : *string*,  
        review_count : *integer*,  
        isOnboarded  : *binary*,  
        password     : *string*
    },
    
    {
        ...
    },
    
    {
        id           : *integer*,
        clientId     : *string*,
        name         : *string*,  
        email        : *string*,  
        review_count : *integer*,  
        isOnboarded  : *binary*,  
        password     : *string*
    }
]
```

###<a id="usersfriendsnew"></a>`POST` /api/users/friends/new  

Objective: Add friends to a User 

Input: 

```
{ 
    clientId: *string*,
    friends: *array of string (clientId)*  
}
```

Output:
 
```'Friends Added Successfully'```

###<a id="userspreferencespost"></a>`POST` /api/users/preferences  

Objective: Get all of a Users's preferences 

Input: 

```
{ 
    clientId: *string* 
}
```

Output:
 
```
[
    *string*,
    ...,
    *string*
]
```

###<a id="userspreferencesupdate"></a>`POST` /api/users/preferences/update  

Objective: Add preferences to a User's profile 

Input: 

```
{ 
    clientId: *string*,
    preferences: *array of string (preference)*  
}
```

Output:
 
```'Preferences Saved Successfully'```  

###<a id="usersgrouppreferencespost"></a>`POST` /api/users/group/preferences  

Objective: Get prefereces of all Users in specificed in `group` 

Input: 

```
{ 
    clientId: *string*,
    group: *array of string (clientId)*
}
```

Output:
 
```
[
    [
        *string*,
        ...,
        *string*
    ],
    
    [
        ...
    ],
    
    [
        *string*,
        ...,
        *string*
    ],
]
```  

## <a id="Contributing"></a>Contributing