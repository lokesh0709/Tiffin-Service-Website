import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';

import {
  MDBContainer,
  MDBCardBody,
  MDBInput
}
  from 'mdb-react-ui-kit';


export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  let [address, setAddress] = useState("");
  let navigate = useNavigate()

  const handleClick = async (e) => {

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

    });
    const json = await response.json()
    
    if (json.success) {
      //save the auth toke to local storage and redirect
      // localStorage.setItem('token', json.authToken)
      navigate("/login")

    }
    else {
      alert(json.errors)
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ backgroundImage: 'url(https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg?cs=srgb&dl=pexels-lukas-616401.jpg&fm=jpg)', backgroundSize: "cover" }}>
      <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
        <div className='mask gradient-custom-3'></div>

        <div style={{ backgroundColor: 'white' }} className='mt-5 mb-3'>
          <form className='m-5' style={{ width: '600px' }} onSubmit={handleSubmit}>
            <MDBCardBody className='px-5' >
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <label htmlFor="name" className="form-label">Name</label>
              <MDBInput wrapperClass='mb-4' size='lg' type='text' name="name" value={credentials.name} onChange={onChange} />

              <label htmlFor="email" className="form-label">Email Address</label>
              <MDBInput wrapperClass='mb-4' size='lg' type='email' name="email" value={credentials.email} onChange={onChange} />

              <label htmlFor="password" className="form-label">Password</label>
              <MDBInput wrapperClass='mb-4' size='lg' type='password' name="password" value={credentials.password} onChange={onChange} />

              <label htmlFor="geolocation" className="form-label">Address</label>
              <MDBInput wrapperClass='mb-4' size='lg' type='text' name="geolocation" value={credentials.geolocation} onChange={onChange} />
              {/* <div className='d-flex flex-row justify-content-center mb-4'></div> */}

              <button className="button-17 w-100" size='lg' type="submit">Register</button>
            </MDBCardBody>
          </form>
        </div>
      </MDBContainer>Name


    </div>
  )
}







