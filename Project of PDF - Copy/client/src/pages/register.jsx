import React ,{useState}from 'react'
import "./css/login.css"

import Navbar from '../components/navbar';
import Card from 'react-bootstrap/Card';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const register = () => {

    const Navigate = useNavigate()
    const [Data, setData] = useState({
        name: '',
        email: '',
        pass: '',
        
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:7000/auth/Register', Data)
            .then((response) => {
                console.log('Registration successful:', response.data);
                alert("Success");
                Navigate("/login")
            })
            .catch((error) => {
                console.error('Registration failed:', error);
                alert("Something Went Wrong");
            });

        
    };
    return (
        <div>
            <div>
               <Navbar/> 
                <div >
                    <Card className='card-setting'>
                        <Card.Body>
                           
                            <Card.Title className='signuphead'>Sign Up</Card.Title>
                            <Card.Text>
                                <div className='wrapper  d-flex align-item-center justify-content-center'>
                                    <div className='align'>

                                        <form className='needs-validation' method='post' onSubmit={handleSubmit}>
                                        <div className='form-group was validated '>
                                                <label className='name' style={{color:"#fff"}}>Name</label>
                                                <input
                                                    name='name'
                                                    type="text"
                                                    className='form-control'
                                                    value={Data.name}
                                                    onChange={handleInputChange}
                                                    required />

                                            </div>
                                            <div className='form-group was validated '>
                                                <label className='name' style={{color:"#fff"}}>Email</label>
                                                <input
                                                    name='email'
                                                    type="email"
                                                    className='form-control'
                                                    value={Data.email}
                                                    onChange={handleInputChange}
                                                    required />

                                            </div>
                                            <div className='form-group was validated '>
                                                <label className='name' style={{color:"#fff"}}>Password</label>
                                                <input
                                                    name='pass'
                                                    type="password"
                                                    className='form-control'
                                                    value={Data.pass}
                                                    onChange={handleInputChange}
                                                    required />

                                            </div>
                                            <br />
                                            <button type='submit' className='btn12'>SIGN IN</button>
                                        </form>
                                    </div>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default register



