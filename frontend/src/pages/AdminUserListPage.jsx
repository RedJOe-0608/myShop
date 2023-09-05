import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {FaTimes, FaTrash, FaEdit, FaCheck} from 'react-icons/fa'
import {Table, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetUsersQuery, useDeleteUserMutation } from '../slices/usersApiSlice'
import {toast} from 'react-toastify'


const AdminUserListPage = () => {

  const {data:users, isLoading,refetch, error} = useGetUsersQuery() 
  // console.log(orders);

  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation()

  const deletehandler = async(id) => {
    // console.log('delete');
    if(window.confirm('Are you sure you want to delete?')){
        try {
            await deleteUser(id)
            toast.success("User deleted successfully!")
            refetch()
        } catch (error) {
            toast.error(error?.data?.message || error?.error)
        }
    }
  }
  return (
    <>
     <h1>Users</h1> 
     {loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                {user.isAdmin ? (
                  <FaCheck style={{color: 'green'}} />
                ) : (
                  <FaTimes style={{color: 'red'}} />
                )}
                </td>
                
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                        <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button variant='danger'
                  onClick={() => deletehandler(user._id)}
                  className='btn-sm'>
                    <FaTrash style={{color: 'white'}} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default AdminUserListPage
