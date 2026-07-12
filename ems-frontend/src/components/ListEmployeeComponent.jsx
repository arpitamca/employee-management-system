//JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code inside JavaScript.
//Bootstrap provides ready-made CSS classes and UI components, so you don't have to write all the CSS yourself.
import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

   const [employees, setEmployees] = useState([]) //useState is a React Hook used to store and update data (state) in a functional component
   
   const navigate = useNavigate(); //move from one page (route) to another

   useEffect(() => { /*When a dependency array([firstName]) is provided to useEffect, React runs the effect after 
    the initial render and then runs it again only if one or more of the specified dependencies change*/
      getAllEmployees ()
   }, [])
   /* "useEffect runs once when the component loads because of the empty dependency array ([]). Inside it, listEmployees() sends a 
   GET request to the Spring Boot backend using Axios. When the request succeeds, the .then() block receives the response, and 
   response.data contains the list of employees. setEmployees(response.data) updates the state, causing React to re-render the component
   and display the employee data. If the request fails, the .catch() block logs the error."*/
   function getAllEmployees(){
      listEmployees().then((response) => { //response contains what Spring Boot returned
            setEmployees(response.data);
            console.log(response.data);
       }).catch(error => {
            console.error(error);
       })
   }
   function addNewEmployee(){
        navigate('/add-employee') //React Router changes the page without refreshing the browser
   }
   function updateEmployee(id){
        navigate(`/edit-employee/${id}`)
   }
   function removeEmployee(id){
        console.log(id);

        deleteEmployee(id).then((response) => {
          getAllEmployees()
        }).catch(error => {   //once user click on the delete corresponding employee will be deleted and then user have to navigate to the listemployee page
            console.error(error);
        })
   }

  return (
    <div className='container'>
      <h2 className='text-center'>List of Employees</h2>
      <button className='btn btn-primary mb-2'onClick={addNewEmployee}>Add Employee</button> {/*bootstrap css class //mb-2 applies a bottom margin of size 2 to an element, creating vertical spacing below it*/}
      <table className='table-striped table-bordered'>
        <thead>
            <tr>
                <th>Employee Id</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email</th>
                <th>Actions</th>
            </tr>
        </thead>  
        <tbody>
           {
                employees.map(employee =>
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                          <button className='btn btn-info'onClick={() => updateEmployee(employee.id)}>Update</button>
                          <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                              style={{margin: '10px'}}
                          >Delete</button>
                        </td>
                    </tr>
                )
           } 
        </tbody>  
      </table>
    </div>
  )
}

export default ListEmployeeComponent

