# Alemeno

Hey there, This is a prerequisite task by Alemeno, to start this, follow these steps:

1. Open the `course-backend` folder, change the database URL in `index.js`. Otherwise, you can contact me for access to the database from your IP Address.
2. Import all the necessary node-modules.
3. There is a script in `scripts/importData.js`, this script is used to feed dummy data to the database. It will upload 10-10 courses and students to the database and will log "Database Seeded".
4. Start the server using `nodemon` or just `yarn start`.
5. You will see the Port backend is running on and the Database connection status.

Now, switch to the `frontend` folder:
1. Import necessary node-modules.
2. Start by `yarn start`.

## In this web app:

- You will have Dashboard at `'/'`.
- After this, it will ask for a student ID, this is the ID given by us in the database, you can use `101-110`, fed by me in the database.
- Now it will show the Name and Email of the student and courses he/she has registered.
- There are two buttons: `Logout` and `Show Courses`.
- The student's data and login state is managed by Redux and will refresh on reloading the browser.
- You can see the courses and basic info of courses in the course listing page at `'/courses'`.
- You can use the search bar to search for a course by course name, or you can use the dropdown to filter courses on the basis of availability.
- On clicking the details page, you will navigate to the required course details page at `'/courses/:id'`.
- The data is loaded dynamically by getting the parameters using `'useParams'` and fetching the data from the backend `"/api/courses/:id"`.
- You can see the data rendered on this page, and at the end of it, there are two buttons:
  - You can register for this course if not registered yet, after registering you can see your name in the registered students section.
  - There is another button for liking the course.

### Bonus Task:

- Although it can be implemented normally, and will still get updated after liking, I have implemented `'socket.io'` for this part only.
- On going to the details page, the socket-client will first emit `joinRoom`, so that it can get the course by `courseId`. Then on clicking the like button, the API is called that will increment the like of the course, and the socket will emit the new likes, which will be updated by the socket client into the previously fetched `courseData` making it more dynamic and updating in real-time by using Web Sockets.

### Additional Features:

- There is a Navbar to easily navigate between `Courses` and `Dashboard`.
- You can explore courses and like the courses, but to register, you will need to Register in the Dashboard.
- You can see the courses registered in the Dashboard too, with a progress bar that will randomly show the progress between 30-70 percent.
- There is a `'Mark as Completed'` button, which on clicking fills the progress bar to full. Its state is managed by Redux, and this is not updated to the backend. Hence, on refreshing and logging in again, it will show the course as incomplete.
