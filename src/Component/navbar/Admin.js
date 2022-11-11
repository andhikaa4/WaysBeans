import React, { useContext } from 'react'
import Keranjang from '../Image/Keranjang.png'
import Dropdown from 'react-bootstrap/Dropdown';
import ZaynBulet from '../Image/zaynBulet.png'
import Bean from '../Image/bean.png'
import Logout from '../Image/logout.png'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [state, dispatch] = useContext(UserContext)
    const navigate = useNavigate()

    const LogoutAdmin = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/")
    }
    const addProduct = () => {
        navigate(`/add-product`)
    }
    const listProduct = () => {
        navigate(`/list-product`)
    }
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="outline-light">
                    <img style={{ maxHeight: "50px", maxWidth: "50px", borderRadius: "100px", objectFit: "contain" }} src={ZaynBulet} alt="" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#" onClick={addProduct}>
                        <div className='d-flex'>
                            <img style={{ maxHeight: "20px" }} src={Bean} />
                            <p className='m-0 ms-2 fw-bold'>Add Product</p>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={listProduct}>
                        <div className='d-flex'>
                            <img style={{ maxHeight: "20px" }} src={Bean} />
                            <p className='m-0 ms-2'>List Product</p>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={LogoutAdmin}>
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

export default Admin