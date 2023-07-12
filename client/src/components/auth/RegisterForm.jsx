import {Link, Navigate, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import AlertMessage from "../layout/AlertMessage.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const RegisterForm = () => {
    const {registerUser} = useContext(AuthContext)
    const {authState: {isAuthenticated}} = useContext(AuthContext)
    if (isAuthenticated) return <Navigate to='/dashboard'></Navigate>
    // Local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [alert, setAlert] = useState(null)
    const {username, password, confirmPassword} = registerForm

    const onChangeRegisterForm = event =>
        setRegisterForm({...registerForm, [event.target.name]: event.target.value})
    const register = async event => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setAlert({type: 'danger', message: 'password do not match'})
            setTimeout(() => setAlert(null), 3000)
            return
        }
        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({type: 'danger', message: registerData.message})
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className="text-3xl">
                        EduTracker
                    </h1>
                    <p>Keep tracking what you are learning</p>
                    <Form className='my-4 flex items-center flex-col gap-3' onSubmit={register}>
                        <AlertMessage info={alert}/>

                        <Form.Group>
                            <Form.Control
                                style={{width: 400}}
                                type='text'
                                placeholder='Username'
                                name='username'
                                required
                                value={username}
                                onChange={onChangeRegisterForm}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                style={{width: 400}}
                                type='password'
                                placeholder='Password'
                                name='password'
                                required
                                value={password}
                                onChange={onChangeRegisterForm}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                style={{width: 400}}
                                type='password'
                                placeholder='Confirm Password'
                                name='confirmPassword'
                                required
                                value={confirmPassword}
                                onChange={onChangeRegisterForm}
                            />
                        </Form.Group>
                        <div className='flex justify-content-center'>
                            <Button className='w-[100px]' variant='success' type='submit'>
                                Login
                            </Button>
                        </div>

                    </Form>
                    <p>
                        Already have an account?
                        <Link to='/login'>
                            <Button variant='info' size='sm' className='ml-2'>
                                Login
                            </Button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
