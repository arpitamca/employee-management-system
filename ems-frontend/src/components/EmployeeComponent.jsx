import React, { useState } from 'react'

const EmployeeComponent = () => {
 
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    /*Each input field has its own state so React can keep track of its current value. firstName, lastName, and email 
    are separate pieces of state because each form field can change independently. When the user types into an input,
    the corresponding setter function updates that field's state, and React re-renders the component to display the latest value. */
    //Render = React displays or updates what you see in the browser.

    return ( /*Why do we create the form inside return?
     Because the return statement defines what React should display on the screen (the UI)*/   
    <div className='container'> //container is a Bootstrap class that keeps your content centered and adds left and right spacing (margins)
        <div className='row'> //A row is used to arrange content horizontally using Bootstrap's grid system
            <div className='card'> //A card is a Bootstrap component that displays content inside a box with: Border, Padding, Rounded corners, Shadow
                <h2 className='text-center'>Add Employee</h2>
            </div>
        </div>
      
    </div>
  )
}

export default EmployeeComponent
