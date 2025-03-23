import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';


// Create a context for the login state
const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

  

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Email/Password Login
    const login = async (email, password) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            console.error('Email/Password Login failed:', error);
            throw error;
        }
    };

    // Google Login
    const googleLogin = async (idToken) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/google/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
                throw new Error('Google login failed');
            }

            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            console.error('Google Login failed:', error);
            throw error;
        }
    };

    // Logout
    const logout = () => {
        setUser(null); // Clear user state
        localStorage.clear(); // Clear all local storage data
      
    };

    return (
        <LoginContext.Provider value={{ user, login, googleLogin, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

// Custom hook to use the login context
export const useLogin = () => {
    return useContext(LoginContext);
};

LoginProvider.propTypes = {
    children: PropTypes.node.isRequired,
};