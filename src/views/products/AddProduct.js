import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CForm, CInputGroup, CFormLabel, CButton } from '@coreui/react'
import axios from 'axios'

const AddProduct = () => {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [uom, setUom] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    try {
      const response = await axios.get(`/product/${id}`)
      const product = response.data
      setCode(product.code)
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setUom(product.uom)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/products/${id}`, { code, name, description, price, uom })
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Add Product</h1>
      <h1>Add Product</h1>
      <CForm onSubmit={handleSubmit}>
        <CInputGroup className="mb-3">
          <CFormLabel htmlFor="code">Code</CFormLabel>
          <input
            type="text"
            id="code"
            className="form-control"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CFormLabel htmlFor="name">Name</CFormLabel>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CFormLabel htmlFor="description">Description</CFormLabel>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CFormLabel htmlFor="price">Price</CFormLabel>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CFormLabel htmlFor="uom">UOM</CFormLabel>
          <select
            id="uom"
            className="form-control"
            value={uom}
            onChange={(e) => setUom(e.target.value)}
            required
          >
            <option value="">Select UOM</option>
            <option value="SHEET">SHEET</option>
            <option value="ROLL">ROLL</option>
            <option value="PCS">PCS</option>
          </select>
        </CInputGroup>
        <CButton color="primary" type="submit">
          Update
        </CButton>
      </CForm>
    </div>
  )
}

export default AddProduct
