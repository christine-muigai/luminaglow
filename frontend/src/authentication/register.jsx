import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { createUserWithEmailAndPassword  } from './firebase'; 
import { auth } from './firebase'; 

const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault();
    SetError("");

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/products');
    } catch (error) {
        setError("sign up failed.try a different email or password");
    }


return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md"> 
            <h2 className="text-2xl font-bold mb-6 text-center">create your luminaglow account</h2>

           {error && (
            <div className="bg-red-100 border border-red-700 p-2 mb rounded text-sm text-center">
                <p>{error}</p>
            </div>
        )}

            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                     type="email" 
                     value={email} 
                     onChange={(e) => setEmail(e.target.value)} 
                     className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="luminaglow@gmail.com"          
                     required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                     type="password" 
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)} 
                     className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="**********"          
                     required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input
                     type="password" 
                     value={confirmPassword} 
                     onChange={(e) => setConfirmPassword(e.target.value)} 
                     className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="**********"          
                     required
                    />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 "
                  >
                    sign up
                </button>
            </form>
            <p className="mt-4 text-sm text-center">
                Already have an account? 
                <link to="/login" className="text-blue-600 hover:underline"> 
                Log in
                </link>
            </p>    
      </div>
   </div>
 );
}; 

export default Register;

