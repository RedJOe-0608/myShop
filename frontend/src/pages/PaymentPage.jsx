import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savepaymentMethod } from '../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {shippingAddress} = useSelector((state) => state.cart)

    useEffect(() => {
        if(!shippingAddress)
            navigate('/shipping')
    },[shippingAddress,navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savepaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check
                type='radio'
                className='my-2'
                label='PayPal Or Credit Card'
                id='PayPal'
                value='PayPal'
                name='paymentMethod'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
            </Col>
        </Form.Group>
        <Button variant='primary' type='submit' >Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentPage
