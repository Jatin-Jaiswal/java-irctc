
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { TrainIcon, UserIcon, LockIcon } from 'lucide-react';

interface LoginFormProps {
  onToggleMode: () => void;
  isSignupMode: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode, isSignupMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = isSignupMode 
        ? await signup(username, password)
        : await login(username, password);
      
      if (!success) {
        setError(isSignupMode ? 'Signup failed' : 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
            <TrainIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Railway Booking System
        </h1>
        <p className="text-gray-600">
          {isSignupMode ? 'Create your account' : 'Welcome back! Please sign in'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-12"
            required
          />
        </div>

        <div className="relative">
          <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-12"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Please wait...' : (isSignupMode ? 'Sign Up' : 'Sign In')}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={onToggleMode}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            {isSignupMode 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"
            }
          </button>
        </div>
      </form>
    </Card>
  );
};
