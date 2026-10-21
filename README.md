# Enterprise Web App — Course API Lab

**Student:** Abdul Qahar Noori  
**Course:** Enterprise Web App  
**Lab:** Display, Edit, and Delete Spring Boot Courses in React

## Project Description

This project connects a React frontend application to a Spring Boot REST API. The React application retrieves course data from the backend and displays it in an HTML table. It also supports editing and deleting courses through API requests.

## Backend

- **Framework:** Spring Boot
- **Language:** Java 17+
- **Port:** 8080
- **API Type:** REST API

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/courses` | Retrieve all courses |
| PUT | `/api/v1/courses/{id}` | Update an existing course |
| DELETE | `/api/v1/courses/{id}` | Delete a course |

*Note: The PUT and DELETE endpoint paths assume your backend uses the same `/api/v1/courses/{id}` route for updating and deleting courses. Adjust them if your controller uses different mappings.*

### Run Backend

Open a terminal in the backend project directory and run:

```bash
mvn spring-boot:run
```

The backend should be available at:

`http://localhost:8080`

## Frontend

- **Framework:** React
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Port:** 5173

### Install Dependencies

Open a terminal in the frontend project directory and run:

```bash
npm install
```

### Run Frontend

```bash
npm run dev
```

The frontend should be available at:

`http://localhost:5173`

## API Operations

### 1. Get All Courses

The React application sends a GET request to:

```http
GET http://localhost:8080/api/v1/courses
```

The backend returns course records containing:

- ID
- Code
- Title
- Credits

### 2. Edit a Course

The application allows users to edit an existing course and submit the updated information to the backend.

Example request:

```http
PUT http://localhost:8080/api/v1/courses/1
Content-Type: application/json
```

Example request body:

```json
{
  "code": "CS101",
  "title": "Introduction to Computer Science",
  "credits": 3
}
```

After a successful update, the frontend should display the updated course information.

### 3. Delete a Course

The application allows users to delete an existing course.

Example request:

```http
DELETE http://localhost:8080/api/v1/courses/1
```

After successful deletion, the course should be removed from the displayed list.

**Important:** The example requests assume that the backend accepts these routes and request formats. Verify them against your actual controller and service implementation.

## Lab Requirements Implemented

- GET request from React to Spring Boot
- Axios API service
- `useEffect` for loading API data
- `useState` for managing course data
- `map()` for rendering course rows
- Unique React row key using `course.id`
- CORS configuration
- Loading state
- Error state
- Empty-list state
- Total course count using `courses.length`
- Edit course functionality
- Delete course functionality
- API communication between React and Spring Boot
- Updated course list after editing or deleting, provided the frontend refreshes or updates its state

### Required Table Columns

1. ID
2. Code
3. Title
4. Credits
5. Actions (Edit and Delete buttons)

## Testing

The following tests can be performed to verify the application.

### 1. Normal GET Request

- Start the Spring Boot backend.
- Open the React frontend.
- Verify that the course records are displayed.
- Confirm that the API returns HTTP `200`.

### 2. Edit Course

- Select the Edit button for a course.
- Modify its information.
- Save the changes.
- Verify that the updated information appears in the table.
- Confirm that the backend data has been updated.

### 3. Delete Course

- Select the Delete button for a course.
- Confirm the deletion if a confirmation dialog is implemented.
- Verify that the course disappears from the table.
- Confirm that the course is deleted from the backend.

### 4. Backend Stopped

- Stop the Spring Boot backend.
- Refresh the React application.
- Verify that the frontend displays an appropriate error message, such as:

```text
Unable to load courses. Check the backend and try again.
```

### 5. Empty Response

- Configure the backend to return an empty list.
- Verify that the frontend displays:

```text
No courses available.
```

### 6. Network Testing

Use the browser's Developer Tools and Network tab to inspect API requests.

Verify the following requests as applicable:

- `GET /api/v1/courses`
- `PUT /api/v1/courses/{id}`
- `DELETE /api/v1/courses/{id}`

Check the HTTP status codes and response bodies to confirm successful operations.

## Questions and Answers

### 1. Why use `useEffect`?

`useEffect` is used to load course data from the backend when the `Courses` component is mounted.

### 2. What does `setCourses` do?

`setCourses` updates the courses state with the data received from the backend and causes React to render the updated course list.

### 3. Why can Postman work while a browser request fails?

Postman is not restricted by browser CORS rules. Browser requests are subject to CORS, so the Spring Boot backend must allow requests from the React frontend origin.

### 4. How does editing a course work?

The frontend sends an update request to the backend with the course ID and updated data. The backend processes the request and saves the changes.

### 5. How does deleting a course work?

The frontend sends a DELETE request with the course ID. The backend deletes the corresponding record, and the frontend updates the displayed list.

### 6. Why should the frontend update after editing or deleting?

Updating the frontend state ensures that users see the latest course information without needing to manually reload the page.

## Screenshots

The submission can include the following screenshots:

1. Populated course table
2. Successful API request in Postman
3. React frontend displaying courses
4. Course editing interface
5. Updated course after editing
6. Course list after deletion
7. Error state when the backend is unavailable

## Project Structure

```text
project/
├── backend/
│   └── Spring Boot project
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── screenshots/
│   ├── 01-api-success-test-on-postman.png
│   ├── 02-backend-connection-with-frontend.png
│   ├── 03-courses-on-the-browser.png
│   ├── 04-edit-course.png
│   └── 05-delete-course.png
│
└── README.md
```

## Technologies

- Java
- Spring Boot
- Spring Web
- React
- Vite
- Axios
- JavaScript
- HTML
- CSS
- REST API

## Conclusion

This project demonstrates how to integrate a React frontend with a Spring Boot REST API for course management. Users can retrieve and display courses, edit existing course information, and delete courses through API requests. The application also addresses loading, error, empty-list, and course-count requirements.

The project demonstrates the basic principles of frontend-backend communication, REST API integration, and CRUD operations for managing course records.