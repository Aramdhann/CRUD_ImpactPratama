import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Code: {product.code}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <p>UOM: {product.uom}</p>
      <Link to="/" className="btn btn-primary">
        Back
      </Link>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    uom: PropTypes.string.isRequired,
  }).isRequired,
}

export default Product
