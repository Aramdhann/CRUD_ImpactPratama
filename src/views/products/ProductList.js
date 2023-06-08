import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import axios from 'axios'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [deleteProductId, setDeleteProductId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const response = await axios.get('/product-list')
      setProducts(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteProduct = async () => {
    try {
      await axios.delete(`/product/${deleteProductId}`)
      setDeleteProductId(null)
      toggleDeleteModal()
      getProducts()
    } catch (error) {
      console.error(error)
    }
  }

  const confirmDelete = (id) => {
    setDeleteProductId(id)
    toggleDeleteModal()
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  return (
    <div>
      <h1>Product List</h1>
      <CCard>
        <CCardHeader>
          <Link to="/add-product" className="btn btn-success text-light">
            Add Product
          </Link>
        </CCardHeader>
        <CCardBody>
          <CTable
            items={products}
            fields={['code', 'name', 'description', 'price', 'uom']}
            itemsPerPage={10}
            pagination
            scopedSlots={{
              actions: (item) => (
                <td>
                  <Link to={`/product/${item.id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <CButton color="danger" onClick={() => confirmDelete(item.id)}>
                    Delete
                  </CButton>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>

      <CModal show={showDeleteModal} onClose={toggleDeleteModal}>
        <CModalHeader>Delete Product</CModalHeader>
        <CModalBody>Are you sure you want to delete this product?</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={deleteProduct}>
            Yes
          </CButton>
          <CButton color="secondary" onClick={toggleDeleteModal}>
            No
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default ProductList
