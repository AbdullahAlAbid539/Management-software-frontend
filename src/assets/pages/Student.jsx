import Side from '../../Components/Side'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { data, useNavigate } from 'react-router';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const Student = () => {
  let navigate = useNavigate()

  let handleDelete =(id) =>{
    console.log(id)
    axios.post("http://localhost:5000/deletestudentdata",{
      id:id
    }).then(()=>{
        axios.get("http://localhost:5000/studentlist").then((data)=>{
          setStudentlist(data.data)
        })
    })
  }

  const [show, setShow] = useState(false);
  const [studentname,setStudentname]= useState("");
  const [department,setDepartment]= useState("");
  const [studentid,setStudentid]= useState("");
  const [phonenumber,setPhonenumber]= useState("");
  const [result,setResult]= useState("");
  const [loading,setLoading]= useState(false);
  const [studentlist,setStudentlist] = useState([]);

  const handleClose = () =>{
    setLoading(true)
    axios.post("http://localhost:5000/studentdetail",{
      studentname: studentname,
      department: department,
      studentid: studentid,
      phonenumber: phonenumber,
      result: result
    }).then(()=>{
        axios.get("http://localhost:5000/studentlist").then((data)=>{
          setStudentlist(data.data)
          setLoading(false)
          setShow(false)
        })
    })
  };
  const handleCloseModal = () =>{
    setShow(false)
  };

  const handleShow = () => setShow(true);

  useEffect(()=>{
    let data = localStorage.getItem("UserInfo")

    if(!data){
      navigate("/")
    }

  },[])


  useEffect(()=>{
    axios.get("http://localhost:5000/studentlist").then((data)=>{
      setStudentlist(data.data)
    })
  },[])




  return (
    <>

      <div className='main_menu'>
        <div className='left'>
          <Side />
        </div>
        <div className='right'>
      <Button variant="primary" onClick={handleShow}>
        ADD New Student Details
      </Button>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>ADD New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>

      <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Student Name</Form.Label>
        <Form.Control onChange={(e)=>setStudentname(e.target.value)} type="text" placeholder="Enter Student Name" />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicDept">
        <Form.Label>Department Name</Form.Label>
        <Form.Control onChange={(e)=>setDepartment(e.target.value)} type="text" placeholder="Enter Department Name" />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicId">
        <Form.Label>Student ID</Form.Label>
        <Form.Control onChange={(e)=>setStudentid(e.target.value)} type="text" placeholder="Enter Student Id" />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control onChange={(e)=>setPhonenumber(e.target.value)} type="text" placeholder="Enter Student Phone Number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Result</Form.Label>
        <Form.Control onChange={(e)=>setResult(e.target.value)} type="text" placeholder="Enter Student Result" />
      </Form.Group>

    </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} variant="primary" onClick={handleClose}>
            {loading
              ?
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              :
              "Create Student"
            }
          </Button>
        </Modal.Footer>
      </Modal>


            {/* TABLE HTML THIS AREA HERE */}

      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Department Name</th>
          <th>Student ID</th>
          <th>Phone Number</th>
          <th>Result</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {studentlist.map((item,index)=>(
          <tr>
            <td>{index+1}</td>
            <td>{item.studentname}</td>
            <td>{item.department}</td>
            <td>{item.studentid}</td>
            <td>{item.phonenumber}</td>
            <td>{item.result}</td>
            <td><Button variant="primary" onClick={()=>handleEdit}><FaPencil />Edit</Button> <Button variant="danger" onClick={()=>handleDelete(item._id)}><RiDeleteBin5Line />Delete</Button></td>
          </tr>
        ))}

      </tbody>
    </Table>
        </div>
      </div>
    
    </>
  )
}

export default Student