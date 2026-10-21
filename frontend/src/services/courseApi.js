
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/courses";

export function getCourses() {
  return axios.get(API_URL);
}

export function updateCourse(id, course) {
  return axios.put(`${API_URL}/${id}`, course);
}

export function deleteCourse(id) {
  return axios.delete(`${API_URL}/${id}`);
}
