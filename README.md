# Potluck Planner API

## API url: https://potluck-planner-07.herokuapp.com

### API Documentation:

#### Users:
[GET] /api/users - returns an array filled with user objects similar to the following: 
```js
[
  {
        user_id: 1,
        username: "fred",
        password: "$2a$08$R//PP9zaFmo5t3RYL4Yh0ONj.68YU2UQ5HlXbt8TbD.WHFMweWCsG",
        name: "Fred",
        email: "fred@test.com"
    },
    {
        user_id: 2,
        username: "shaggy",
        password: "$2a$08$6TceWJyijzXrBAQlP.ZsW.o1y1MmmfJaCb3GPlJ.LnC3eYKtiWbzK",
        name: "Shaggy",
        email: "shaggy@test.com"
    }
]
```

#### Authentication:
| Method   | URL                | Description                                                                                            |
| ------   | --------------     | ------------------------------------------------------------------------------------------------------ |
| [POST]   | /api/auth/register | Requires a username, password, name, and email. Registers a new user.                                  |
| [POST]   | /api/auth/login    | Requires a username and password. Logs the user in.                                                    |

#### Users: 
| Method   | URL                | Description                                                                                            |
| ------   | --------------     | ------------------------------------------------------------------------------------------------------ |
| [GET]    | /api/users/        | Returns an array filled with user objects.                                                             |
| [GET]    | /api/users/:id     | Returns the user object with the specified `user_id`.                                                       |
| [DELETE] | /api/users/:id     | Removes the user with the specified `user_id` and returns the deleted user.                                 |
| [PUT]    | /api/users/:id     | Updates the user with the specified `user_id` using data from the `request body`. Returns the modified user |

#### Events: 
| Method   | URL                 | Description                                                                                                    |
| ------   | --------------      | ---------------------------------------------------------------------------------------------------------      |
| [GET]    | /api/events/        | Returns an array filled with event objects.                                                                    |
| [GET]    | /api/events/:id     | Returns the event object with the specified `event_id`.                                                        |
| [DELETE] | /api/events/:id     | Removes the event with the specified `event_id` and returns the deleted event.                                 |
| [PUT]    | /api/events/:id     | Updates the event with the specified `event_id` using data from the `request body`. Returns the modified event |

#### Guests:
| Method   | URL                        | Description                                                                                                 |
| ------   | --------------             | ---------------------------------------------------------------------------------------------------------   |
| [GET]    | /api/events/:id/guests     | Returns an array filled with guests attending the event.                                                    |
| [POST]   | /api/events/:id/guests     | Requires a `user_id` and a boolean of `attending` (true or false). Adds a guest to the event.               |
| [DELETE] | /api/events/:id/guests     | Requires `user_id` Removes the guest with the specified `user_id` and returns the new list of guests.       |

#### Items:
| Method   | URL                       | Description                                                                                                  |
| ------   | --------------            | ---------------------------------------------------------------------------------------------------------    |
| [GET]    | /api/events/:id/items     | Returns an array filled with items for the event.                                                            |
| [POST]   | /api/events/:id/items     | Requires an `item_name` and a `name` (name of the person bringing the item) and adds the new item to the list of items                                              |
| [DELETE] | /api/events/:id/items     | Requires `item_name` Removes the item with the specified `item_name` and returns the new list of items.      |