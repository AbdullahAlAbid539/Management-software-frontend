import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { IoPersonCircleSharp } from "react-icons/io5";

const Side = () => {
  let navigate = useNavigate()

  let handlelogout = () =>{
    localStorage.removeItem("UserInfo")
    navigate("/")
  }

  return (
    <div className='side'>

        <div className='logo_si'><img src="public/pic/img.png" alt="logo" /></div>
        <h2>Wellcome</h2>
        <h1><IoPersonCircleSharp />{JSON.parse(localStorage.getItem("UserInfo")).username}</h1>

    <ListGroup>
      <ListGroup.Item>
        <a href="/home">Home</a>
      </ListGroup.Item>
      <ListGroup.Item>
        <a href="/teacher">Teacher</a>
      </ListGroup.Item>
      <ListGroup.Item>
        <a href="/student">Student</a>
      </ListGroup.Item>
      <ListGroup.Item>
        <a href="/attendance">Attendance</a>
      </ListGroup.Item>
      <ListGroup.Item>
        <a href="/result">Result</a>
      </ListGroup.Item>
      <ListGroup.Item>
        <a href="/leave">Leave</a>
      </ListGroup.Item>
      <ListGroup.Item>
        <a href="/pdf">PDF Of Book</a>
      </ListGroup.Item>
    </ListGroup>

    <Button variant="danger" onClick={handlelogout}>Logout</Button>


      
    </div>
  )
}

export default Side
