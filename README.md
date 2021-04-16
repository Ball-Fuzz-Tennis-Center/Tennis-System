# Tennis-System
This is the main website and system for Ball Fuzz Tennis Center.

Objective:

Jonathan:
My task was to make our User model more robust, convert our routes to become a better and more complex structure, as well as implement the core functionality of this web application. Making the User model more robust entailed getting it ready for use with MongoDB and refactoring attributes within the model to make it easier to understand. Converting the web application's structure meant rerouting all current routes and refactoring files to follow a more intuitive structure. Implementing the core functionality meant adding court and lesson reservation. A user can now book a court or lesson and it will update our database in real time, as well as the time slot availability on the site itself in real time.

Ridhisha:
I was responsible for setting up the usercontroller to handle login and sign up requests. I inserted cookie and cookie sessions to insert flash messages for handeling requests. I modified the signup to where it creates a new user and makes basic user identity checks. In addition, I added user validations for correct data input and extended views to check if a user has logged in and handled user log outs. 

Instructions: To run our application from a fresh clone, you must:
1. Run 'npm install' to install all required dependencies for the project
2. Run the seed.js file to populate the database with test data
3. Run 'npm start' to run the application using nodemon
