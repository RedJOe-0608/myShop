
import { Row,Col } from 'react-bootstrap'

import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Message from '../components/Message'
import { Link, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
const HomePage = () => {

  const {pageNumber,keyword} = useParams()
  const {data, error} = useGetProductsQuery({keyword,pageNumber})

  return (
    <>
    {!keyword ? <ProductCarousel /> : (<Link to='/' className='btn btn-light mb-4'>Go Back</Link>)}
   { error ? (
    <Message variant="danger">
                {error?.data?.message || error.error}
            </Message>
   ) : (
    <>
    <Meta />
    <h1>Latest Products</h1>
    <Row>
        {data?.products?.map(product =>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='my-3'>
            <Product product={product} />
            </Col>
        ))}
    </Row> 
    <Paginate
    pages={data.pages}
    page={data.page} 
    keyword= {keyword ? keyword : ''}
    />
    </>
   )}
    
    </>
  )
}

export default HomePage
