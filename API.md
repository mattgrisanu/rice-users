#Users Service API Endpoints

`GET` /api/users/users  
`POST` /api/users/user/update  
`POST` /api/users/user/new  
`POST` /api/users/user  
`POST` /api/users/friends  
`POST` /api/users/friends/new  
`POST` /api/users/preferences  
`POST` /api/users/preferences/update  
`POST` /api/users/group/preferences  
  
***
  
###```POST``` /api/users/user

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

###`POST` /api/users/user/update  

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

###`GET` /api/users/users  

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

  
###`POST` /api/users/friends  

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

###`POST` /api/users/friends/new  

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

###`POST` /api/users/preferences  

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

###`POST` /api/users/preferences/update  

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

###`POST` /api/users/group/preferences  

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