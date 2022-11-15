import React, { useContext, useEffect } from 'react'
import ImageProfile from '../Image/zaynKotak.png'
import ImageProduct from '../Image/product1.png'
import Logo from '../Image/Waysbean.png'
import QR from '../Image/qr.png'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { API } from '../../config/api'
import { UserContext } from '../context/UserContext'

function Profile() {
    const [state] = useContext(UserContext)
    const {id} = useParams()

    const { data: profile, refetch } = useQuery("profileCache", async () => {
        try {
            const response = await API.get(`/user/${id}`);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    });

    const { data: transaction, refetch: trx } = useQuery("trxCache", async () => {
        try {
            const response = await API.get(`/transactions`);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    });

    console.log(transaction);

    useEffect(() =>{
        refetch()
        trx()
    },[])
    return (
        <div className='container px-5'>
            <div className='my-5' >
                <div className='row'  >
                    <div className='col-6  ' >
                        <h3>My Profile</h3>
                        <div className='d-flex'>
                            <div style={{ maxWidth: "150px" }}>
                                <img style={{ maxWidth: "100%", display: "block" }} src={ImageProfile} alt="" />
                            </div>
                            <div className='ms-3'>
                                <p className='m-0 fw-bold'>Full Name</p>
                                <p>{profile?.name}</p>
                                <p className='mb-0 fw-bold'>Email</p>
                                <p>{profile?.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <h3>My Transaction</h3>
                        <div className='overflow-auto' style={{height:"400px"}}>
                            {transaction?.map((item) => (
                                <div className='d-flex p-2 mb-3' style={{ backgroundColor: "#F6E6DA" }}>
                                <div className='w-75'>
                                    <div className='d-flex' style={{ maxWidth: "100%" }}>
                                        <div style={{ maxWidth: "20%" }} className='me-2'>
                                            <img style={{ width: "100%", height: "auto" }} src={item.product[0].image} />

                                        </div>
                                        <div className=' w-50'>
                                            <p className='fw-bold m-0' style={{ fontSize: "12px" }}>{item.product[0].name}</p>
                                            <p className=' m-0 mb-2' style={{ fontSize: "10px" }}> <b>Saturday</b> ,5 March 2020</p>
                                            <p className='m-0' style={{ fontSize: "10px" }}>Price : {item.product[0].price}</p>
                                            <p className='m-0' style={{ fontSize: "10px" }}>Qty : 2</p>
                                            <p className='m-0 fw-bold' style={{ fontSize: "10px" }}>Sub Total :{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-25 h-100'>
                                    <div >
                                        <img className='mx-auto mb-1' src={Logo} style={{ width: "50%", display: "block" }} />

                                    </div>
                                    <img className='mx-auto mb-1' src={QR} style={{ width: "30%", display: "block" }} />
                                    <div className='w-100 bg-success rounded'>
                                        <p className='mx-auto text-center text-white mb-0'> {item.status}</p>

                                    </div>

                                </div>

                            </div>
                            ))}
                            
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile