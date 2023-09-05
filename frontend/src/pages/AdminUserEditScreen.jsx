import {useState, useEffect} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {toast} from 'react-toastify'
import {useGetUserDetailsQuery,useUpdateUserMutation} from '../slices/usersApiSlice'

const AdminUserEditScreen = () => {

  const {id: userId} = useParams()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const {data:user,refetch, isLoading, error } = useGetUserDetailsQuery(userId)
  // console.log(product);
  const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation()
  const navigate = useNavigate()




  useEffect(() => {
    if(user){
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  },[user])

  const submitHandler = async(e) => {
    e.preventDefault()
  try {
    await updateUser({userId, name, email, isAdmin})
    toast.success("User updated successfully!")
    refetch()
    navigate('/admin/userlist')
  } catch (error) {
    toast.error(error?.data?.message || error?.error)
  }
}


  return (
    <>
     <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link> 
     <FormContainer>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
       
       {isLoading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email' className='my-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

         <Form.Group controlId='isAdmin' className='my-2'>
            <Form.Check
            type='checkbox'
            label='Is Admin'
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
         </Form.Group>
          <Button
          type='submit'
          variant='primary'
          className='my-2'
          >Update</Button>
        </Form>
       )}
     </FormContainer>
    </>
  )
}

export default AdminUserEditScreen
