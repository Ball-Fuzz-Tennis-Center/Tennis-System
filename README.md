# Tennis-System
This is the main website and system for Ball Fuzz Tennis Center.

Objective: Our task for assignment 3 was to convert our site to a Node web application which conforms to MVC architecture. All existing pages have been migrated to abide by the new structure. We had to link a database to the application to handle our site data, migrate existing validation techniques to conform to MVC, as well as creating error handling for the application.

Jonathan: I was in charge of the migration to a Node web application. I initialized NPM and added the required packages to the project. Then I converted all pages to views as ejs files and re-routed everything manually through our new controllers. I also setup the database connection and created a User schema to store data about our customers.

Ridhisha:I was responsible for adding the error controller for generic error handeling and usercontrolling. I modified the sign in and sign up pages to handle request. Finally, I added validators and authenticator to the sign in and sign up pages to correctly store the data in the database.And finally added a thanks and an error view page along with a seed file to populate the database.

Instructions: To run our application from a fresh clone, you must:
1. Run 'npm install' to install all required dependencies for the project
2. Run the seed.js file to populate the database with test data
3. Run 'npm start' to run the application using nodemon
