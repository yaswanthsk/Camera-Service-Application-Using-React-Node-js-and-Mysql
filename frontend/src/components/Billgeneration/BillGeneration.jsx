import React, { useEffect, useState, useRef } from 'react';
import { useParams,Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import './BillGeneration.css';

const BillGeneration = () => {
  const currentDate = new Date().toLocaleDateString();
  const [data, setData] = useState(null);
  const [serviceCenterData, setServiceCenterData] = useState(null);
  const [email, setEmail] = useState(null);
  const { BillId } = useParams();
  const pageRef = useRef();
  const navigate=useNavigate();
  useEffect(() => {
		const isAuthenticated = localStorage.getItem('authenticatedUser');
		if (isAuthenticated !== 'true') {
		  navigate('/login');
		}
	  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const billResponse = await axios.get(`http://localhost:8081/BillGeneration/${BillId}`);
        setData(billResponse.data);
        const serviceCenterId = billResponse.data.serviceCenterId;
        const serviceCenterResponse = await axios.get(`http://localhost:8081/servicecenter/${serviceCenterId}`);
        setServiceCenterData(serviceCenterResponse.data.Result);

        const userResponse = await axios.get(`http://localhost:8081/user/${billResponse.data.UserId}`);
        setEmail(userResponse.data.email);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [BillId]);

  if (!data || !serviceCenterData || !email) {
    return <div>Loading...</div>;
  }

  const availableSlotsDate = new Date(data.availableSlots).toLocaleDateString();
  const availableSlotsTime = new Date(data.availableSlots).toLocaleTimeString();
  const dateOfPurchase = new Date(data.dateOfPurchase).toLocaleDateString();

  const calculateGst = (cost) => {
    const numericCost = parseFloat(cost);
    return numericCost * 0.04;
  };

  const calculateTotalCost = (cost) => {
    const numericCost = parseFloat(cost);
    const gst = calculateGst(cost);
    return numericCost + gst;
  };

  const handleDownload = async () => {
    const options = {
      margin: 0.5,
      filename: 'bill.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    // Create a clone of the container element without the download button
    const containerClone = pageRef.current.cloneNode(true);
    const downloadButton = containerClone.querySelector('.download-btn');
    if (downloadButton) {
      downloadButton.remove();
    }
    const navitem = containerClone.querySelector('.nav-item');
    if(navitem){
      navitem.remove();
    }

    // Dynamically load html2pdf.js library
    const html2pdfInstance = html2pdf();
    html2pdfInstance.set(options).from(containerClone).save();
    navigate('/review');
  };

  return (
    <div ref={pageRef} className="container">
      <li className="nav-item">
                <Link to="/homepage" className="nav-link" id="homeButton" aria-current="page" style={{ color: "black" }}>Go Back To Home</Link>
              </li>
      <div className="heading">
        <h1>Kraft Cam</h1>
      </div>
      <div className="current-date">
      <p><strong>Date:</strong>{currentDate}</p>
      </div>
      <div className="customer-details">
        <h3>Customer Details</h3>
        <p><strong>Bill ID:</strong> {BillId}</p>
        <p><strong>User ID:</strong> {data.UserId}</p>
        <p><strong>Contact Number:</strong> {data.contactNumber}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Date of Appointment</th>
            <th>Servicing Cost</th>
            <th>GST</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{availableSlotsDate} {availableSlotsTime}</td>
            <td>Rs.{serviceCenterData.serviceCenterCost}</td>
            <td>Rs.{calculateGst(serviceCenterData.serviceCenterCost)}</td>
            <td>Rs.{calculateTotalCost(serviceCenterData.serviceCenterCost)}</td>
          </tr>
        </tbody>
      </table>
      <div className="product-details">
        <h3>Product Details</h3>
        <p><strong>Model Name:</strong> {data.productName}</p>
        <p><strong>Model No:</strong> {data.productModelNo}</p>
        <p><strong>Date of Purchase:</strong> {dateOfPurchase}</p>
        <p><strong>Problem Description:</strong> {data.problemDescription}</p>
      </div>

      <div className="service-center-details">
        <h3>Service Center Details</h3>
        <div className="detail-item">
          <p><strong>Name:</strong></p>
          <p>{serviceCenterData.serviceCenterName}</p>
        </div>
        <div className="detail-item">
          <p><strong>Phone:</strong></p>
          <p>{serviceCenterData.serviceCenterPhone}</p>
        </div>
        <div className="detail-item">
          <p><strong>Address:</strong></p>
          <p>{serviceCenterData.serviceCenterAddress}</p>
        </div>
      </div>

      <div className="download-btn">
        <button onClick={handleDownload}>Download PDF</button>
      </div>
    </div>
  );
};

export default BillGeneration;
