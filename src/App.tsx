
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/Auth/LoginForm';
import { Dashboard } from '@/components/Dashboard/Dashboard';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [isSignupMode, setIsSignupMode] = useState(false);

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm 
          onToggleMode={() => setIsSignupMode(!isSignupMode)}
          isSignupMode={isSignupMode}
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
