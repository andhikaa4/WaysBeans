import React, { useContext, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from 'react-query';
import { API } from '../../../config/api';
import { UserContext } from '../../context/UserContext';

export default function ModalLogin(props) {
    const [state, dispatch] = useContext(UserContext)


  const [form, setForm] = useState({
    email: '',
    password: '',
});

const { email, password } = form;

const handleOnChange = (e) => {
  setForm({
      ...form,
      [e.target.name]: e.target.value,
  });
}

    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        const data = await API.post("/login", form);
  
        const alert = <Alert variant="success">Login berhasil!</Alert>;

  
        let payload = data.data.data;
        let userCheck = payload.role
        dispatch({
          type: "LOGIN_SUCCESS",
          payload,
        });
        // if( userCheck == "Buyer"){
        //   navigate("/");
        // } else {
        //   navigate("/Profile-Partner/" + payload.id)
        // }

        props.handleClose()
      } catch (error) {
        console.log(error);
        const alert = <Alert variant="danger">Email / password salah!</Alert>;
  
      }
    });

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleOnChange}
                value={email}
                className='bg-secondary bg-opacity-25'
                placeholder="Your Email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3 " >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleOnChange}
                value={password}
                className='bg-secondary bg-opacity-25'
                placeholder="Password"
                autoFocus
              />
            </Form.Group>
            <button className='btn btn-success w-100 my-3' type="submit"> Login</button>
            <p className='text-center'>Don't have an account ? Klik <a href='#' onClick={() => {props.handleShowRegis(); props.handleClose()}} className='pe-auto text-decoration-none text-black fw-bold'>Here</a> </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

