import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../contexts/LogingContext';
import { GoogleLogin } from '@react-oauth/google';
import styles from "../Signup/Signup.module.css";

const Login = () => {
    const { login, googleLogin } = useLogin();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate("/conversation");
        } catch (err) {
            setError("Invalid email or password");
            console.error("Email/Password Login Error:", err);
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        const idToken = credentialResponse.credential;
        try {
            await googleLogin(idToken);
            navigate("/conversation");
        } catch (err) {
            setError("Google login failed");
            console.error("Google Login Error:", err);
        }
    };

    return (
                <div className={styles["register-container"]}>
                    <h2 className={styles["register-title"]}>Create your Account and start your journey</h2>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <form className={styles["register-form"]} onSubmit={handleSubmit}>
                        <div className={styles["form-group"]}>
                            {/* <label className={styles["form-label"]} htmlFor="email">Email</label> */}
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={styles["form-input"]}
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder='userabc@gmail.com'
                            />
                        </div>
                        <div className={styles["form-group"]}>
                            {/* <label className={styles["form-label"]} htmlFor="password">Password</label> */}
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={styles["form-input"]}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder='********'
                            />
                        </div>
                        <button type="submit" className={styles["register-button"]}>Login</button>
                    </form>
                    <div style={{ marginTop: '20px'}} className={styles["login-with-google-btn"]}>
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={(error) => {
                                setError("Google login failed");
                                console.error("Google Login Failed:", error);
                            }}
                            text="signin_with" // Updated to match current prop name
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <p className={styles["login-link"]}>
                        Do not have an account? <Link to="/signup">register</Link>
                    </p>
                </div>
      
 
    );
};

export default Login;