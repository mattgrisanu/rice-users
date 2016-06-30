#Users Serice API

###Endpoints
#####POST

```/api/users/user```

Objective: Get all information of a single user

Input: 
`{ 
clientId: ####string#### 
}`

Output: {
'id': ####integer####
'clientId': ####string####
'name': ####string####
'email': ####string####
'review_count': ####integer####
'isOnboarded': ####boolean integer####
'password': ####string####
}

`/api/users/user/update`
`/api/users/user/new`
`/api/users/user`
`/api/users/friends`
`/api/users/friends/new`

`/api/users/preferences`
`/api/users/preferences/update`
`/api/users/group/preferences`