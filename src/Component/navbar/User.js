import React, { useContext } from 'react'
import Keranjang from '../Image/Keranjang.png'
import Dropdown from 'react-bootstrap/Dropdown';
import ZaynBulet from '../Image/zaynBulet.png'
import User from '../Image/user.png'
import Logout from '../Image/logout.png'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Users(props) {
    const [state, dispatch] = useContext(UserContext)
    const navigate = useNavigate()

    const LogoutUser = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/")
    }

    const profile = () => {
        navigate(`/profile/${state.user.id}`)
    }
    return (
        <div className='d-flex align-items-center'>
            <div style={{ maxHeight: "30px" }} className='me-4'>

                {/* <img style={{display:"block", maxHeight:"30px", maxWidth:"30px"}} src={Keranjang} alt="" /> */}
                <button type="button" class="btn btn-outline-light position-relative" onClick={() => navigate('/cart')}>
                <img style={{display:"block", maxHeight:"30px", maxWidth:"30px"}} src={Keranjang} alt="" />
                {props?.length?.length !== 0 ?
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {props?.length?.length}
                    </span> : null }
                </button>

            </div>
            <Dropdown>
                <Dropdown.Toggle variant="outline-light">
                    <img style={{ maxHeight: "50px", maxWidth: "50px", borderRadius: "100px", objectFit: "contain" }} src={ZaynBulet} alt="" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#" onClick={profile}>
                        <div className='d-flex'>
                            <img style={{ maxHeight: "20px" }} src={User} />
                            <p className='m-0 ms-2'>Profile</p>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={LogoutUser}>
                        <div className='d-flex'>
                            <img style={{ maxHeight: "20px" }} src={Logout} />
                            <p className='m-0 ms-2'>Log Out</p> 
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Users