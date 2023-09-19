import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import MyBooking from "./components/MyBooking/MyBooking";
import Signup from "./components/Signup/Signup";
import Addcenter from "./components/Addcenter/Addcenter";
import DisplayDashboard from "./components/Dashboard/DisplayDashboard";
import AddServiceCenter from "./components/Addcenter/AddServiceCenter"
import Centerprofile from "./components/Addcenter/Centerprofile";
import Centeredit from "./components/Addcenter/Centeredit";
import EditBooking from "./components/MyBooking/EditBooking";
import BillGeneration from "./components/Billgeneration/BillGeneration";
import Review from './components/Review/Review'
import Thankyou from './components/Review/thankyou'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from "./components/HomePage/HomePage";
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AddServiceCenter />} />
        <Route path="/addServiceCenter" element={<AddServiceCenter />} />
        <Route path="/centerprofile" element={<Centerprofile />} />
        <Route path="/centeredit/:id" element={ <Centeredit />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/dashboard" element={<DisplayDashboard />} />
        <Route path='/dashboard/:id' element={<Dashboard />}></Route>
        <Route path='/editbooking/:id' element={<EditBooking />}></Route>
        <Route path="/mybooking" element={<MyBooking />} />
        <Route path="/Billgeneration/:BillId" element={<BillGeneration />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/review' element={<Review />}/>
        <Route path='/thankyou' element={<Thankyou/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


