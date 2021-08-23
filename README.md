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
},
{
user_id: 2,
username: "test2",
password: "1234",
}
]
```
[GET] /api/users/:id - Requires a `user_id` - Returns a single user object
[PUT] /api/users/:id - Requires the `user_id` being updated and changes to be made - Updates and returns with specified user
[DELETE] - Requires the id being deleted - Deletes and returns the specified user
#### Authentication:
| Method   | URL                | Description                                                                                            |
| ------   | --------------     | ------------------------------------------------------------------------------------------------------ |
| [POST]   | /api/auth/register | Requires a username and password.                                                                      |
| [POST]   | /api/auth/login    | Requires a username and password.                                                                      |

#### Users: 
| Method   | URL                | Description                                                                                            |
| ------   | --------------     | ------------------------------------------------------------------------------------------------------ |
| [GET]    | /api/users/        | Returns an array filled with user objects.                                                             |
| [GET]    | /api/users/:id     | Returns the user object with the specified `user_id`.                                                       |
| [DELETE] | /api/users/:id     | Removes the user with the specified `user_id` and returns the deleted user.                                 |
| [PUT]    | /api/users/:id     | Updates the user with the specified `user_id` using data from the `request body`. Returns the modified user |

#### Events: 
| Method   | URL                 | Description                                                                                              |
| ------   | --------------     | --------------------------------------------------------------------------------------------------------- |
| [GET]    | /api/events/        | Returns an array filled with event objects.                                                              |
| [GET]    | /api/events/:id     | Returns the event object with the specified `event_id`.                                                        |
| [DELETE] | /api/events/:id     | Removes the event with the specified `event_id` and returns the deleted event.                                 |
| [PUT]    | /api/events/:id     | Updates the event with the specified `event_id` using data from the `request body`. Returns the modified event |