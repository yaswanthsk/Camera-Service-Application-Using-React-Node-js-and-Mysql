import React from 'react';
import './Dashboard.css'
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';


function Dashboard() {
  const { id } = useParams(); // Get the service center ID from the URL
  const [data, setData] = useState(null);
  const [values, setValues] = useState({
    enterProductName: '',
    enterModelNo: '',
    enterDateOfPurchase: '',
    enterContactNumber: '',
    enterProblem: ''
  });
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookedSlots] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedUser');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Fetch the service center details from the backend
    axios
      .get(`http://localhost:8081/servicecenter/${id}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.Result);
        } else {
          alert('Error fetching service center details');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error fetching service center details');
      });

    generateSlots();
  }, [id]);

  const generateSlots = () => {
    const today = new Date();
    const generatedSlots = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      for (let j = 9; j <= 17; j++) {
        const slot = {
          id: `${formatDate(date)}-${formatTime(j)}`,
          slot: `${formatDate(date)} ${formatTime(j)}`
        };
        const isBooked = bookedSlots.some((bookedSlot) => bookedSlot.slot === slot.slot);
        if (!isBooked) {
          generatedSlots.push(slot);
        }
        else{
          generateSlots.pop(slot);
        }
      }
    }

    setSlots(generatedSlots);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };

  const formatTime = (hours) => {
    const minutes = '00';
    return ('0' + hours).slice(-2) + ':' + minutes;
  };

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the selected slot is already booked
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (bookedSlots.some((bookedSlot) => bookedSlot.slot === selectedSlot)) {
      setError('Slot already booked');
      return;
    }
    // Generate unique bill ID
    const billId = generateBillId();
    localStorage.setItem('BillId',billId);
    // Submit the form data to the backend
    axios
      .post('http://localhost:8081/dashboard', { ...values, selectedSlot, serviceCenterId: id, Id:billId ,UserId: loggedInUserId })
      .then((res) => {
        // Slot booked successfully
        navigate('/mybooking');
      })
      .catch((err) => {
        // Error handling
        if (err.response && err.response.status === 400) {
          setError('Slot already booked');
        } else {
          setError('Failed to book slot');
        }
      });
  };
  
  const generateBillId = () => {
    const characters = '0123456789';
    const length = 4; // Length of the bill ID
    let billId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      billId += characters.charAt(randomIndex);
    }
    return billId;
  };
  

  if (!data) {
    // Render loading state or placeholder
    return <div>Loading...</div>;
  }
  function HandleLogout(){
    navigate('/login');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
    localStorage.removeItem('loggedInUserId');
  }

  return (
    <div className="body vh-100">
      <br />
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
        <div className="container-fluid">
          <a className="navbar-brand">Kraft Cam</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/homepage" className="nav-link active" id="homeButton" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Dashboard" className="nav-link" id="dashBoardButton">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/mybooking" className="nav-link" id="myBookingButton">
                  My Booking
                </Link>
              </li>
            </ul>
            <Link to="/login" className="logout" id="logout" onClick={HandleLogout}>Logout</Link>
          </div>
        </div>
        <Outlet />
      </nav>
      <div className="dashboard-container">
        <div className="left-column col-3">
          <img src={data.serviceCenterImageUrl} className="service-image" alt={data.serviceCenterName} />
          <div className="rectangle-container">
            <div className="rectangle-title">
              <h2>{data.serviceCenterName} </h2>
            </div>
            <div className="rectangle-line"></div>
            <div className="rectangle-details">
              <p>Address: {data.serviceCenterAddress}</p>
              <p>Phone Number: {data.serviceCenterPhone}</p>
              <p>Email: {data.serviceCentermailId}</p>
              <p>Timing: 9:00 AM - 5:00 PM</p>
              <p>Rating: ★★★★☆</p>
            </div>
          </div>
        </div>
        <div className="right-column  col-9 bookinform">
          <form className="dashBoardBody" onSubmit={handleSubmit}>
            <h2>Enter the Details</h2>
            <div className="mb-3">
              <input type="text" id="enterProductName" placeholder="Enter the name of the product" name="enterProductName" className="form-control rounded-2" autoComplete="off"
                onChange={handleInput}/>
            </div>
            <div className="mb-3">
              <input type="text" id="enterModelNo" placeholder="Enter the model no of the product" name="enterModelNo" className="form-control rounded-2" autoComplete="off"
              onChange={handleInput}/>
            </div>
            <div className="mb-3">
              <input type="date" id="enterDateOfPurchase" placeholder="Enter the date of purchase"  name="enterDateOfPurchase" className="form-control rounded-2"  autoComplete="off" 
              onChange={handleInput}/>
            </div>
            <div className="mb-3">
              <input type="text" id="enterContactNumber" placeholder="Enter the contact number" name="enterContactNumber" className="form-control rounded-2" autoComplete="off"
              onChange={handleInput}/>
            </div>
            <div className="mb-3">
              <textarea id="enterProblem" placeholder="Enter the problem description" name="enterProblem" className="form-control rounded-2" rows="2" onChange={handleInput}></textarea>
            </div>
            <div className="mb-3">
              <select className="form-control" value={selectedSlot} onChange={handleSlotChange}>
                <option value="" disabled>
                  Available slots 
                </option>
                {slots.map((slot) => (
                  <option key={slot.id} value={slot.slot}>
                    {slot.slot}
                  </option>
                ))}
              </select>
            </div>
            {error && <div className="text-danger">{error}</div>}
            <button type="submit" className="btn btn-primary" id="bookButton">
              Book Slot
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;









