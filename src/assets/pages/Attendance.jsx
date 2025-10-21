import React, { useEffect } from 'react'
import Side from '../../Components/Side'
import { useNavigate } from 'react-router'

const Attendance = () => {


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
        <div className='right'>Attendance List</div>
    </div>
      
    </>
  )
}

export default Attendance
