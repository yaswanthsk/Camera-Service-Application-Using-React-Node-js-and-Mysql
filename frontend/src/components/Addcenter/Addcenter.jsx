import React,{ useEffect} from 'react'
import './Addcenter.css'
import { Link, Outlet,useNavigate } from 'react-router-dom'

function Addcenter() {
        const navigate=useNavigate();
        useEffect(() => {
            const isAuthenticated = localStorage.getItem('authenticatedAdmin');
            if (isAuthenticated !== 'true') {
              navigate('/login');
            }
          }, []);
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
                                <Link to="/addServiceCenter" className="nav-link active" id='adminAddCenter' aria-current="page">Add Center</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/centerprofile" className="nav-link" id='adminCenterProfile'>Center Profile</Link>
                            </li>
                        </ul>
                        <a className="logout" id='logout' onClick={HandleLogout}>Logout</a>    
                    </div>                
            </div>
            <Outlet />
            </nav>
        <div>
            
        </div></div>
    )
}
export default Addcenter