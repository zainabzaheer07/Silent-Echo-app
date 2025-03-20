// Signup.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./Signup.module.css"; // Using the same stylesheet as Login

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [step, setStep] = useState(1);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const otpRefs = useRef([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
                formData
            );
            setMessage(response.data.msg);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
            console.error("Registration Error:", err);
        }
    };

    const handleOTPChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                otpRefs.current[index + 1].focus();
            }
        }
    };

    const handleOTPKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/verify-otp`,
                { ...formData, otp: otpValue }
            );
            setMessage(response.data.msg);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.msg || 'OTP verification failed');
            console.error("OTP Verification Error:", err);
        }
    };

    useEffect(() => {
        if (step === 2 && otpRefs.current[0]) {
            otpRefs.current[0].focus();
        }
    }, [step]);

    return (
        <div className={`${styles["register-container"]} register-page-container`} >
            <h2 className={styles["register-title"]}>
                {step === 1 ? "Create your Account and start your journey" : "Verify OTP"}
            </h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
            
            {step === 1 ? (
                <form className={styles["register-form"]} onSubmit={handleSubmit}>
                    <div className={styles["form-group"]}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={styles["form-input"]}
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Username"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles["form-input"]}
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="userabc@gmail.com"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles["form-input"]}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="********"
                        />
                    </div>
                    <button type="submit" className={styles["register-button"]}>Send OTP</button>
                </form>
            ) : (
                <form className={styles["register-form"]} onSubmit={handleOTPSubmit}>
                    <div className={styles["form-group-otp"]}>
                        <div className={styles["otp-container"]}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className={styles["otp-input"]}
                                    value={digit}
                                    onChange={(e) => handleOTPChange(e, index)}
                                    onKeyDown={(e) => handleOTPKeyDown(e, index)}
                                    ref={(el) => (otpRefs.current[index] = el)}
                                    required
                                />
                            ))}
                        </div>
                    </div>
                    <button type="submit" className={styles["register-button"]}>Verify OTP</button>
                </form>
            )}
            
            <p className={styles["login-link"]}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;