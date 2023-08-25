import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
const Product = ({product}) => {
  return (
    <Card className='py-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

    <Card.Body>
    <Link href={`/product/${product._id}`}>
        <Card.Title className='product-title'>
          {/* We are adding the class product-title because lets say the product title is short and it does not span 2 lines, then the card component height becomes shorter as compared to others. So, to overcome this, we add text-overflow: elipsis so that the title only spans over one line, and if it is any longer, it is displayed by ... */}
            <strong>{product.name}</strong>
        </Card.Title>
    </Link>

    <Card.Text as='div'>
      <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
    </Card.Text>

    <Card.Text as='h3'>
        ${product.price}
    </Card.Text>
    </Card.Body>
    </Card>
  )
}

export default Product
