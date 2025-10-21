import React, { useEffect } from 'react'
import Side from '../../Components/Side'
import { useNavigate } from 'react-router'

const Leave = () => {

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
        <div className='right'>The List of Leave</div>
    </div>
    </>
  )
}

export default Leave
