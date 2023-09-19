import './Addcenter.css'
import React from 'react';
import axios from 'axios';
import {useEffect,useState } from 'react';
import {useNavigate,useParams } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa';

function Centeredit(){
    useEffect(() => {
		const isAuthenticated = localStorage.getItem('authenticatedAdmin');
		if (isAuthenticated !== 'true') {
		  navigate('/login');
		}
	  }, []);
    const [data,setData]=useState([])
    const [values,setValues]=useState({
        editName: '',
		editNumber: '',
		editAddress: '',
		editImageUrl: '',
		editEmail: '',
        editServiceCost: '',
		editCentreDescription: ''
    })
    const {id} = useParams();

    const handleInput = (event)=> {
        setValues(prev => ({...prev,[event.target.name]: [event.target.value] }))
    }
    const navigate = useNavigate()

    useEffect(()=> {
		axios.get('http://localhost:8081/servicecenter/:id'+id)
		.then(res => {
			setValues({...values, editName: res.data.Result[0].editName,
				editNumber: res.data.Result[0].editNumber,
				editAddress: res.data.Result[0].editAddress,
				editImageUrl: res.data.Result[0].editImageUrl,
                editEmail: res.data.Result[0].editEmail,
                editServiceCost: res.data.Result[0].editServiceCost,
                editCentreDescription: res.data.Result[0].editCentreDescription
			})
		})
		.catch(err =>console.log(err));
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('http://localhost:8081/update/'+id, values)
		.then(res => {
			if(res.data.Status === "Success") {
				navigate('/centerprofile')
			}
		})
		.catch(err => console.log(err));
	}
//for fetching data to display
    useEffect(()=>{
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


 //for delete    
    const handleDelete=(id)=>{
        axios.delete('http://localhost:8081/delete/'+id)
        .then(res=>{
            if(res.data.Status==="Success"){
              window.location.reload(true);
            }else(
              alert("Error")
            )
          })
          .catch(err=>console.log(err));
    }

    function HandleLogout(){
        navigate('/login');
        localStorage.removeItem('authenticatedUser');
        localStorage.removeItem('authenticatedAdmin');
      }
    return(
        <div className='body'><div><br/></div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
         <div className="container-fluid">
             <a className="navbar-brand">Kraft Cam</a>
                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
                     <ul className="navbar-nav mx-auto">
                         <li className="nav-item">
                             <Link to="/addServiceCenter" className="nav-link" id='adminAddCenter' aria-current="page">Add Center</Link>
                         </li>
                         <li className="nav-item">
                             <Link to="/centerprofile" className="nav-link active" id='adminCenterProfile'>Center Profile</Link>
                         </li>
                     </ul>
                     <a className="logout" id='logout' onClick={HandleLogout}>Logout</a>  
                 </div>                
         </div>
         <Outlet />
         </nav>
        <div className="container-fluid" >
        <div className="row">
        <div className='col-4 vh-auto addpage'>
        {data.map(item => (
            <div class="card" id='adminProfileView' key={item.serviceCenterID}>
                <div className="cards-container" id='adminProfileView'>
                    <h4><b>{item.serviceCenterName}</b></h4>
                    <div class='row'>
                    <div class='col-9'>
                            <p>Address: {item.serviceCenterAddress}</p>
                        </div>
                        <div class='col-3'>
                            <button onClick={e=>handleDelete(item.serviceCenterID)} id='deleteCenter'> <FaTrash /></button>
                        </div>
                        <div class='col-9'>
                        <p>Mail Id:  {item.serviceCentermailId}</p>
                        </div>
                        <div class='col-3'>
                            <Link to={'/centeredit/'+item.serviceCenterID} id='editCenter'> <FaEdit /></Link>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
            <div className='col-8  updateform'>
                <form className='formcss' onSubmit={handleSubmit}>
                <div className='heading'>
                <h2>Edit Center</h2>
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <input type="text" className="form-control" id="editName" name="editName" placeholder='Enter the Name' autoComplete='off' onChange={handleInput} value={data.editName}/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <input type="text" className="form-control" id="editNumber" name='editNumber' placeholder='Enter the Phone number' autoComplete='off' onChange={handleInput} value={data.editNumber}/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <input type="text" className="form-control" id="editAddress" name='editAddress' placeholder='Enter the address' onChange={handleInput} value={data.editAddress}/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <input type="url" className="form-control" id="editImageUrl" name='editImageUrl' placeholder="Enter the Image Url" autoComplete='off' onChange={handleInput} value={data.editImageUrl}/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <input type="email" className="form-control" id="editEmail" name='editEmail' placeholder="Enter the mail id" autoComplete='off' onChange={handleInput} value={data.editEmail}/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <input type="text" className="form-control" id="editServiceCost" name='editServiceCost' placeholder="Enter the Service Amount" autoComplete='off' onChange={handleInput} value={data.editServiceCost}/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <textarea className="form-control" id="editCentreDescription" name='editCentreDescription' rows="3" placeholder="Description about Service center" autoComplete="off" onChange={handleInput} value={data.editCentreDescription}></textarea>
                    </div>
                    <div className="mb-3">
                        <button type="submit" id='updateButton' className="btn btn-primary">update</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
     )
}
export default Centeredit