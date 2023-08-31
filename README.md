## Notes Api

A node.js api for notes app.

## Server features

1. Sets up middleware for user authentication (used JWT authenticatioin).
2. Connects to the MysqlDB using sequelize for CRUD operations.
3. Used Express server to serve API endpoints.

## API endpoints


1. **/user/signup**  - To register new users.
2. **/user/login**  - For login users.
3. **/notes/add-note**  - To create new note. It creates new note in DB.
4. **/notes/getAll-notes**  - To get all the notes from the DB.
5. **/notes/get-note/:noteid**  - To get a particular note using it's id from DB.
6. **/notes/update-note/:noteid**  - To update the note using it's id from DB.
7. **/notes/delete-note/:noteid**  - To delete note using it's id from DB.

**Note** : API endpoints '**/notes/add-note**', '**/notes/getAll-notes**', '**/notes/get-note/:noteid**', '**/notes/update-note/:noteid**', '**/notes/delete-note/:noteid**' needs to be authenticated by JWT token to work. The client needs to send the JSON web token through the Authorization header.

## GET AllNotes Request

The **/notes/getAll-notes** request is need to be send with page and limit values like **/notes/getAll-notes?page=2&limit=2** as pagination added to that request.

## Dependencies

* Cors (Any origin works in our API)
* Express
* sequelize(to connect to mysql)
* Mysql (schemas)
* dotenv (get the .env file working with environment variables)
* bcrypt (Hash our password) 
* JWT (Jason Web Tokens)
* body parser(to parse the incoming body requests)

 
