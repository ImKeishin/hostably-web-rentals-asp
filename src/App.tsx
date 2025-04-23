
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import HostDashboardPage from './pages/HostDashboardPage';
import AddPropertyPage from './pages/AddPropertyPage';
import HostPropertiesPage from './pages/HostPropertiesPage';
import ProfilePage from './pages/ProfilePage';
import HostReservationsPage from './pages/HostReservationsPage';
import WriteReviewPage from './pages/WriteReviewPage';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <PropertyProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/property/:propertyId" element={<PropertyDetailsPage />} />
              <Route path="/property/:propertyId/review" element={<WriteReviewPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/host/dashboard" element={<HostDashboardPage />} />
              <Route path="/host/add-property" element={<AddPropertyPage />} />
              <Route path="/host/properties" element={<HostPropertiesPage />} />
              <Route path="/host/reservations" element={<HostReservationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PropertyProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
