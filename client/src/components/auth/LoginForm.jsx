import {Link, Navigate} from "react-router-dom";
import {useState, useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import AlertMessage from "../layout/AlertMessage.jsx";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const LoginForm = () => {
    const {loginUser} = useContext(AuthContext)
    const {authState: {isAuthenticated}} = useContext(AuthContext)
    if (isAuthenticated) return <Navigate to='/dashboard'></Navigate>
    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const [alert, setAlert] = useState(null)
    const {username, password} = loginForm

    const onChangeLoginForm = event =>
        setLoginForm({...loginForm, [event.target.name]: event.target.value})
    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if (!loginData.success) {
                setAlert({type: 'danger', message: loginData.message})
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
                    <Form className='my-4 flex items-center flex-col gap-3' onSubmit={login}>
                        <AlertMessage info={alert}/>

                        <Form.Group>
                            <Form.Control
                                style={{width: 400}}
                                type='text'
                                placeholder='Username'
                                name='username'
                                required
                                value={username}
                                onChange={onChangeLoginForm}
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
                                onChange={onChangeLoginForm}
                            />
                        </Form.Group>
                        <div className='flex justify-content-center'>
                            <Button className='w-[100px]' variant='success' type='submit'>
                                Login
                            </Button>
                        </div>

                    </Form>
                    <p>
                        Don't have an account?
                        <Link to='/register'>
                            <Button variant='info' size='sm' className='ml-2'>
                                Register
                            </Button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm