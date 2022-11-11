import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Modal, Alert} from 'react-bootstrap';
import { API } from '../../../config/api';
import {useMutation} from 'react-query'

function ModalRegister(props) {

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Buyer'
});

const { name, email, password } = form;

const handleOnChange = (e) => {
  setForm({
      ...form,
      [e.target.name]: e.target.value,
  });
}

const handleSubmit = useMutation(async (e) => {
  try {
    e.preventDefault();

    const response = await API.post("/register", form);

    const alert = (
      <Alert variant="success">Berhasil mendaftarkan akun!</Alert>
    );

    setMessage(alert);

    console.log("ini response register", response);
  } catch (e) {
    console.log(e);
    const alert = (
      <Alert variant="danger">Aduh gagal!</Alert>
    );

    setMessage(alert);
  }
});



  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          {message && message}
            <Form.Group className="mb-3" >
              <Form.Control
                type="email"
                name='email'
                onChange={handleOnChange}
                value={email}
                className='bg-secondary bg-opacity-25'
                placeholder="Your Email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                name='name'
                onChange={handleOnChange}
                value={name}
                className='bg-secondary bg-opacity-25'
                placeholder="Full Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3 " >
              <Form.Control
                type="password"
                name='password'
                onChange={handleOnChange}
                value={password}
                className='bg-secondary bg-opacity-25'
                placeholder="Password"
                autoFocus
              />
            </Form.Group>
            <button className='btn btn-success w-100 my-3' type="submit"> Register</button>
            <p className='text-center'>Already have an Account ? Klik <a href='#' onClick={()=> {props.handleShow(); props.handleClose()}} className='pe-auto text-decoration-none text-black fw-bold'>Here</a> </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalRegister