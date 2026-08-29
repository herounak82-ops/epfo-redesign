import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/shell/AppShell'
import { HomePage } from './pages/HomePage'
import { AccountPage } from './pages/AccountPage'
import { AccountHealthPage } from './pages/AccountHealthPage'
import { ServicesPage } from './pages/ServicesPage'
import { ClaimPage } from './pages/ClaimPage'
import { KYCPage } from './pages/KYCPage'
import { TransferPage } from './pages/TransferPage'
import { RequestsPage } from './pages/RequestsPage'
import { RequestDetailPage } from './pages/RequestDetailPage'
import { RecoveryPage } from './pages/RecoveryPage'
import { HelpPage } from './pages/HelpPage'
import { ProfilePage } from './pages/ProfilePage'
import { AuthProvider, useAuth } from './components/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { GrievanceDraftPage } from './pages/GrievanceDraftPage'
import { seedMockFailures } from './services/mockData'

function AppContent() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  // Seed failures for recovery demo
  seedMockFailures()

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/health" element={<AccountHealthPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/claim" element={<ClaimPage />} />
        <Route path="/services/kyc" element={<KYCPage />} />
        <Route path="/services/transfer" element={<TransferPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/requests/:id" element={<RequestDetailPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/grievance/draft" element={<GrievanceDraftPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </AppShell>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}
