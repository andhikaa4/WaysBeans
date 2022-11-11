import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../config/api';
import ImageProduct from '../Image/product1.png'
import NoImage from '../Image/NoImage.png'

function EditProduct () {

  const {id} = useParams()

  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()
  let { data: edit } = useQuery("editProductCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  const [product, setProduct] = useState({
    image: null,
    name: "",
    desc: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (edit) {
      setPreview(edit.image);
      setProduct({
        ...product,
        name: edit.name,
        desc: edit.desc,
        price: edit.price,
        stock: edit.stock,
      });
    }

  }, [edit]);


  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      if (product.image) {
        formData.set("image", product?.image[0], product?.image[0]?.name);
      }
      formData.set("name", product.name);
      formData.set("price", product.price);
      formData.set("stock", product.stock);
      formData.set("desc", product.desc);

      const data = await API.patch("/product/" + id, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      navigate("/list-product");

      console.log("ini edit product", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container px-5'>
      <div className='my-5' >
        <div className='row'  >
          <div className='col-6  py-2 ' >
            <h3>Edit Product</h3>
            <form onSubmit={(e) => handleSubmit(e)} >
              <input className='form-control mb-3 border border-dark' name='name' onChange={handleChange} value={product.name} placeholder='Product Name' style={{ backgroundColor: "rgba(97, 61, 43, 0.25)" }} type="text" />
              <input className='form-control mb-3 border border-dark' name='stock' onChange={handleChange} value={product.stock} placeholder='Stock' style={{ backgroundColor: "rgba(97, 61, 43, 0.25)" }} type="number" />
              <input className='form-control mb-3 border border-dark' name='price' onChange={handleChange} value={product.price} placeholder='Price' style={{ backgroundColor: "rgba(97, 61, 43, 0.25)" }} type="number" />
              <textarea rows="5" cols="10" placeholder='Description' name='desc' onChange={handleChange} value={product.desc} className='form-control mb-3 border border-dark' style={{ backgroundColor: "rgba(97, 61, 43, 0.25)" }} />

              <div class="input-group mb-3">
                <input type="file" name='image' onChange={handleChange} class="form-control" id="inputGroupFile02" />
                <label style={{ cursor: "pointer", backgroundColor: "rgba(97, 61, 43, 0.25)" }} class="input-group-text" for="inputGroupFile02">Upload</label>
              </div>
              <button type="submit" className='btn btn-success w-100'> Edit Product</button>
            </form>
          </div>

          <div className='col-6'>
            {preview ? (
              <img className='mx-auto' style={{ width: "100%", maxHeight: "500px", display: "block" }} src={preview} alt="" />) :
              (<img className='mx-auto' style={{ width: "100%", maxHeight: "500px", display: "block" }} src={NoImage} alt="" />
              )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default EditProduct
