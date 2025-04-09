![Screenshot 2025-04-09 152613](https://github.com/user-attachments/assets/95c88a15-3a9b-4247-b927-22ad50b17402)🚀 BACKEND DEVELOPER MACHINE TEST

This is a Back-end project built using Node.js, Express.js, MongoDB, and Mongoose.
It handles:
1. User registration/login with JWT(JWT for Authetication) (access and refresh tokens)
2. Product and brand management
3. Blocking/unblocking system
4. File uploads using Multer(Multer is a Node.js Middleware for handling multipart/Form-data and used for  uploading files)


SETUP AND RUN THE PROJECT
1.Create Folder for server Application.
2.Create package.json file inside server folder: using npm init -y command
3.Update script key of package.json file as start:node index,js and remove test key from it.
4.Install packages needed to create server.
  -express package:used to create express server using npm i express
  -cors package: used to enable cors protocol using npm i cors
  -dotenv package: used to load content of .env file into process object using npm i dotenv
  -mongoose package: used for communicate between node.js and MongoDB. npm i mongoose.
  -jwt: JsonWebToken used for authentication cmd:npm i jwt
  -validator: used for validating email,password npm i validator
5.Create .env file for storing environmental variables of the project.
6.Create .gitignore file for adding file/folder to ignore them while addiing to git.
7.Create main entry of server which is index,j file in server folder.
8.import cors,express,dotenv db connection file in index.js
9.create PORT number to run the project in browser.
10.Create controller folder to define logic and resolve client request
   -userController.js
   -brandController.js
   -productControlller.js
11.Create route folder in server
12.create js file to define path inside route folder.
13.Mongodb run in atlas
14.get mongodb atlas connection string from .env file
15.using mongoose connect method establish connection b/w server and mongodb
16.import connection file inside index.js to execute connection.
17.Create Model folder inside server.
18.create js file to define model.
19.create model using the Schema.ceate schema for user,brand and product.
20.create middleware folder to controle request response cycle of node.js.
21.create authetication js file inside middleware folder for autheicating user using jwt.
22.create multer js file inside middleware to staore files.
23.create uploads folder inside server folder for storing images.

Run terminal using nodemon
API checking using POSTMAN

API ENDPOINTS
GET – Retrieve data from the server (e.g., get all products).
POST – Send data to the server to create a new resource (e.g., register user, add product).
PUT – Replace an existing resource entirely with new data.
DELETE - Delete data from the server.

DELETE – Remove a resource from the server (e.g., delete a product).
AUTHENTICATION
1. for register using post request- register a new user.
2. for login using post request– authenticate user and return access/refresh tokens.
3. for refresh token - generate a new access token using the refresh token.-post
4. for profile updation by authorised user - put.
5. for delete profile details by authrised users - delete.

BRAND MANAGEMENT
Add new brand with its categoies by authorised users using jwt.-post

PRODUCT MANAGEMENT
 1. Add a new product by an authenticated user (with image upload using multer).-post
 2. Update a product by its ID (only if added by the user).-put
 3. Delete a product by its ID (only if added by the user).-delete
 4. View all products with sorting/filtering and blocking system applied.-get
 5. View all products added by the currently logged-in user.-get

BLOCKING SYSTEM
Block another user by their user ID.-post
Unblock a previously blocked user.-post
Get a list of users blocked by the logged-in user.-get




   







