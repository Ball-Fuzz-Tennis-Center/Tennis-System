# Tennis-System
This is the main website and system for Ball Fuzz Tennis Center.

Objective: Our task for assignment 3 was to convert our site to a Node web application which conforms to MVC architecture. All existing pages have been migrated to abide by the new structure. We had to link a database to the application to handle our site data, migrate existing validation techniques to conform to MVC, as well as creating error handling for the application.

Jonathan: I was in charge of the migration to a Node web application. I initialized NPM and added the required packages to the project. Then I converted all pages to views as ejs files and re-routed everything manually through our new controllers. I also setup the database connection and created a User schema to store data about our customers.

Ridhisha:I was responsible for adding the error controller for generic error handeling and usercontrolling. I modified the sign in and sign up pages to handle request. Finally, I added validators and authenticator to the sign in and sign up pages to correctly store the data in the database.And finally added a thanks and an error view page along with a seed file to populate the database.

Instructions: To run our application from a fresh clone, you must:
1. Run 'npm install' to install all required dependencies for the project
2. Run the seed.js file to populate the database with test data
3. Run 'npm start' to run the application using nodemon

=======
Objective: The goal of this assignment was to accomplish two tasks at hand. The first was to create a web app that uses Google API to search through Google books. The second task was to add dynamicity to the page by validating the sign up input values and create a function to change the layout. Both of these tasks had to be done in either Javascript, JQuery or Vue.js.

Accomplishments: We decided to divide the project such that each member finished a part each of the project. We added client-side validation to forms on our website. We also improved the Google books API site from classwork with pagination and more detailed results.
Ridhisha: I was working on part two of the project. I added a javascript page named signup.js. The first three functions serve the same purpose of hiding the input field from the users until they select a security question from the dropdown menu. The fourth function validates the user inputs. It checks if the two passwords are a match or not if they are not then an error is shown but if they are a match it undergoes another check to see whether the passwords meet the required conditions of at least one capital letter, one small letter and one number. If it passes the test it moves on to the next phase. To see if any of the inputs have a invalid symbols and if so it displays an error.

Jonathan: I took care of part 1 of this assignment. I added pagination to the site including previous and next buttons as well as a status of which results are being currently viewed. I also had the previous and next buttons be disabled when necessary. I also added some more information to the book information such as ISBN13 as well as a description of the book. Then I cleaned up the aesthetic of the site for a nice and simple look. 

Issues: The only issue that I ran across was the highlighting the background of the input. Each time I tried the entire function would not work at all. One bug with the Google books API site is differing amount of results. Performing the same search over and over can sometimes yield different results and this can cause a bug with the pagination.

