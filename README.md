# Potluck Planner API

## API url: https://potluck-planner-07.herokuapp.com/

### API Documentation:
#### Authentication:

[POST] /api/auth/register - requires a username and password - creates a new user
[POST] /api/auth/login - requires a username and password - used to log in user

#### Users:
[GET] /api/users - returns an array filled with user objects similar to the following: 
```js
[
{
user_id: 1,
username: "test1",
password: "1234",
created_at: "2021-08-22T17:44:02.898Z",
updated_at: "2021-08-22T17:44:02.898Z"
},
{
user_id: 2,
username: "test2",
password: "1234",
created_at: "2021-08-22T17:44:02.898Z",
updated_at: "2021-08-22T17:44:02.898Z"
}
]
```
[GET] /api/users/:id - Requires a `user_id` - Returns a single user object
[PUT] /api/users/:id - Requires the `user_id` being updated and changes to be made - Updates and returns with specified user
[DELETE] - Requires the id being deleted - Deletes and returns the specified user


