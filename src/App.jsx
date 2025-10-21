
import { Routes , Route } from "react-router";
import Student from "./assets/pages/Student";
import Teacher from "./assets/pages/Teacher";
import Login from "./assets/pages/Login";
import Account from "./assets/pages/Account";
import Attendance from "./assets/pages/Attendance";
import Result from "./assets/pages/Result";
import Pdf from "./assets/pages/Pdf";
import Leave from "./assets/pages/Leave";
import Home from "./assets/pages/Home";
function App() {

  return (
    <>
    <Routes>
      <Route path="/student" element={<Student />}/>
      <Route path="/teacher" element={<Teacher />}/>
      <Route path="/" element={<Login />}/>
      <Route path="/account" element={<Account />}/>
      <Route path="/attendance" element={<Attendance />}/>
      <Route path="/result" element={<Result />}/>
      <Route path="/pdf" element={<Pdf />}/>
      <Route path="/leave" element={<Leave />}/>
      <Route path="/home" element={<Home />}/>


    </Routes>
    </>
  )
}

export default App
