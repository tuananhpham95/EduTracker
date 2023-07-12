import {Navigate, Outlet} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext.jsx';
import NavBarMenu from "../layout/NavBarMenu.jsx";

const ProtectedRoute = () => {
    const {authState} = useContext(AuthContext);
    const {isAuthenticated} = authState;

    return (

        isAuthenticated ?
            <>
                <NavBarMenu></NavBarMenu>
                <Outlet/>
            </>

            :
            <Navigate to="/login"/>
    )

};

export default ProtectedRoute;
