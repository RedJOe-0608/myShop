import { useNavigate } from 'react-router-dom'
import {Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/usersApiSlice'
import {logout} from '../slices/authSlice'
import logo from '../assets/logo.png'
import {useSelector, useDispatch} from 'react-redux'

const Header = () => {
    const {cartItems} = useSelector((state) => state.cart )
    const {userInfo} = useSelector((state) => state.auth)
    const [logoutApiCall] = useLogoutMutation()
    // console.log(cartItems);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const logoutHandler = async() => {
       try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
       } catch (error) {
            console.log(error);
       }
        // console.log('sign out');
    }
  return ( 
      <header>
        <Navbar variant='dark' bg='dark' expand='md' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                <Navbar.Brand>
                    <img src={logo} alt="myShop Logo" />
                    myShop
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <LinkContainer to='/cart'>
                            <Nav.Link >
                                <FaShoppingCart /> Cart
                                {
                                    cartItems.length > 0 && (
                                        <Badge pill bg='success'style={{marginLeft: '5px'}}>
                                        {cartItems.reduce((acc, c) => acc + c.qty,0)}
                                        </Badge>
                                    )
                                }
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                              <LinkContainer to='/login'>
                              <Nav.Link >
                                  <FaUser /> Sign In
                              </Nav.Link>
                          </LinkContainer>
                        )}
                      
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      </header>
  )
}

export default Header
