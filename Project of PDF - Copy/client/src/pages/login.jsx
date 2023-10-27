import React,{useState} from 'react'
import "./css/login.css"
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar';
import Card from 'react-bootstrap/Card';
import { Person } from 'react-bootstrap-icons';
import axios from 'axios';

const login = () => {
    // let user = JSON.parse(localStorage.getItem('userId'))
    const [Data, setData] = useState({
        email: '',
        pass: '',
        
    });
    const Navigate  = useNavigate()


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:7000/auth/Login", Data);
            if (response.status === 200 ) {
                
              const accessToken = response.data.accessToken;
              const refreshToken = response.data.refreshToken;
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken',refreshToken)
              localStorage.setItem("userId",response.data.id)
              Navigate("/")
            
            } 
          } catch (error) {
            console.error("Error occurred:", error);
           
          }
      };
    return (
        <div>
            <div>
               <Navbar/> 
                <div >
                    <Card className='card-setting'>
                        <Card.Body>
                           
                            <Card.Title className='signuphead'>Sign In</Card.Title>
                            <Card.Text>
                                <div className='wrapper  d-flex align-item-center justify-content-center'>
                                    <div className='align'>

                                        <form className='needs-validation' method='post' onSubmit={handleSubmit}>
                                            <div className='form-group was validated '>
                                                <label className='name' style={{color:"#fff"}}>Email</label>
                                                <input
                                                    name='email'
                                                    type="text"
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

export default login



