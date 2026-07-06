package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")  //It allows a frontend application, such as React running on a different origin or port, to access Spring Boot REST APIs. * Allow requests from all origins (all websites, domains, and ports).
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private EmployeeService employeeService;

    //Build Add Employee REST API
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) { /* ResponseEntity is a Spring class used to send an HTTP response back to the client.
    ResponseEntity<EmployeeDto>  This is the return type of the method. We send DTOs to the client, not Entities
    The angle brackets (< >) specify the generic type. A generic type is a placeholder for a data type. It allows a class, interface, or method to work with different types while providing type safety and code reusability*/
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    //Build Get Employee REST API
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId) { //Spring matches the path variable name (id) to the method parameter, and if they differ, you need to tell Spring which path variable to bind.
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId); //Service method return EmployeeDto
        return ResponseEntity.ok(employeeDto); //ok() → Sets the HTTP status to 200 OK //employeeDto → Becomes the response body.
    }

    //Build Get All Employees REST API
    @GetMapping
    public ResponseEntity <List<EmployeeDto>> getAllEmployees(){
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    //Build Update Employee REST API
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, @RequestBody EmployeeDto updatedEmployee){ //@RequestBody  Take the data sent in the HTTP request body and convert it into a Java object
       EmployeeDto
               employeeDto = employeeService.updateEmployee(employeeId, updatedEmployee);
       return ResponseEntity.ok(employeeDto);
    }

    //Build Delete Employee REST API
    @DeleteMapping("{id}")
     public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){ //string? Look at the return statement //@PathVariable is a Spring annotation used to read a value from the URL path and bind it to a method parameter.
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee deleted successfully!");
     }

    /* | HTTP Method        | Return Statement                                                  | HTTP Status        |
| ------------------ | ----------------------------------------------------------------- | ------------------ |
| **POST** (Create)  | `return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);` | **201 Created**    |
| **GET** (Read)     | `return ResponseEntity.ok(employeeDto);`                          | **200 OK**         |
| **GET** (Read All) | `return ResponseEntity.ok(employeeDtos);`                         | **200 OK**         |
| **PUT** (Update)   | `return ResponseEntity.ok(updatedEmployee);`                      | **200 OK**         |
| **DELETE**         | `return ResponseEntity.noContent().build();`                      | **204 No Content** |
    */
}
