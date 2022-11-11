import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Logo from '../Image/Waysbean.png'
import User from './User'
import Admin from './Admin'
import { useNavigate } from 'react-router-dom'

function Navbar(props) {
  const length = props?.cartData
  const navigate = useNavigate()
    const [state] = useContext(UserContext)

  return (
    <nav class="navbar navbar-expand-lg bg-light shadow ">
  <div class="container">
    <div style={{maxWidth:"150px"}}>
        <a href="#" onClick={() => navigate('/')}>
            <img src={Logo} alt="" style={{maxWidth:"100%", height:"auto"}}/>

        </a>

    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
      </ul>
      <div>
        {state.user.role == "Seller" ?
        <Admin/> :
        state.user.role  == "Buyer" ?
        <User length={length} /> :
        <div> 
            <button onClick={props.handleShow} class="btn btn-outline-success me-3 px-5" type="submit">Login</button>
            <button onClick={props.handleShowRegis} class="btn btn-success px-5" type="submit">Register</button>
        </div>
    }
        
        
        
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar