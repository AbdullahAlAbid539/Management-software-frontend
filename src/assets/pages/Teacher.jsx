// THIS IS TEACHER JSX SECTION JSX
import Side from '../../Components/Side'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { data, useNavigate } from 'react-router';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import Spinner from 'react-bootstrap/Spinner';

const Teacher = () => {

  let navigate = useNavigate()

  let handleDelete = (id)=>{
    console.log(id)
    axios.post("http://localhost:5000/deleteteacherdata",{
      id:id
    }).then(()=>{
        axios.get("http://localhost:5000/teacherlist").then((data)=>{
            setData(data.data)
        })
    })
  }


  const [show, setShow] = useState(false);
  const [teachername,setTeachername] = useState("");
  const [teacherdepartment,setTeacherdepartment] = useState("");
  const [teacherid,setTeacherid] = useState("");
  const [teacherphonenumber,setTeacherphonenumber] = useState("");
  const [loading,setLoading] = useState(false);
  const [teacherlist,setTeacherlist] = useState([])
  let [update,setUpdate]=useState(false);

  const handleClose = () =>{
    setLoading(true)
    axios.post("http://localhost:5000/teacherdetail",{
      teachername: teachername,
      teacherdepartment: teacherdepartment,
      teacherid: teacherid,
      teacherphonenumber: teacherphonenumber
    }).then(()=>{
        axios.get("http://localhost:5000/teacherlist").then((data)=>{
          setTeacherlist(data.data)
          setLoading(false)
          setShow(false)
        })

    })
  };
  const handleCloseModalforUpdate = () =>{
    setUpdate(true)
    setLoading(true)
    axios.patch(`http://localhost:5000/teacher/${id}`,{
      teachername: teachername,
      teacherdepartment: teacherdepartment,
      teacherid: teacherid,
      teacherphonenumber: teacherphonenumber
    }).then(()=>{
        axios.get("http://localhost:5000/teacherlist").then((data)=>{
          setTeacherlist(data.data)
          setLoading(false)
          setShow(false)
        })

    })
  };

  const handleCloseModal = ()=>{
    setShow(false)
    setUpdate(false)
  };
  const handleShow = () => {
    setTeachername(""),
    setTeacherdepartment(""),
    setTeacherid(""),
    setTeacherphonenumber("")
    setShow(true)
  };
  const handleShowModal = (id) =>{
    setUpdate(true)
    axios.get(`http://localhost:5000/teacher/${id}`).then((data)=>{
      console.log(data.data[0])
      setTeachername(data.data[0].teachername),
      setTeacherdepartment(data.data[0].teacherdepartment),
      setTeacherid(data.data[0].teacherid),
      setTeacherphonenumber(data.data[0].teacherphonenumber)
    })
    setShow(true)
  };



  useEffect(()=>{
    let data = localStorage.getItem("UserInfo")

    if(!data){
      navigate("/")
    }
  },[])

  useEffect(()=>{
        axios.get("http://localhost:5000/teacherlist").then((data)=>{
          setTeacherlist(data.data)
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
        ADD New Teacher Details
      </Button>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>ADD New Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>

      <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Teacher Name</Form.Label>
        <Form.Control onChange={(e)=>setTeachername(e.target.value)} type="text" placeholder="Enter Teacher Name" value={teachername} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicDept">
        <Form.Label>Department Name</Form.Label>
        <Form.Control onChange={(e)=>setTeacherdepartment(e.target.value)} type="text" placeholder="Enter Department Name" value={teacherdepartment} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicId">
        <Form.Label>Teacher ID</Form.Label>
        <Form.Control onChange={(e)=>setTeacherid(e.target.value)} type="text" placeholder="Enter Teacher Id" value={teacherid} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control onChange={(e)=>setTeacherphonenumber(e.target.value)} type="text" placeholder="Enter Teacher Phone Number" value={teacherphonenumber} />
      </Form.Group>

    </Form>

        </Modal.Body>
        <Modal.Footer>


          {<Button disabled={loading} variant="primary" onClick={handleClose}>
            {loading
              ?
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              :
              "Create new Teacher"
            }
          </Button>}
          {<Button disabled={loading} variant="primary" onClick={handleShowModal}>
            {loading
              ?
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              :
              "Update Teacher"
            }
          </Button>}
        </Modal.Footer>
      </Modal>

      {/* TABLE HTML THIS AREA HERE */}

      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Teacher Name</th>
          <th>Department Name</th>
          <th>Teacher ID</th>
          <th>Phone Number</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

        {teacherlist.map((item,index)=>(        
        <tr>
          <td>{index+1}</td>
          <td>{item.teachername}</td>
          <td>{item.teacherdepartment}</td>
          <td>{item.teacherid}</td>
          <td>{item.teacherphonenumber}</td>
          <td><Button variant="primary" onClick={()=>handleCloseModalforUpdate(item._id)}><FaPencil />Edit</Button> <Button variant="danger" onClick={()=>handleDelete(item._id)}><RiDeleteBin5Line />Delete</Button></td>
        </tr>
        ))}
      </tbody>
    </Table>
        </div>
        
      </div>
    </>
  )
}

export default Teacher
