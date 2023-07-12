import {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";


const Landing = () => {
    const navigate = useNavigate();


    return <Navigate to='/login'/>

};

export default Landing;
