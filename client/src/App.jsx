import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Landing from "./components/layout/Landing.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import Dashboard from "./views/Dashboard.jsx";
import ProtectedRoute from "./components/routing/ProtectedRoute.jsx";
import About from "./views/About.jsx";
import PostContextProvider from "./contexts/PostContext.jsx";


function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Landing/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/register" element={<RegisterForm/>}/>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                        </Route>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/about" element={<About/>}/>
                        </Route>
                    </Routes>
                </Router>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
