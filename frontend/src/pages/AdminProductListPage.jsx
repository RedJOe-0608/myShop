import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { FaEdit, FaTrash} from 'react-icons/fa'
import {Table, Button, Row ,Col} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../slices/productsApiSlice'
import {toast} from 'react-toastify'
const AdminProductListPage = () => {

    const {data:products, isLoading,error,refetch} = useGetProductsQuery()
    // console.log(products);
    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation()

    const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation()

    const deleteHandler = async(id) => {
        // console.log('delete', id);
        if(window.confirm('Are you sure you want to delete?'))
        {
            try {
                await deleteProduct(id)
                toast.success("Product deleted successfully!")
                refetch();
            } catch (error) {
                toast.error(error?.data?.message)
            }
        }

    }

    const createProductHandler = async() => {
        if(window.confirm('Are you sure you want to create this product?'))
        {
            try {
                await createProduct()
                refetch()
            } catch (error) {
                toast(error?.data?.message || error?.error)
            }
        }
    }
  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                <Button className='btn-sm m-3'
                onClick={createProductHandler}
                >
                    <FaEdit /> Create Product
                </Button>
            </Col>
        </Row>
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}
        {isLoading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <>
            <Table stripped="true" hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <th>{product._id}</th>
                            <th>{product.name}</th>
                            <th>{product.price}</th>
                            <th>{product.category}</th>
                            <th>{product.brand}</th>
                            <th>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm mx-2'>
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>
                                    <Button variant='danger' className='btn-sm'
                                    onClick={() => deleteHandler(product._id)}>
                                        <FaTrash style={{color: 'white'}} />
                                    </Button>
                            </th>
                        </tr>
                    ))}
                    </tbody>
            </Table>
            
            </>
        )}
      
    </>
  )
}

export default AdminProductListPage
