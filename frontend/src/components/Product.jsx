import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Product = ({product}) => {
  return (
    <Card className='py-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

    <Card.Body>
    <Link href={`/product/${product._id}`}>
        <Card.Title>
            <strong>{product.name}</strong>
        </Card.Title>
    </Link>

    <Card.Text as='h3'>
        ${product.price}
    </Card.Text>
    </Card.Body>
    </Card>
  )
}

export default Product
