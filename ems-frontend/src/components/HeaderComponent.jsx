import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-dark bg-dark'> //Bootstrap class, codes are taken from https://getbootstrap.com/docs/5.0/components/navbar/
                <a className="navbar-brand" href="http://www.javaguides.net">Employee Management System</a>  //you can give any href 
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent
