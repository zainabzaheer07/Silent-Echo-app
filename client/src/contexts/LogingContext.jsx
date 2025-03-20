import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// Create a context for the login state
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Get the user from localStorage if it exists
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        // Save the user to localStorage whenever it changes
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
            return data; // Return data for downstream handling if needed
        } catch (error) {
            console.error('Email/Password Login failed:', error);
            throw error;
        }
    };

    // Google Login
// In LoginContext.js
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
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
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