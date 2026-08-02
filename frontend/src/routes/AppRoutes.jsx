import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import AdminRoute from "@/routes/AdminRoute";
import ScrollToTop from "@/routes/ScrollToTop";

// Public
import Home from "@/pages/public/Home";
import About from "@/pages/public/About";
import Investments from "@/pages/public/Investments";
import ServiceDetail from "@/pages/public/ServiceDetail";
import FAQ from "@/pages/public/FAQ";
import Contact from "@/pages/public/Contact";
import Privacy from "@/pages/public/Privacy";
import Terms from "@/pages/public/Terms";
import Cookies from "@/pages/public/Cookies";

// Auth
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AdminLogin from "@/pages/auth/AdminLogin";
import AdminRegister from "@/pages/auth/AdminRegister";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import VerifyEmail from "@/pages/auth/VerifyEmail";

// Dashboard
import Dashboard from "@/pages/dashboard/Dashboard";
import Plans from "@/pages/dashboard/investment/Plans";
import Portfolio from "@/pages/dashboard/investment/Portfolio";
import Performance from "@/pages/dashboard/investment/Performance";
import Deposit from "@/pages/dashboard/payments/Deposit";
import Withdraw from "@/pages/dashboard/payments/Withdraw";
import Profile from "@/pages/dashboard/account/Profile";
import KYC from "@/pages/dashboard/account/KYC";
import Security from "@/pages/dashboard/account/Security";
import Notifications from "@/pages/dashboard/account/Notifications";
import Referral from "@/pages/dashboard/Referral";

// Admin
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminInvestments from "@/pages/admin/Investments";
import AdminDeposits from "@/pages/admin/Deposits";
import AdminWithdrawals from "@/pages/admin/Withdrawals";
import AdminKyc from "@/pages/admin/KYC";
import AdminTransactions from "@/pages/admin/Transactions";
import ROIConfig from "@/pages/admin/ROIConfig";
import AdminSettings from "@/pages/admin/Settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public marketing site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Hidden staff auth - intentionally not linked from the public site */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Client portal */}
        <Route element={<ProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/plans" element={<Plans />} />
            <Route path="/dashboard/portfolio" element={<Portfolio />} />
            <Route path="/dashboard/performance" element={<Performance />} />
            <Route path="/dashboard/deposit" element={<Deposit />} />
            <Route path="/dashboard/withdraw" element={<Withdraw />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/kyc" element={<KYC />} />
            <Route path="/dashboard/security" element={<Security />} />
            <Route path="/dashboard/notifications" element={<Notifications />} />
            <Route path="/dashboard/referral" element={<Referral />} />
          </Route>
        </Route>

        {/* Admin control panel */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/investments" element={<AdminInvestments />} />
            <Route path="/admin/deposits" element={<AdminDeposits />} />
            <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
            <Route path="/admin/kyc" element={<AdminKyc />} />
            <Route path="/admin/transactions" element={<AdminTransactions />} />
            <Route path="/admin/roi" element={<ROIConfig />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
