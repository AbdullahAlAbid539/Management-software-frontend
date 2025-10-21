import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { use, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import {useNavigate} from 'react-router'
import { useEffect } from 'react';

const Login = () => {
    let navigate=useNavigate()

    let [email,setEmail]= useState("")
    let [password,setPassword]= useState("")

    let [emailError,setEmailError]= useState("")
    let [passwordError,setPasswordError]= useState("")

    let [id,setId]=useState("")
    let [idError,setIdError]=useState("")

    let [message,setMessage]=useState("")

    // THIS IS Registration HANDELING VARIABLE

    let handleemail =(e)=>{
        setEmail(e.target.value)
        setEmailError("")
    }
    let handlepassword =(e)=>{
        setPassword(e.target.value)
        setPasswordError("")
    }
    let handleid =(e)=>{
        setId(e.target.value)
        setIdError("")
    }

    let handlesubmit =(e)=>{
        e.preventDefault()
        if(!email){
          setEmailError("Email is Required")
        }
        if(!password){
          setPasswordError("Password is Required")
        }
        if(!id){
            setIdError("Your ID Number Required")
        }
        if(email && password && id){
            axios.post("http://localhost:5000/login",{
                email:email,
                password:password,
                id:id
            }).then((data)=>{
                if(typeof data.data =="string"){
                    setMessage(data.data)
                }else{
                    localStorage.setItem("UserInfo",JSON.stringify(data.data))
                    navigate("/home")
                }
            })
        }
    }

    useEffect(()=>{
        let data = localStorage.getItem("UserInfo")

        if(data){
            navigate("/home")
        }
    },[])



  return (
    <>

    <div className='logo_lo'><img src="public/pic/img.png" alt="logo" /></div>
      <div className='reg_lo'>

        <div className='re_h1'><h1><b>Login Page</b></h1></div>


        <Container>
            
            {
                message &&
                <Alert key="danger" variant="danger">
                {
                    message
                }
            </Alert>

            }

        <Form>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleemail} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            Your E-mail will remain Private.
            </Form.Text>
        </Form.Group>

        {
            emailError &&
            <Alert key="danger" variant="danger">
                {
                    emailError
                }
            </Alert>
        }



        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handlepassword} type="password" placeholder="Password" />
        </Form.Group>

        {
            passwordError &&
            <Alert key="danger" variant="danger">
                {
                    passwordError
                }
            </Alert>
        }
        <Form.Group className="mb-3" controlId="formBasicId">
            <Form.Label>ID Number</Form.Label>
            <Form.Control onChange={handleid} type="number" placeholder="Enter Your ID" />
        </Form.Group>

        {
            idError &&
            <Alert key="danger" variant="danger">
                {
                    idError
                }
            </Alert>
        }


        <Button onClick={handlesubmit} variant="primary" type="submit">
            Submit
        </Button>
        </Form>

        <Alert key="warning" variant="warning">
          Don't Have an Account? <a href="/account">Create an Account</a>
        </Alert>
    </Container>
    </div>
    </>
  )
}

export default Login
