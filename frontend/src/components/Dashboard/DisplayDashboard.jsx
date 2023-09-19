import React, {useEffect,useState } from 'react';
import '../HomePage/HomePage.css';
import { Link, useNavigate, Outlet } from 'react-router-dom';

import axios from 'axios';

function HomePage() {
  const [data,setData]=useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate()
  useEffect(()=>{
    const isAuthenticated = localStorage.getItem('authenticatedUser');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
      axios.get('http://localhost:8081/getdetails')
      .then(res=>{
        if(res.data.Status==="Success"){
          console.log(res.data.Result)
          setData(res.data.Result);
        }else(
          alert("Error")
        )
      })
      .catch(err=>console.log(err));
  },[])

  const handleSearch = (event) => {
    event.preventDefault();
    // Filter the data based on the search query
    const filteredData = data.filter(item =>
      item.serviceCenterAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredData);
  };

  const handleClick = (id) => {
    navigate(`/dashboard/${id}`);
  };

  const handleChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === '') {
      // If search query is empty, display all images with out clicking the button
      axios.get('http://localhost:8081/getdetails')
        .then(res => {
          if (res.data.Status === "Success") {
            setData(res.data.Result);
          } else {
            alert("Error");
          }
        })
        .catch(err => console.log(err));
    } else {
      // Filter the data based on the search query
      const filteredData = data.filter(item =>
        item.serviceCenterAddress.toLowerCase().includes(query)
      );
      setData(filteredData);
    }
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
                <Link to="/homepage" className="nav-link" id="homeButton" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/Dashboard" className="nav-link" id="dashBoardButton">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/mybooking" className="nav-link" id="myBookingButton">My Booking</Link>
              </li>
            </ul>
            <a className="logout" id="logout"  onClick={HandleLogout}>Logout</a>
          </div>
        </div>
        <Outlet />
      </nav>
      <div>
        <form className="d-flex center-form" onSubmit={handleSearch}>
          <input className="form-control me-2" type="search" placeholder="Type here to Search" aria-label="Search" 
          value={searchQuery} onChange={handleChange} />
          <button className="btn btn-success w-10" id="searchButton" type="submit">Search</button>
        </form>
      </div>
    <div className="grid-container">
    {data.map(item => (
    <Link to={`/dashboard/${item.serviceCenterID}`} key={item.id} className='linkStyle'>
    <div className="grid-item" key={item.serviceCenterID} onClick={() => handleClick(item)}>
    <div className="image-container">
        <img className='image' src={item.serviceCenterImageUrl} alt={item.serviceCenterName}/>
        <div className="image-details">
          <h2>{item.serviceCenterName}</h2>
          <p>Place: {item.serviceCenterAddress}</p>
          <p>Timings: 9:00AM - 5:00PM</p>
        </div>
        </div>
        </div>
        </Link>
      ))}
    </div>
    </div>
  );
}

export default HomePage;
