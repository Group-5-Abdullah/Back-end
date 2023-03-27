# Back-end
event planning 
# Server Endpoints

## GET /

This route is a simple default route that responds with the message "hi".
There are no query parameters or path parameters required for this route.

## GET /MusicAPI

This route retrieves music data from an external API.
There are no query parameters or path parameters required for this route.

## GET /Music

This route retrieves music data from the PostgreSQL database based on event id.

Required query parameter:
- `eventid`: the event id that the music data is being retrieved.

## POST /Music

This route adds new music data to the PostgreSQL database.

Required request body: A JSON object containing the following properties:
- `user_email`: The email address of the user adding the music data.
- `track_name`: The name of the track.
- `track_url`: The URL of the track.
- `artist_name`: The name of the artist.
- `eventid`: The ID of the event that the music data belongs to.

## DELETE /Music/:id

This route deletes a specific music record from the PostgreSQL database.


Required path parameter:
- `eventid`: The event id of the music record being deleted.

---------------------------------------------------------------------------------


## GET /gifts
This route retrieves a list of gifts from an external API.

### Query Parameters
There are no query parameters required for this route.

### Response
Returns a JSON object containing an array of gift objects, with the following properties:

- `gift_title` (string) - The title of the gift.
- `gift_image` (string) - The URL of the gift's image.
- `gift_price` (number) - The price of the gift.

## POST /gift
This route adds a new gift to the database.

### Query Parameters
Required query parameter:
- `eventid`: the event id that the music data is being insert.

### Request Body
A JSON object containing the following properties:

- `gift_title` (string) - The title of the gift.
- `gift_image` (string) - The URL of the gift's image.
- `gift_price` (number) - The price of the gift.
- `user_email` (string) - The email address of the user adding the gift.
- `eventid`    (number) - The ID of the event that the gift data belongs to.

### Response
Returns a JSON object containing an array of gift objects, with the following properties:

- `id` (number) - The ID of the gift in the database.
- `gift_title` (string) - The title of the gift.
- `gift_image` (string) - The URL of the gift's image.
- `gift_price` (number) - The price of the gift.
- `user_email` (string) - The email address of the user who added the gift.
- `eventid`    (number) - The event id of the gift.
## GET /gift
This route retrieves a list of gifts from the database based on event id .

### Query Parameters
- `eventid` (number, required) - event id of the user whose gifts are being retrieved.

### Response
Returns a JSON object containing an array of gift objects, with the following properties:

- `id` (number) - The ID of the gift in the database.
- `gift_title` (string) - The title of the gift.
- `gift_image `(string) - The URL of the gift's image.
- `gift_price` (number) - The price of the gift.
- `user_email` (string) - The email address of the user who added the gift.
- `eventid`    (number) - The event id of the gift.

## DELETE /gift/:id
This route deletes a specific gift record from the database.

### Path Parameters
- `eventid` (number, required) - The event id of the gift record being deleted.

### Response
Returns a JSON object containing an array of gift objects, with the following properties:

- `id` (number) - The ID of the gift in the database.
- `gift_title` (string) - The title of the gift.
- `gift_image` (string) - The URL of the gift's image.
- `gift_price` (number) - The price of the gift.
- `user_email` (string) - The email address of the user who added the gift.
- `eventid`    (number) - The event id of the gift.
---------------------------------------------------------------------------------
## GET /flowerslist

This route retrieves a list of flowers from a JSON file.

**Response**

Returns a JSON object containing an array of flower objects, with the following properties:

- `photo` (string) - The URL of the flower's image.
- `name` (string) - The title of the flower.


## POST /flowerslist

This route adds a new flower to the database.

**Request Body**

A JSON object containing the following properties:

- `flower_title` (string) - The title of the flower.
- `flower_image` (string) - The URL of the flower's image.
- `user_email` (string) - The email address of the user adding the flower.
- `eventid` (number) - The event id of the added flower.

**Response**

Returns a JSON object containing an array of flower objects, with the following properties:

- `id` (number) - The ID of the flower in the database.
- `flower_title` (string) - The title of the flower.
- `flower_image` (string) - The URL of the flower's image.
- `user_email` (string) - The email address of the user who added the flower.
- `eventid` (number) - The event id of the flower.

## GET /flower

This route retrieves a list of flowers from the database based on event id.

**Query Parameters**

- `eventid` (number, required) - The event id of the user whose flowers are being retrieved.

**Response**

Returns a JSON object containing an array of flower objects, with the following properties:

- `id` (number) - The ID of the flower in the database.
- `flower_title` (string) - The title of the flower.
- `flower_image` (string) - The URL of the flower's image.
- `user_email` (string) - The email address of the user who added the flower.
- `eventid` (number) - the event id of the flower.

## DELETE /flower/:id

This route deletes a specific flower record from the database.

**Path Parameters**

- `eventid` (number, required) - The event id of the flower record being deleted.

**Response**

Returns a JSON object containing an array of flower objects, with the following properties:

- `id` (number) - The ID of the flower in the database.
- `flower_title` (string) - The title of the flower.
- `flower_image` (string) - The URL of the flower's image.
- `user_email` (string) - The email address of the user who added the flower.
- `eventid` (number) - the event id of the flower.
----------------------------------------------------------------------------------------

## GET /events

Retrieves a list of all events in the database.

