package net.javaguides.ems.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)    //Step 1: Create the custom exception class
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message){
        super(message);
    }
}
/* if employee with given id not exist in database then we will throw this ResourceNotFoundException and SpringBoot will
catch this exception, it will get the error message from the Exception, and it will send the error message along with
the HttpStatus to the Client
 */