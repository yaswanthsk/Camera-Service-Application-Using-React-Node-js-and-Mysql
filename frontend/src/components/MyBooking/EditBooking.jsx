import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import './EditBooking.css'

function EditBooking() {
  const [data, setData] = useState({});
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [error, setError] = useState('');

  const [values, setValues] = useState({
    editProductName: '',
    editModelNo: '',
    editDateOfPurchase: '',
    editContactNumber: '',
    enterProblem: '',
    selectedSlot: '',
  });

  const { id } = useParams();
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const navigate = useNavigate();

  useEffect(() => {
    generateSlots();
  }, [bookedSlots]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedUser');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    axios
      .get('http://localhost:8081/bookings/' + id)
      .then((res) => {
        // Set the booked slots
        const { selectedSlot, availableSlots } = res.data.Result[0];
        setSelectedSlot(selectedSlot);
        setBookedSlots(availableSlots);
  
        setValues({
          ...values,
          editProductName: res.data.Result[0].editProductName,
          editModelNo: res.data.Result[0].editModelNo,
          editDateOfPurchase: res.data.Result[0].editDateOfPurchase,
          editContactNumber: res.data.Result[0].editContactNumber,
          enterProblem: res.data.Result[0].enterProblem,
          selectedSlot,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  
  const generateSlots = () => {
    const today = new Date();
    const generatedSlots = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      for (let j = 9; j <= 17; j++) {
        const slot = formatDate(date) + ' ' + formatTime(j);
        if (!bookedSlots.includes(slot)) {
          generatedSlots.push(slot);
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

  const handleSlotChange = (event) => {
    const selectedSlot = event.target.value;
    setSelectedSlot(selectedSlot);
    setValues((prev) => ({ ...prev, selectedSlot }));
    setError('');
  
    if (bookedSlots.includes(selectedSlot)) {
      setError('Slot is already booked');
    }
  };

const handleSubmit = (event) => {
  event.preventDefault();

  const payload = { ...values, selectedSlot };

  // Check if the selected slot is already booked
  if (selectedSlot) {
    axios
      .get(`http://localhost:8081/checkSlotAvailability/${selectedSlot}/${id}`)
      .then((res) => {
        if (res.data.Status === 'Error') {
          setError('Slot is already booked. Please select another slot.');
        } else {
          // Slot is available or unchanged, proceed with the update
          updateBooking(payload);
        }
      })
      .catch((err) => console.log(err));
  } else {
    // Slot is not selected, proceed with the update
    updateBooking(payload);
  }
};

const updateBooking = (payload) => {
  axios
    .put(`http://localhost:8081/appointmentupdate/${id}`, payload)
    .then((res) => {
      if (res.data.Status === 'Success') {
        navigate('/mybooking');
      }
    })
    .catch((err) => console.log(err));
};
  
function HandleLogout(){
  navigate('/login');
  localStorage.removeItem('authenticatedUser');
  localStorage.removeItem('authenticatedAdmin');
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
                <Link to="/homepage" className="nav-link " id="homeButton" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Dashboard" className="nav-link" id="dashBoardButton">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/mybooking" className="nav-link active" id="myBookingButton">
                  My Booking
                </Link>
              </li>
            </ul>
            <a className="logout" id="logout" onClick={HandleLogout}></a>
          </div>
        </div>
        <Outlet />
      </nav>
      <div  className="d-flex justify-content-center align-items-center updatebookingform">
        <form className="updateBookingForm" onSubmit={handleSubmit}>
          <h3>Enter the Product Details</h3>
          <div className="mb-3 d-flex center">
            <input
              type="text"
              id="editProductName"
              placeholder="Enter the name of the product"
              name="editProductName"
              className="form-control rounded-2"
              autoComplete="off"
              value={values.editProductName}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3 d-flex">
            <input
              type="text"
              id="editModelNo"
              placeholder="Enter the model no of the product"
              name="editModelNo"
              className="form-control rounded-2"
              autoComplete="off"
              value={values.editModelNo}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3 d-flex">
            <input
              type="date"
              id="editDateOfPurchase"
              placeholder="Enter the date of purchase"
              name="editDateOfPurchase"
              className="form-control rounded-2"
              autoComplete="off"
              value={values.editDateOfPurchase}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3 d-flex">
            <input
              type="text"
              id="editContactNumber"
              placeholder="Enter the contact number"
              name="editContactNumber"
              className="form-control rounded-2"
              autoComplete="off"
              value={values.editContactNumber}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              id="enterProblem"
              placeholder="Enter the Problem of the product"
              name="enterProblem"
              className="form-control rounded-2"
              autoComplete="off"
              value={values.enterProblem}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3 d-flex">
            <select
              id="selectedSlot"
              name="selectedSlot"
              className="form-control rounded-2"
              value={selectedSlot}
              onChange={handleSlotChange}
            >
              <option value="" disabled>
                Select a slot
              </option>
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {error && <p className="error-message">{error}</p>}
          </div>
          <button type="submit" className="btn btn-primary" id="updateBooking">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBooking;
