import { Link } from 'react-router-dom'
import { getRequests } from '../services/mockData'
import { FileText, ArrowRight } from 'lucide-react'

export function RequestsPage() {
  const requests = getRequests()

  return (
    <div className="epfo-page">
      <div className="epfo-page-header">
        <h1>Track Requests</h1>
        <div className="epfo-page-header__subtitle">
          Status of your claims, grievances, and KYC updates.
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="epfo-empty">
          <div className="epfo-empty__icon"><FileText size={48} /></div>
          <h2 className="epfo-empty__title">No active requests</h2>
          <p className="epfo-empty__desc">
            You don't have any recent claims or service requests to track.
          </p>
          <Link to="/services" className="epfo-btn epfo-btn--primary" style={{ marginTop: '16px' }}>
            Browse Services
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
          {requests.map(req => (
            <Link 
              key={req.id} 
              to={`/requests/${req.id}`}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '20px',
                background: 'var(--epfo-white)',
                border: '1px solid var(--epfo-border-subtle)',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all var(--transition-fast)'
              }}
              className="epfo-request-card"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--epfo-text-primary)' }}>
                    {req.title}
                  </div>
                  <div className={`epfo-status ${
                    req.status === 'settled' || req.status === 'approved' ? 'epfo-status--verified' :
                    req.status === 'rejected' ? 'epfo-status--error' : 'epfo-status--pending'
                  }`}>
                    {req.statusLabel}
                  </div>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', display: 'flex', gap: '16px' }}>
                  <span>ID: <span className="mono">{req.id}</span></span>
                  <span>Updated: {new Date(req.lastUpdated).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
              <ArrowRight color="var(--epfo-text-secondary)" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
