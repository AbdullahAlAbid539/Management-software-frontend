import React, { useEffect } from 'react'
import Side from '../../Components/Side'
import { useNavigate } from 'react-router'

const Result = () => {

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
        <div className='right'>Result Of Student</div>
    </div>
    </>
  )
}

export default Result
