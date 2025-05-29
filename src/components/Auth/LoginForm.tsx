
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { TrainIcon, UserIcon, LockIcon, SparklesIcon } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Floating train icons */}
      <div className="absolute inset-0 pointer-events-none">
        <TrainIcon className="absolute top-1/4 left-1/6 w-8 h-8 text-white/20 animate-bounce delay-300" />
        <TrainIcon className="absolute top-2/3 right-1/6 w-6 h-6 text-white/20 animate-bounce delay-700" />
        <TrainIcon className="absolute bottom-1/4 left-2/3 w-10 h-10 text-white/20 animate-bounce delay-1000" />
      </div>

      <Card className="w-full max-w-md mx-4 backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl" variant="glass">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-4 rounded-full shadow-lg animate-pulse">
                <TrainIcon className="w-10 h-10 text-white" />
              </div>
              <SparklesIcon className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 gradient-text">
            Railway Booking System
          </h1>
          <p className="text-white/80 text-lg">
            {isSignupMode ? '🚀 Join the journey' : '👋 Welcome back! All aboard!'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-blue-300 transition-colors z-10" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              required
            />
          </div>

          <div className="relative group">
            <LockIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-blue-300 transition-colors z-10" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded-xl backdrop-blur-sm animate-shake">
              ⚠️ {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Please wait...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {isSignupMode ? '🎟️ Sign Up' : '🚂 Sign In'}
              </div>
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onToggleMode}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-300 underline decoration-2 decoration-blue-400 underline-offset-4 hover:decoration-pink-400"
            >
              {isSignupMode 
                ? '🔙 Already have a ticket? Sign in' 
                : "🎫 Don't have a ticket? Get one now!"
              }
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};
