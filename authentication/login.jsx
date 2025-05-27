import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { Link } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (error) {
            alert("Login failed. Please check your email and password.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate("/home");
        } catch (error) {
            alert("Google login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
                <form onSubmit={handleEmailLogin} className="space-y-4">
                     <input
                       type="email"
                       placeholder=""
                       className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       />
                       <input 
                         type="password" 
                         placeholder="password"
                         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                         value={password} 
                         onChange={(e) => setPassword(e.target.value)}
                           />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200" 
                        >
                        Login with Email
                    </button>
                    </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">or</p>
                    <button
                        onClick={handleGoogleLogin}
                        className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
                            

                      
                            