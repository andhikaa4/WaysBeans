import React, { useContext, useEffect, useState } from 'react'
import ImageProduct from '../Image/product1.png'
import {API} from '../../config/api'
import {useQuery} from 'react-query'
import {UserContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import toRupiah from '@develoka/angka-rupiah-js';



function ListProduct() {
    const [state] = useContext(UserContext)
    const navigate = useNavigate()

    const { data: products, refetch } = useQuery("listProductCache", async () => {
        const response = await API.get("/products");
        return response.data.data;
    });

    useEffect(() =>{
        refetch()
    },[state])

    const handleDelete = async(id) => {
        try {
            const response = await API.delete(`/product/${id}`)
            refetch()
        } catch (error) {
            console.log(error);
        }
    }
    

  return (
    <div className='container-xxl' style={{ height:"100vh"}}>
        <div className='container d-flex p-5'>
            <div className='p-3 w-100'>
                <h3 className='mb-4'>List Products</h3>
                <table border='1px' className='w-100 border-collapse text-middle'>
                   <thead>
                        <tr className='bg-info bg-opacity-50 text-center'>
                            <th className='border border-1 border-dark py-2 ps-1'>
                                No
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Image
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Name
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Stock
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Price
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Description
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Action
                            </th>

                        </tr>
                   </thead>
                   <tbody>
                    {products?.map((item, index) =>(
                        <tr className='text-center'>
                        <td className='border border-1 border-dark py-2 ps-1'>
                            {index + 1}
                        </td >
                        <td className='border border-1 border-dark ps-1'>
                            <img style={{maxWidth:"100px"}} src={item.image} alt=""/>
                        </td>
                        <td className='border border-1 border-dark ps-1'>
                            {item.name}
                        </td>
                        <td className='border border-1 border-dark ps-1'>
                            {item.stock}
                        </td>
                        <td className='border border-1 border-dark ps-1'>
                        {toRupiah(item.price, { dot: '.', floatingPoint: 0, Symbol:'IDR' })}
                        </td>
                        <td className='border border-1 text-break w-25 border-dark ps-1'>
                            {item.desc}
                        </td>
                        <td className='border border-1 border-dark p-1 '>
                            <div className=' w-100'>
                                
                                <button style={{width:"49%"}} className=' btn btn-danger text-white me-1 ' onClick={() => {handleDelete(item.id); refetch()}} type="">Delete</button>
                                <button style={{width:"49%"}} className=' btn btn-success text-white' type="" onClick={() => navigate(`/edit-product/${item.id}`)}>Update</button>
                            </div>
                        </td>

                    </tr>   
                    ))}

                    
                            
                   </tbody>

                </table>
            </div>
        </div>
    </div>
  )
}

export default ListProduct