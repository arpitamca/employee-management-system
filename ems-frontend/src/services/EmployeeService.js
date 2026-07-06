import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees'; //Instead of writing: axios.get("http://localhost:8080/api/employees"); every time, you store it once in a variable.

export const listEmployees = () => axios.get(REST_API_BASE_URL); //listEmployees() is a reusable function that uses Axios to send a GET request to the Spring Boot REST API. It is exported so other React components can import and use it to retrieve employee data.