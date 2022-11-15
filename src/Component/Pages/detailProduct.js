import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { API } from '../../config/api';
import ImageProduct from '../Image/product1.png'
import toRupiah from '@develoka/angka-rupiah-js';


function DetailProduct(props) {
    const {id} = useParams()
    
    const [products,setProducts] = useState(null)

    const getData = async() => {
        try {
            const response = await API.get('/product/'+ id)

            setProducts(response.data.data)
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect((e) =>{
        getData()
        
    },[products])

    const addToCartHandler = async (productId, productPrice) => {
        try {
          const response = await API.post(`/cart/add/${productId}`, {
            price: productPrice,
          })
          props.length()
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className='container px-5'>
        <div className='my-5' >
                    {products !== undefined || 0 ? (
            <div className='row'  >
                <div className='col-6 ' >
                    <img className='mx-auto' style={{width:"100%", maxHeight:"500px" ,display:"block" }} src={products?.image} alt=""/>
                </div>
                <div className='col-6 py-5'>
                    <h2>{products?.name}</h2>
                    <p>Stock : {products?.stock}</p>
                    <p className='mb-4'>{products?.desc}</p>
                        <p style={{textAlign:"right"}} className='mb-5'>
                        {toRupiah(products?.price)}
                        </p>

                        <button onClick={() => addToCartHandler(id, products?.price)} className='btn btn-success w-100'>Add to Cart</button>
                </div>
            </div>
            ): null}
        </div>
        
    </div>
  )
}

export default DetailProduct