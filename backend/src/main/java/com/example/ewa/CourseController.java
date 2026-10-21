
package com.example.ewa;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    public record Course(long id, String code, String title, int credits) {}

    private final List<Course> courses = new ArrayList<>(
            List.of(
                    new Course(1, "EWA301", "Enterprise Web App", 3),
                    new Course(2, "DB201", "Database Systems", 3),
                    new Course(3, "SE202", "Software Engineering", 3)
            )
    );

    private final AtomicLong nextId = new AtomicLong(4);

    // GET: Retrieve all courses
    @GetMapping
    public synchronized List<Course> getCourses() {
        return new ArrayList<>(courses);
    }

    // PUT: Update an existing course
    @PutMapping("/{id}")
    public synchronized ResponseEntity<?> updateCourse(
            @PathVariable long id,
            @RequestBody Course request) {

        if (request.code() == null || request.code().isBlank()
                || request.title() == null || request.title().isBlank()
                || request.credits() < 1) {
            return ResponseEntity.badRequest()
                    .body("Code, title, and positive credits are required.");
        }

        for (int i = 0; i < courses.size(); i++) {
            if (courses.get(i).id() == id) {
                Course updated = new Course(
                        id,
                        request.code().trim(),
                        request.title().trim(),
                        request.credits()
                );

                courses.set(i, updated);
                return ResponseEntity.ok(updated);
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Course not found with id: " + id);
    }

    // DELETE: Remove an existing course
    @DeleteMapping("/{id}")
    public synchronized ResponseEntity<?> deleteCourse(
            @PathVariable long id) {

        boolean removed = courses.removeIf(course -> course.id() == id);

        if (removed) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Course not found with id: " + id);
    }
}
