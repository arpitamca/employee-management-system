import React, { useEffect, useState } from 'react'

import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import {useNavigate, useParams} from 'react-router-dom';

const EmployeeComponent = () => {
 
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    /*Each input field has its own state so React can keep track of its current value. firstName, lastName, and email 
    are separate pieces of state because each form field can change independently. When the user types into an input,
    the corresponding setter function updates that field's state, and React re-renders the component to display the latest value. */
    //Render = React displays or updates what you see in the browser.
    const {id}= useParams(); //access dynamic parameters from the current URL.

    useEffect(() => {
        console.log("Page got loaded");
     })

    const [errors, setErrors] = useState({ //errors is a state variable that stores validation error messages.
        //The setErrors function updates these messages, and React re-renders the component to show or hide validation errors in the UI.
        firstName:'',
        lastName:'',
        email:''
    })

    const navigator = useNavigate();

    useEffect(() =>{
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName); // const [firstName, setFirstName] = useState('') values are saved in the firstname state variable 
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error =>{
                console.error(error);
            })
        }
    }, [id])

    function handleFirstName(e){
        setFirstName(e.target.value); 
    }/*handleFirstName is an event(An event is an action performed by the user or the browser. Eg,Clicking a button, Typing in an input, 
    Moving the mouse, Pressing a key, Submitting a form) handler function. It receives the event object (e) when the user types in the 
    input field. e.target refers to the input element, and e.target.value gives the current text entered by the user. setFirstName updates 
    the React state with that value, causing the component to re-render and display the updated text in the input field.*/

    function handleLastName(e){
        setLastName(e.target.value);
    }

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function saveOrUpdateEmployee(e){
        e.preventDefault();/*Normally, when you submit an HTML form, the browser sends the form data, reloads the page.
        React applications are Single Page Applications (SPA). We don't want the page to reload because it would reset the component state.
        e.preventDefault(); means Stop the browser's default form submission behavior.*/

        if(validateForm()){
            const employee = {firstName, lastName, email} 
            /*const employee = {
                firstName: "Arpit",
                lastName: "Sharma",
                email: "arpit@gmail.com"
            };  This is called object property shorthand.*/
             console.log(employee) 
            if(id){ //id is present in the URL
                updateEmployee(id, employee).then((response) => { //sends http request
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            }else{
                createEmployee(employee).then((response)=>{ /*axios.post() is an asynchronous operation. It returns a Promise immediately instead 
                of waiting for the server. The .then() method is used to execute code after the Promise is successfully resolved and the server sends a response*/
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error =>{
                    console.error(error);
                })
            }
        }

    }

    function validateForm(){
        let valid = true; //At the beginning, React assumes everything is valid.

        const errorsCopy = {...errors } //{ ...errors } javaScript spread operator creates a copy of the errors object. React state should be treated as immutable, 
        // so we copy the object, update the copy, and then set the new state.

        if(firstName.trim()){ //.trim() removes spaces at the beginning and end so that if user enters "  " it becomes false
            errorsCopy.firstName = '';
        }else{
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        }else{
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        }else{
            errorsCopy.email = 'Email is required';
            valid = false; 
        }

        setErrors(errorsCopy); //updates the React state.

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-centre'>Update Employee</h2>
        }else{
            return <h2 className='text-centre'>Add Employee</h2>
        }
    }

    return ( /*Why do we create the form inside return?
     Because the return statement defines what React should display on the screen (the UI)*/   
    <div className='container'> {/*container is a Bootstrap class that keeps your content centered and adds left and right spacing (margins)*/}
        <br/><br/>
         <div className='row'> {/*A row is used to arrange content horizontally using Bootstrap's grid system*/}
            <div className='card col-md-6 offset-md-3 offset-md-3'> {/*A card is a Bootstrap component that displays content inside a box with: Border, Padding, Rounded corners, Shadow*/}
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={firstName} /*value={firstName} binds the input field to the firstName state, so the input always 
                                displays the current state value. However, it does not update the state.*/
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} //Bootstrap CSS class //If errors.firstName contains an error message
                                onChange={handleFirstName} /* onChange handler is responsible for updating the state whenever the user types.
                                After the state changes, React re-renders(Render means React displays a component on the screen.) the component, 
                                and because the input's value is bound to the state, the displayed text updates automatically */
                            >    
                            </input> 
                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}   {/*display validation error message  invalid-feedback: 🔴 Red text If errors.firstName contains 
                            an error message (a truthy value), React renders the <div> with the Bootstrap invalid-feedback class and displays the error message. If errors.firstName 
                            is an empty string (a falsy value), React renders nothing*/}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Last Name'
                                name='lastName'
                                value={lastName} 
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                onChange={handleLastName} //or directly onChange{(e) => setLastName(e.target.value)}
                            >    
                            </input>  
                            {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}  
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Email'
                                name='email'
                                value={email} 
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                onChange={handleEmail}
                            >    
                            </input>   
                            {errors.email && <div className='invalid-feedback'> {errors.email} </div>} 
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div> 
    
      
    </div>
  )
}

export default EmployeeComponent
