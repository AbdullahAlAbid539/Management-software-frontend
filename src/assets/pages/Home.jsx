import React, { useEffect } from 'react'
import Side from '../../Components/Side'
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';

const Home = () => {

  let navigate = useNavigate()


  useEffect(()=>{
    let data = localStorage.getItem("UserInfo")

    if(!data){
      navigate("/")
    }
  },[])
  return (
    <>

    <div className='main_menu'>
      <div className='left'>
        <Side />
        </div>
      <div className='right'>
        <div className='right_main'>
            <div className='right_one'>        
              <ListGroup>
                <ListGroup.Item>
                  <a href="#">Latest Notice</a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <a href="#">Department and Technology</a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <a href="#">Service</a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <a href="#">News</a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <a href="#">Contact us</a>
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className='right_two'>
              <h1>Professor</h1>
              <img src="public/pic/bpi prof.jpg" alt="image" />
              <p>Engr. Md. Rakib Ullah</p>
            </div>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default Home
