import {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, Row,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import {useLoginMutation} from '../slices/usersApiSlice'
import FormContainer from '../components/FormContainer'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const LoginPage = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await login({email,password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate(redirect)
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || error?.error)
        }
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login,{isLoading}] = useLoginMutation()
    const {userInfo} = useSelector((state) => state.auth)
    

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo)
            navigate(redirect)
    },[redirect,navigate,userInfo])


  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
            type='email'
            placeholder='Enter your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Button className='mt-2' type='submit' variant='primary' disabled={isLoading}>Sign In</Button>

        {isLoading  && <Loader />}
        
      </Form>
      <Row className='py-3'>
        <Col>New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
      </Row>
    </FormContainer>
  )
}

export default LoginPage
