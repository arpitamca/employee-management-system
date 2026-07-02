package net.javaguides.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.annotation.processing.Generated;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//A DTO (Data Transfer Object) is a simple Java object used to transfer data between application layers or between the server and the client. It contains only the required data and helps avoid exposing the entity directly
public class EmployeeDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
}
