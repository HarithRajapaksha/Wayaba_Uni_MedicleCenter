import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/LoginPage"
import DoctorGetInfo from "./Components/DoctorGetInfo"
import AdminSendStuData from "./Components/AdminSendStuData"
import SendMedicles from "./Components/SendMedicles"
import AddMedicine from "./Components/AddMedicine";
import AllMedicine from "./Components/ShowAllMedicineData"


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/> 
        <Route path="/AdminSend" element={<AdminSendStuData/>}/>
        <Route path="/SendMedicles" element={<SendMedicles/>}/>
        <Route path="/DoctorGetInfo" element={<DoctorGetInfo/>}/>
        <Route path="/AddMedicine/:id" element={<AddMedicine/>}/>
        <Route path="/show-medicine" element={<AllMedicine/>}/>
        <Route path="/add-mediclereport/:id" element={<SendMedicles/>}/>
      </Routes>
    </Router>

  );
}

export default App;