**Path Parameters**

- `user-email` (string, required) - user email, the response depend on user email .

**Response**

Returns an array of objects with the following properties:

- `eventid `(number) - The ID of the event.
- `event `(string) - The title of the event.
- `location` (string) - The location of the event.
- `date `(string) - The date of the event.
- `description` (string) - The description of the event.
- `user-email` (string) - user email



## POST /events

Adds a new event to the database.

**Request Body**

A JSON object containing the following properties:

- `event` (string, required) - The title of the event.
- `location` (string, required) - The location of the event.
- `date` (string, required) - The date of the event.
- `description` (string, required) - The description of the event.
- `user_email` (string, required) - The email address of the user adding the event.

**Response**

Returns the added event object with the following properties:

- `eventid `(number) - The ID of the added event.
- `event `(string) - The title of the event.
- `location` (string) - The location of the event.
- `date` (string) - The date of the event.
- `description` (string) - The description of the event.
- `user_email` (string) - The email address of the user who added the event.


## PUT /events/:id

Updates a specific event record in the database.

**Path Parameters**

- `eventid` (number, required) - The ID of the event record being updated.

**Request Body**

A JSON object containing the following properties:

- `event` (string, required) - The updated title of the event.
- `location` (string, required) - The updated location of the event.
- `date` (string, required) - The updated date of the event.
- `description` (string, required) - The updated description of the event.
- `user_email` (string, required) - The email address of the user updating the event.

**Response**

Returns the updated event object with the following properties:

- `eventid` (number) - The ID of the updated event.
- `event` (string) - The updated title of the event.
- `location` (string) - The updated location of the event.
-` date `(string) - The updated date of the event.
- `description` (string) - The updated description of the event.
- `user_email` (string) - The email address of the user who updated the event.


## DELETE /events/:id

Deletes a specific event record from the database.

**Path Parameters**

- `eventid` (number, required) - The ID of the event record being deleted.

**Response**

Returns an empty JSON object with HTTP status code 204 (No Content).

--------------------------------------
## GET /FoodAPI

Retrieves a list of food items from the Spoonacular API based on the provided query.

### Query Parameters:

- `query` (string, required) - The search term for food items.

### Response:

Returns an array of objects with the following properties:

- `title` (string) - The title of the food item.
- `image` (string) - The URL for the image of the food item.

## GET /food

Retrieves a list of food items from the database based on event id.

### Query Parameters:

- `eventid` (number, required) - The event id.

### Response:

Returns an array of objects with the following properties:

- `id` (number) - The ID of the food item.
- `user_email` (string) - The email address of the user who added the food item.
- `food_title` (string) - The title of the food item.
- `food_image` (string) - The URL for the image of the food item.
- `eventid` (number) - The event id related to the food.

## POST /food

Adds a new food item to the database.

### Request Body:

A JSON object containing the following properties:

- `user_email` (string, required) - The email address of the user adding the food item.
- `food_title` (string, required) - The title of the food item.
- `food_image` (string, required) - The URL for the image of the food item.
- `eventid` (number) - The event id related to the food.

### Response:

Returns an array of objects with the following properties:

- `id` (number) - The ID of the added food item.
- `user_email` (string) - The email address of the user who added the food item.
- `food_title` (string) - The title of the food item.
- `food_image` (string) - The URL for the image of the food item.
- `eventid` (number) - The event id related to the food.

## DELETE /food

Deletes a food item from the database.

### Query Parameters:

- `eventid` (number, required) - The ID of the event related to food item to be deleted.
- `user_email` (string, required) - The email address of the user who owns the food item to be deleted.

### Response:

Returns an array of objects with the following properties:

- `id` (number) - The ID of the remaining food items.
- `user_email` (string) - The email address of the user who owns the remaining food items.
- `food_title` (string) - The title of the remaining food items.
- `food_image` (string) - The URL for the image of the remaining food items.
- `eventid` (number) - The event id related to the food.
----------------------------------


## GET /readyPackegess

This route retrieves data from a JSON file There are no query parameters or path parameters required for this route.

**Response:**

- 200 OK: Returns the JSON data from the file as the response.

## GET /readyPackeges

This route retrieves data from the PostgreSQL database based on a user's email address.

**Required query parameter:**

- `eventid`: The event id of the user whose data is being retrieved.

**Response:**

- 200 OK: Returns the retrieved data as the response.




## POST /readyPackeges

This route adds new data to the PostgreSQL database.

**Required request body:**

A JSON object containing the following properties:

- `user_email`: The email address of the user adding the data.
- `gift_title`: The title of the gift.
- `gift_image`: The URL of the gift image.
- `gift_price`: The price of the gift.
- `flower_image`: The URL of the flower image.
- `flower_name`: The name of the flower.
- `track_name`: The name of the track.
- `track_url`: The URL of the track.
- `aritst_name`: The name of the artist.
- `food_title`: The title of the food.
- `food_image`: The URL of the food image.
- `eventid`: The event id of the user.

**Response:**

- 200 OK: Returns the newly added data as the response.



## DELETE /readyPackeges/:eventid

This route deletes a specific record from the PostgreSQL database.

**Required path parameter:**

- `eventid`: The ID of the event for the record being deleted.

**Response:**

- 200 OK: Returns the remaining data after the specified record has been deleted as the response body.
