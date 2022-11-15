import React, { useContext, useEffect, useState } from 'react'
import Logo from '../Image/Waysbean.png'
import imageHome from '../Image/imageHome.png'
import Waves from '../Image/Waves.png'
import Product1 from '../Image/product1.png'
import { Link, useParams } from 'react-router-dom'
import {API} from '../../config/api'
import {useQuery} from 'react-query'
import { UserContext } from '../context/UserContext'
import toRupiah from '@develoka/angka-rupiah-js';


function Home() {

    const [state] = useContext(UserContext)

    const [products,setProducts] = useState()

    const getData = async() => {
        try {
            const response = await API.get('/products')

            setProducts(response.data.data)
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect((e) =>{
        getData()
    },[state])

    return (
        <div className='container px-5'  >
            <div className=' mt-4 mb-5' style={{ backgroundColor: "#DBB699", width: "90%", height:"80vh" }}  >
                <div className='w-100 align-items-center p-5' style={{ maxHeight: "400px" }}>
                    <div className='row ' style={{marginBottom:"-150px", marginTop:"80px"}}>
                        <div className='col-6'>
                                <img src={Logo} className="w-100" alt=""  />
                        </div>
                        <div className='col-6'>
                            <img src={Waves} style={{ maxWidth: "90%", height: "auto", marginLeft: "-10px", marginTop: "200px" }} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6' style={{marginTop:"-10px"}}>
                            <h4>BEST QUALITY COFFEE BEANS</h4>
                            <p style={{ maxWidth: "300px" }}>Quality freshly roasted coffee made just for you.
                                Pour, brew and enjoy</p>

                        </div>
                        <div className='col-6'>
                            <img src={imageHome} alt="" className=' display-block' style={{ marginLeft: "70px", marginTop:"-230px" , width:"120%"}} />
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <div className='row' style={{ overflowX:"auto", whiteSpace:"nowrap", display:"block", boxSizing:"border-box"}}>
                    {products?.map((item) => (
                        <div className='col-3 mb-5' style={{display:"inline-block", float:"none", verticalAlign:"top"}}>
                        <Link className='text-decoration-none text-black' to={`/detail-product/${item.id}`}>
                            <div className='bg-secondary bg-opacity-25' style={{height:"350px"}} >
                                <div className=' w-100'>
                                    <img style={{width:"100%",height:"200px", objectFit:"cover"}} src={item.image} />
                                    
                                </div>
                                <div className='p-3 d-flex flex-column'>
    
                                    <h6 className='me-0'>{item.name}</h6>
                                    <p className='mb-0 '>{toRupiah(item.price, { dot: '.', floatingPoint: 0, Symbol:'IDR' })}</p>
                                    <p className='mb-0'>Stock : {item.stock}</p>
                                </div>
                            </div>
                        </Link>
                        </div>
                    ))}
                    
                    
                    
                </div>
            </div>

        </div>
    )
}

export default Home