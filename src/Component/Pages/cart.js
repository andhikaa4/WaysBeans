import React, { useContext, useEffect, useState } from 'react'
import ImageProduct from '../Image/product1.png'
import Bin from '../Image/bin.png'
import { API } from '../../config/api';
import { useMutation, useQuery } from 'react-query';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import EmptyCart from '../Image/emptyCart.png'
import toRupiah from '@develoka/angka-rupiah-js';


function Cart(props) {
    const navigate = useNavigate()
    const [state] = useContext(UserContext)
    const [cart2, setCart2] = useState({})
    console.log(cart2);

    const { data: cartData, refetch } = useQuery("cartCache", async () => {
        try {
            const response = await API.get("/carts");
            const cart = response.data.data.map(item => item.product_id)
            setCart2(cart)
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    });

    const deleteCartHandler = async (productId) => {
        try {
            const response = await API.patch(`/cart/update/${productId}`);
            if (response.data.data.qty === 0) {
                const response = await API.delete(`/cart/delete/${productId}`);
            }
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const addToCartHandler = async (productId, productPrice) => {
        try {
            const response = await API.post(`/cart/add/${productId}`, {
                price: productPrice,
            })
            refetch()
        } catch (error) {
            console.log(error);
        }
    };

    const allCartPrice = cartData?.map((item) => item.product.price * item.qty);
    const subTotal = allCartPrice?.reduce((a, b) => a + b, 0);


    const cart = cartData?.map(item => item.product_id)


    useEffect(() => {
        refetch();
    }, [state]);
    const qty = cartData?.map(p => p.qty).reduce((a, b) => a += b, 0)

    useEffect(() => {
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;

        scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        };
      }, []);

      const handleBuy = useMutation(async () => {
        try {

          const formData = new FormData();
          formData.set("price", subTotal);
          formData.set("product_id", cart);
       
    
          const response = await API.post("/transaction", formData);
    
          const token = response.data.data.token;
          console.log(response);
    
          window.snap.pay(token, {
            onSuccess: function (result) {
              console.log(result);
              navigate("/profile/" + state.user.id);
            },
            onPending: function (result) {
              console.log(result);
              navigate("/profile/" + state.user.id);
            },
            onError: function (result) {
              console.log(result);
            },
            onClose: function () {
              alert("you closed the popup without finishing the payment");
            },
          });
    
        } catch (error) {
          console.log(error);
        }
      });

    return (
        <div className='container px-5'>
                {cartData?.length ? 
            <div className='my-5' >
                <h4 className='mb-4'>My Cart</h4>
                <p className='mb-0'>Review your Order</p>
                <div className='row'>
                    <div className='col-6' style={{ width: "70%" }}>
                        <hr className='border border-dark opacity-100' />
                        <div style={{ maxHeight: "250px", overflowX: "hidden", overflowY: "visible" }} >

                            {cartData?.map((item) => (
                                <div className='row mb-3 '>
                                    <div className='col-6 w-75 '>
                                        <div className='d-flex align-items-center '>
                                            <img className='me-3' src={item.product.image} style={{ maxHeight: "100px" }} alt="" />
                                            <div>
                                                <p className='mb-2 fw-bold'>{item.product.name}</p>
                                                <div className='d-flex align-items-center'>
                                                    <button className='btn p-0 px-2' type="" onClick={() => {
                                                        deleteCartHandler(item.product_id);
                                                    }}> -</button>
                                                    <p className='mx-3 my-0'>{item.qty}</p>
                                                    <button className='btn p-0 px-2' type="" onClick={() => {
                                                        addToCartHandler(
                                                            item.product_id,
                                                            item.product.price
                                                        )
                                                    }}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6 d-flex flex-column align-items-end justify-content-center w-25 pe-3'>
                                        <p> {toRupiah(item.price, { dot: '.', floatingPoint: 0, Symbol:'IDR' })}</p>
                                        <div>
                                            <a className='pointer' href="" onClick={async () => {
                                                                    const response = await API.delete(
                                                                        `/cart/delete/${item.product.id}`
                                                                    );
                                                                    refetch()
                                                                    props?.length()
                                                                    ;;
                                                                }}>
                                                <img src={Bin} alt="" />
                                            </a>

                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>
                        <hr className='border border-dark opacity-100' />
                    </div>
                    <div className='col-6' style={{ width: "30%" }}>
                        <hr className='border border-dark opacity-100' />
                        <div className='row'>
                            <div className='col-6'>
                                Subtotal
                            </div>
                            <div className='col-6'>
                                <p className='text-end' >  {toRupiah(subTotal, { dot: '.', floatingPoint: 0, Symbol:'IDR' })}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                Qty
                            </div>
                            <div className='col-6'>
                                <p className='text-end' > {qty}</p>
                            </div>
                        </div>
                        <hr className='border border-dark opacity-100' />
                        <div className='row'>
                            <div className='col-6'>
                                Total
                            </div>
                            <div className='col-6'>
                                <p className='text-end'>{toRupiah(subTotal, { dot: '.', floatingPoint: 0, Symbol:'IDR' })}</p>
                            </div>

                        </div>

                        <button className='btn btn-success w-100 mt-3' type="" onClick={() => handleBuy.mutate()} >Order</button>
                    </div>
                </div>  
                 
            </div> :
            <div className='container' style={{ height: "80vh" }}>
            <div className=' container mx-auto my-auto text-center' style={{ width: "30%" }}>
                <img src={EmptyCart} className="w-100" alt="" />
                <h4>Your Cart Is Empty</h4>
                <p className='mb-0' style={{ fontSize: "12px" }}>You have no items in your shopping cart.</p>
                <p className='m-0 mb-3' style={{ fontSize: "12px" }}>Let's go buy something!</p>
                <button href="#" className='btn bg-danger text-white px-5' onClick={() => navigate('/')}>Shopping Now</button>
            </div>
        </div> }
        </div>
    )
}

export default Cart