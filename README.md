# Tennis-System
This is the main website and system for Ball Fuzz Tennis Center.

Objective: Our  goal was to create a tennis website with full functionality. The main page displays the prominent features of our website. A user can book a court or reserve some lessons provided that they sign up for an account. We have a shop that displays all the items that our tennis center has to offer and finally a calendar that shows the ongoing events. For our final project we used the MVC architecture with separate containers for logical functionality with a Restful structure. While on the client side we used EJS, JS, CSS and HTML. The following requirement has also been implemented:
Proper input validation and sanitation.
Process user and admin authorization.
Error handling.
Flash messages with cookies and sessions.

History of changes:
We were able to implement most of the initial ideas:
Admin Access includes sign-in/sign-out and sign up, view club store inventory, purchase equipment, create personal court reservations, create personal lesson reservations, modify member reservations, delete members and override member purchases and view our calendar  and sign up for events.
Member Access includes  sign-in/sign-out and sign up, create court reservations, create lesson reservations, view club store inventory and purchase equipment and view our calendar and sign up for events.

Team member tasks and responsibilities:

Jonathan: To start off the project, my first task was to implement a simple homepage for the site. This was more of a temporary page to hold site navigation. I created a navigation bar to house site locations. I also started creating reservations pages for booking courts and lessons. This first stage only involved the skeletal layout of these pages, without functionality. My next task was to migrate our current setup to a functional Node application. The structure of the application from now on uses an MVC architecture. I implemented a router to handle all site pages and functions. At this stage, I also connected up a database to start storing out site data. At this point, this included mainly user data. Onto our next assignment, my task was to start improving the structure of our application. I made our user model more robust, improved our site routes to be more complex, as well as implement the reservation system. Adding functionality to the court and lesson reservation pages consisted of using vanilla JavaScript. A lot of the reservation functionality rested as client-side code. Registered users could now book courts or lessons and that would reflect in real time on our database. My final task consisted of improving the reservation system, adding a user profile page with account functionality, including viewing account information and reservation information, adding roles such as standard users and administrators, adding an admin dashboard to handle many site functions such as adding or editing shop items, and viewing and suspending users. I also implemented most of the shop functionality, including viewing store inventory, adding items to a cart for registered users, and store checkout ability. Finally, my task was to clean up the user interface, creating an aesthetically pleasing experience.

Ridhisha: I was assigned to create the sign up and sign in pages for the website. I used HTML5 with embedded bootstrap and CSS for styling. I further added client side verification. I was responsible for adding the error controller for generic error handling and user controlling. I modified the sign in and sign up pages to handle requests. Finally, I added validators and authenticators to the sign in and sign up pages to correctly store the data in the database. And finally added a thanks and an error view page along with a seed file to populate the database. I was responsible for setting up the users controller to handle login and sign up requests. I inserted cookie and cookie sessions to insert flash messages for handling requests. I modified the signup to where it creates a new user and makes basic user identity checks. In addition, I added user validations for correct data input and extended views to check if a user has logged in and handled user log outs.
 
Instructions: To run our application from a fresh clone, you must:
Run 'npm install' to install all required dependencies for the project
To populate database with all data, run 'npm run seed'
Run 'npm start' to run the application using nodemon
