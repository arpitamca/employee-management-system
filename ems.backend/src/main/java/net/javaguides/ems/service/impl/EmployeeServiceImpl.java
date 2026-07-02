package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmployeeMapper;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);  //The method returns an Employee, so the variable type is Employee. // Incoming request: DTO → Entity
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee); //Outgoing response: Entity → DTO
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Employee not exists with given id : " + employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
        }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()//.stream() is like saying:Go through each element of the collection one by one
                .map(employee -> EmployeeMapper.mapToEmployeeDto(employee))  //EmployeeMapper.mapToEmployeeDto(employee); It can convert only one object at a time.
                .collect(Collectors.toList()); //collect(Collectors.toList()) is a terminal operation of the Stream API that gathers all processed stream elements into a List
        /*list.stream()  //stream syntax
    .map(...)
    .filter(...)
    .sorted(...)
    .collect(...);*/
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee not exists with given id:" + employeeId)
        );
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeObj = employeeRepository.save(employee); /*cannot return direct updatedEmployee because
        employeeRepository.save(employee) returns an Employee entity because JpaRepository<Employee, Long> is defined
        with Employee as the entity type*/

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
        /*During an update, we first retrieve the existing entity from the database, update its fields using the values
         from the DTO with setter methods, and then save the updated entity. This ensures that the existing record is
         modified instead of creating a new one */
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee not exists with given id:" + employeeId)
        );
        employeeRepository.deleteById(employeeId);
    }
}
