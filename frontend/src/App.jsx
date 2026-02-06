
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateRequest from './pages/CreateRequest';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import VerifyEmail from './pages/VerifyEmail';
import VerificationRequest from './pages/VerificationRequest';
import MyDeliveries from './pages/MyDeliveries';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/AdminDashboard';
import AdminRegister from './pages/AdminRegister';
import Notifications from './pages/Notifications';
import { useAuthStore } from './store/authStore';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

const PrivateLayout = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="pb-16">
      {children}
      <Navbar />
    </div>
  );
};

function App() {
  const { checkAuth, checkingAuth } = useAuthStore();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/dashboard" element={<PrivateLayout><Dashboard /></PrivateLayout>} />
        <Route path="/create-request" element={<PrivateLayout><CreateRequest /></PrivateLayout>} />
        <Route path="/orders" element={<PrivateLayout><Orders /></PrivateLayout>} />
        <Route path="/profile" element={<PrivateLayout><Profile /></PrivateLayout>} />
        <Route path="/change-password" element={<PrivateLayout><ChangePassword /></PrivateLayout>} />
        <Route path="/verification" element={<PrivateLayout><VerificationRequest /></PrivateLayout>} />
        <Route path="/my-deliveries" element={<PrivateLayout><MyDeliveries /></PrivateLayout>} />
        <Route path="/my-orders" element={<PrivateLayout><MyOrders /></PrivateLayout>} />
        <Route path="/admin" element={<PrivateLayout><AdminDashboard /></PrivateLayout>} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/notifications" element={<PrivateLayout><Notifications /></PrivateLayout>} />
      </Routes>
    </>
  );
}

export default App;