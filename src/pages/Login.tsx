
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'renter' | 'host'>('renter');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password, userType);
      navigate(userType === 'host' ? '/host/dashboard' : '/');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Login to Hostably
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field mt-1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field mt-1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                I am a:
              </label>
              <div className="mt-1 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="renter"
                    checked={userType === 'renter'}
                    onChange={() => setUserType('renter')}
                    className="h-4 w-4 text-primary"
                  />
                  <span className="ml-2">Renter</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="host"
                    checked={userType === 'host'}
                    onChange={() => setUserType('host')}
                    className="h-4 w-4 text-primary"
                  />
                  <span className="ml-2">Host</span>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <button type="submit" className="btn-primary">
              Login
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
