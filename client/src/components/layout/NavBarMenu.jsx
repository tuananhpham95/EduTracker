import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import logoutIcon from "../../assets/logout.svg"

const NavBarMenu = () => {
    const {authState: {user: {username}}, logoutUser} = useContext(AuthContext)
    const logout = () => logoutUser()
    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Navbar.Brand className='font-weight-bolder text-white ml-3'>
                <p>EduTracker</p>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>Dashboard</Nav.Link>
                    <Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>About</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className='font-weight-bolder text-white'>
                        Wellcome
                        <span className='custom-username'>{username}</span>
                    </Nav.Link>
                    <Button variant='secondary'
                            className='flex bg-[#cf8083] font-bold text-white mr-3'
                            onClick={logout}>
                        <img
                            src={logoutIcon}
                            alt='logoutIcon'
                            width='32'
                            height='32'
                            className='mr-2'
                        />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBarMenu;