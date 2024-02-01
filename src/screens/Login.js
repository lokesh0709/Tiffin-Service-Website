import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
    MDBContainer,
    MDBCardBody,
    MDBInput
}
    from 'mdb-react-ui-kit';

export default function Login() {
    const [credentials, setcredentials] = useState({ email: "", password: "" });

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        //Q. What is a synthetic event :preventDefault
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);


        if (!json.success) {
            alert("Enter Valid Credentials");
        }

        else {
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate("/");
        }
    }


    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }


    return (
            <div style={{ backgroundImage: 'url(https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg?cs=srgb&dl=pexels-lukas-616401.jpg&fm=jpg)', backgroundSize: "cover" }}>
                <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
                    <div className='mask gradient-custom-3'></div>

                    <div style={{ backgroundColor: 'white' }} className='mt-5 mb-3'>
                        <form className='m-5' style={{ width: '600px' }} onSubmit={handleSubmit}>
                            <MDBCardBody className='px-5' >
                                <h2 className="text-uppercase text-center mb-5">Login</h2>

                                <label htmlFor="email" className="form-label">Email Address</label>
                                <MDBInput type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />


                                <label htmlFor="password" className="form-label">Password</label>
                                <MDBInput type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />

                                {/* <div className='d-flex flex-row justify-content-center mb-4'></div> */}
                                
                                <div>
                                <button className="button-17 w-50 mt-4" size='md' type="submit">Submit</button>
                                <Link to="../createuser" className='btnreg w-50'> Not a User?</Link>
</div>

                                

                            </MDBCardBody>
                        </form>
                    </div>
                </MDBContainer>

            </div>

    )
}
