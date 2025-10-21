// THIS IS ALL IMPORT SECTION REACT WEB JSX
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'
import { useNavigate} from 'react-router'



const Account = () => {
    let navigate=useNavigate()
    let [userName,setUserName]= useState("")
    let [email,setEmail]= useState("")
    let [password,setPassword]= useState("")
    let [date,setDate]= useState("")
    let [id,setId]= useState("")
    let [message,setMessage]=useState("")

    // THIS IS ERROR HANDELING VARIABLE

    let [userNameError,setUserNameError]= useState("")
    let [emailError,setEmailError]= useState("")
    let [passwordError,setPasswordError]= useState("")
    let [dateError,setDateError]= useState("")
    let [idError,setIdError]= useState("")

    // THIS IS Registration HANDELING VARIABLE

    let handleusername =(e)=>{
        setUserName(e.target.value)
        setUserNameError("")
    }
    let handleemail =(e)=>{
        setEmail(e.target.value)
        setEmailError("")
    }
    let handlepassword =(e)=>{
        setPassword(e.target.value)
        setPasswordError("")
    }
    let handledate =(e)=>{
        setDate(e.target.value)
        setDateError("")
    }
    let handleid =(e)=>{
        setId(e.target.value)
        setIdError("")
    }

    let handlesubmit =(e)=>{
        e.preventDefault()
        if(!userName){
            setUserNameError("Username is Required")
        }
        if(!email){
            setEmailError("Email is Required")
        }
        if(!password){
            setPasswordError("Password is Required")
        }
        if(!date){
            setDateError("Date Of Birth Required")
        }
        if(!id){
            setIdError("ID Number Required")
        }

        if(userName && email && password && date && id){
            axios.post("http://localhost:5000/account",{
                username:userName,
                email:email,
                password:password,
                date:date,
                id:id
            }).then((data)=>{
                if(typeof data.data=="string"){
                    setMessage(data.data)
                }else{
                    localStorage.setItem("UserInfo",JSON.stringify(data.data))
                    navigate("/")
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
      <div className='reg_ac'>

        <div className='ac_lo'><img src="public/pic/img.png" alt="logo" /></div>

        <div className='ac_h1'><h1><i>Create an Account here</i></h1></div>

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
        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>User Name</Form.Label>
            <Form.Control onChange={handleusername} type="text" placeholder="Enter User name" />
            <Form.Text className="text-muted">
            Your User Name Will show top in Your Profile.
            </Form.Text>
        </Form.Group>
        {
            userNameError &&
            <Alert key="danger" variant="danger">
                {
                    userNameError
                }
            </Alert>
        }

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
        <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control onChange={handledate} type="date" />
        </Form.Group>

        {
            dateError &&
            <Alert key="danger" variant="danger">
                {
                    dateError
                }
            </Alert>
        }
        <Form.Group className="mb-3" controlId="formBasicId">
            <Form.Label>ID No</Form.Label>
            <Form.Control onChange={handleid} type="number" placeholder="Enter Your ID Number" />
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
        </Form><br />

        <Alert key="warning" variant="warning">
          Already Have an Account? <a href="/">Login</a>
        </Alert>
    </Container>
    </div>
    </>
  )
}

export default Account
