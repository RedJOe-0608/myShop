import React, {useState, useEffect} from 'react'
import { Row,Col } from 'react-bootstrap'

import Product from '../components/Product'
const HomePage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      // we are using proxy, so we need not type localhost explicitly here
      const data = await fetch('/api/products')
      const products = await data.json()
      // console.log(products);
      setProducts(products)
    }

    fetchProducts()
  },[])
  return (
    <>
     <h1>Latest Products</h1>
    <Row>
        {products.map(product =>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
            </Col>
        ))}
    </Row> 
    </>
  )
}

export default HomePage
