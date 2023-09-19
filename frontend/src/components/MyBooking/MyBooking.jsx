import React, { useEffect, useState } from "react";
import { Link, Outlet ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './MyBooking.css';
import { FaEdit, FaTrash ,FaFileInvoice} from 'react-icons/fa';

function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
		const isAuthenticated = localStorage.getItem('authenticatedUser');
		if (isAuthenticated !== 'true') {
		  navigate('/login');
		}
	  }, []);
  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8081/bookings');
      console.log(response);
      const { bookings } = response.data;
      setBookings(bookings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  function formatTime(time) {
    if (!time) return ""; // Handle empty or undefined time
    const parts = time.split(':');
    const hour = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    let formattedTime = '';
    if (!isNaN(hour) && !isNaN(minutes)) {
      const period = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const formattedMinutes = minutes.toString().padStart(2, '0');
      formattedTime = `${formattedHour}:${formattedMinutes} ${period}`;
    }
    return formattedTime;
  }

  const deleteBooking = async (bookingId) => {
    console.log(bookingId);
    try {
      await axios.delete(`http://localhost:8081/bookings/${bookingId}`);
      // After successful deletion, fetch the updated bookings list
      fetchBookings();
    } catch (error) {
      console.log(error);
      console.error('Error deleting booking:', error);
    }
  };

  const NoBookingsMessage = () => {
    return <div>No bookings available</div>;
  };
  function HandleLogout(){
    navigate('/login');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
    localStorage.removeItem('loggedInUserId');
  }
  return (
    <div className="body">
      <br/>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
        <div className="container-fluid">
          <a className="navbar-brand">Kraft Cam</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/homepage" className="nav-link " id="homeButton" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/Dashboard" className="nav-link" id="dashBoardButton">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/mybooking" className="nav-link active" id="myBookingButton">My Booking</Link>
              </li>
            </ul>
            <a className="logout" id="logout" onClick={HandleLogout}>Logout</a>
          </div>
        </div>
        <Outlet />
      </nav>
      <div className="my-booking-container">
        {bookings.length === 0 ? (
          <NoBookingsMessage />
        ) : (
          <table className="table" id="myBookingBody">
            <thead>
              <tr>
                <th>Name</th>
                <th>Bill Id</th>
                <th>Date</th>
                <th>Timing</th>
              </tr>
            </thead>
            <tbody>
            {bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}. {booking.serviceCenterName}</td>
                  <td>{booking.id}</td>
                  <td>{formatDate(booking.date)}</td>
                  <td>{formatTime(booking.time)}</td>
                  <td>
                  <div className="icon-container">
                      <button id='editBooking' ><Link to={'/editbooking/'+booking.id}><FaEdit /></Link></button>
                      <button id='deleteBooking' onClick={() => deleteBooking(booking.id)}><FaTrash /> </button>
                      <button id='GenerateBill'><Link to={`/BillGeneration/${booking.id}`}><FaFileInvoice /> </Link></button>
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyBooking;