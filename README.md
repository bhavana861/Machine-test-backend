🚀 BACKEND DEVELOPER MACHINE TEST

This is a Back-end project built using Node.js, Express.js, MongoDB, and Mongoose.
It handles:
1. User registration/login with JWT(JWT for Authetication) (access and refresh tokens).
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



Sample request/response for each API

Register user
![Screenshot 2025-04-09 152613](https://github.com/user-attachments/assets/a97434ab-26b8-4ce3-9810-3d40b7f86e77)
Login User
![Screenshot 2025-04-09 153623](https://github.com/user-attachments/assets/c2311b99-f324-456c-a960-285df037ddbf)
Refresh Token
![Screenshot 2025-04-09 153714](https://github.com/user-attachments/assets/d7258c5d-e2d1-43a2-8863-ef8e1cd65dec)
Update user details
![Screenshot 2025-04-09 153742](https://github.com/user-attachments/assets/1b7ff5f6-e645-49e9-8380-fcd522b52aca)
Delete user details
![Screenshot 2025-04-09 162412](https://github.com/user-attachments/assets/dc65c854-ae98-4f00-8db5-59ff5f23e23c)
Add Brand
![Screenshot 2025-04-09 164758](https://github.com/user-attachments/assets/6865d0df-0983-4777-afa6-60191f4dc21f)
Fetch brands
![Screenshot 2025-04-09 164858](https://github.com/user-attachments/assets/7a99a26a-9c96-4baa-b521-8551bb070850)
Add products
![Screenshot 2025-04-09 165250](https://github.com/user-attachments/assets/8371a860-ae59-428d-9bfc-4548de29452c)
Update products-description edited
![Screenshot 2025-04-09 165623](https://github.com/user-attachments/assets/1d10e6bb-70db-4fa9-b064-e3912dcc9d13) 
Delete product
![Screenshot 2025-04-09 165812](https://github.com/user-attachments/assets/dc984341-9b80-4bcd-88de-3a39fb1b8bae)
User Blocking
![Screenshot 2025-04-09 165946](https://github.com/user-attachments/assets/7f91a714-3637-4bc4-8060-f150cac4d9b7)
MongoDB-ID of blocked user
![Screenshot 2025-04-09 170531](https://github.com/user-attachments/assets/7e5c028f-a31f-4418-a446-af85788a0bf6)
User unblocking
![Screenshot 2025-04-09 170059](https://github.com/user-attachments/assets/c3f83391-e2f7-4a57-818a-6462f3cc1578)
View All products
![Screenshot 2025-04-09 170216](https://github.com/user-attachments/assets/da3bec31-499c-4fe3-97a7-2dab2701bb84)
![Screenshot 2025-04-09 170204](https://github.com/user-attachments/assets/86c86931-58e7-431d-b45a-7a786e5324fd)
Filter and sort products
![Screenshot 2025-04-09 170331](https://github.com/user-attachments/assets/2139dade-d8d6-48fe-97b3-85957bd0f5b8)















   







