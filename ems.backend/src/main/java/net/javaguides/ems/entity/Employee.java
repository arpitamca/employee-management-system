package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor //a no-argument constructor (a constructor with no parameters)
//@AllArgsConstructor //a parameterised constructor (a constructor with parameters)
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //This JPA annotation is used to tell the database to automatically generate the primary key value for an entity
    private Long id; //Long is commonly used because it supports larger values and can be null before the entity is persisted(Saved permanently in the database)

    @Column(name = "first_name") //if you dont specify this annotation then by default JPA will give the column name as field name
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email_id", nullable = false, unique = true)
    private String email;

    public Employee(Long id, String firstName, String LastName, String email){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
