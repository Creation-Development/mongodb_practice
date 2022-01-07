import React from 'react'

const HomePage = () => {
    return (
        <div className='container text-center my-4'>
            <h1 className="text-success my-4">Wemelcome to Home page</h1>
            <button className="btn btn-danger my-4"onClick={(e)=>{window.location="/add-user"}}>Registration Form</button>
        </div>
    )
}

export default HomePage
