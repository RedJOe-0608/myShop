import {useState, useEffect} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {toast} from 'react-toastify'
import {useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation} from '../slices/productsApiSlice'

const AdminProductEditPage = () => {

  const {id: productId} = useParams()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const {data:product, isLoading, error } = useGetProductDetailsQuery(productId)
  // console.log(product);
  const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation()
  const navigate = useNavigate()

  const [uploadProductImage] = useUploadProductImageMutation()



  useEffect(() => {
    if(product){
      setName(product.name)
      setPrice(product.price)
      setDescription(product.description)
      setImage(product.image)
      setCategory(product.category)
      setBrand(product.brand)
      setCountInStock(product.countInStock)
    }
  },[product])

  const submitHandler = async(e) => {
    e.preventDefault()
    const updatedProduct = {
    productId,
    name, 
    price,
    description,
    image,
    brand,
    category,
    countInStock
  }
  const result = await updateProduct(updatedProduct)
  if(result.error){
    toast.error(result.error)
  }else{
    toast.success("Product Updated")
    navigate('/admin/productlist')
  }
}
const uploadFileHandler = async(e) => {
  // e.preventDefault()
  // console.log(e.target.files[0]);
  const formData = new FormData()
  formData.append('image',e.target.files[0])
  try {
    const res = await uploadProductImage(formData).unwrap()
    toast.success(res?.message)
    setImage(res?.image)
  } catch (error) {
    toast.error(error?.data?.message || error.error)
  }
}

  return (
    <>
     <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link> 
     <FormContainer>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
       
       {isLoading ? <Loader /> : error ? <Message variant="danger">{error?.data?.message || error?.error}</Message> : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price' className='my-2'>
            <Form.Label>Price</Form.Label>
            <Form.Control
            type='number'
            placeholder='Enter price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* IMAGE INPUT */}
          <Form.Group controlId='image' className='my-2'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='text'
            placeholder='enter image url'
            value={image}
            onChange={(e) => setImage}
            ></Form.Control>
            <Form.Control type='file' label='Choose File' onChange={ uploadFileHandler}>

            </Form.Control>
          </Form.Group>

          <Form.Group controlId='brand' className='my-2'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter brand'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='countInStock' className='my-2'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
            type='number'
            placeholder='Enter Count in stock'
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='category' className='my-2'>
            <Form.Label>Category</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='description' className='my-2'>
            <Form.Label>Description</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
          type='submit'
          variant='primary'
          className='my-2'
          >Update</Button>
        </Form>
       )}
     </FormContainer>
    </>
  )
}

export default AdminProductEditPage
