import { Link } from 'react-router-dom'
import { ArrowRight, Wallet, UserX, ArrowLeftRight, Activity, AlertTriangle } from 'lucide-react'
import { getMember, getHealthSummary, getRequests, formatCurrency, getTotalBalance } from '../services/mockData'

export function HomePage() {
  const member = getMember()
  const health = getHealthSummary()
  const requests = getRequests().filter(r => r.status !== 'settled' && r.status !== 'rejected').slice(0, 3)
  const balance = getTotalBalance()

  if (!member) return <div className="epfo-page">Member not found</div>

  return (
    <div className="epfo-page">
      <div className="epfo-page-header">
        <h1>Welcome, {member.full_name}</h1>
        <div className="epfo-page-header__subtitle">
          UAN: <span className="mono">{member.uan_masked}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* Account Balance Summary */}
        <div className="epfo-record" style={{ borderLeft: '4px solid var(--epfo-primary)' }}>
          <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', marginBottom: '8px' }}>
            Total EPF Balance
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--epfo-primary)', marginBottom: '16px' }}>
            {formatCurrency(balance)}
          </div>
          <Link to="/account" className="epfo-btn epfo-btn--ghost" style={{ padding: 0, fontSize: '14px' }}>
            View passbook <ArrowRight size={16} />
          </Link>
        </div>

        {/* Account Health Summary */}
        <div className="epfo-record" style={{ borderLeft: `4px solid ${health.actionNeeded > 0 ? 'var(--epfo-saffron)' : 'var(--epfo-green)'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)' }}>
              Account Health
            </div>
            <div className={`epfo-status ${health.actionNeeded > 0 ? 'epfo-status--action-needed' : 'epfo-status--verified'}`}>
              {health.summary}
            </div>
          </div>
          <div style={{ fontSize: '14px', color: 'var(--epfo-text-primary)', marginBottom: '16px', lineHeight: 1.5 }}>
            {health.verified} of {health.total} checks verified.
            {health.actionNeeded > 0 && " Some services may be restricted until issues are resolved."}
          </div>
          <Link to="/account/health" className="epfo-btn epfo-btn--ghost" style={{ padding: 0, fontSize: '14px' }}>
            {health.actionNeeded > 0 ? 'Fix account issues' : 'View account health'} <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Goal-based Services */}
      <section className="epfo-section">
        <h2 className="epfo-section__title">What do you want to do today?</h2>
        <div className="epfo-card-grid epfo-card-grid--3">
          <Link to="/services/claim" className="epfo-goal-card">
            <div className="epfo-goal-card__icon" style={{ background: 'var(--epfo-green-light)', color: 'var(--epfo-green)' }}>
              <Wallet size={20} />
            </div>
            <div className="epfo-goal-card__title">Get PF money</div>
            <div className="epfo-goal-card__desc">Withdraw your provident fund or apply for pension</div>
          </Link>
          
          <Link to="/services/kyc" className="epfo-goal-card">
            <div className="epfo-goal-card__icon" style={{ background: 'var(--epfo-blue-light)', color: 'var(--epfo-blue)' }}>
              <UserX size={20} />
            </div>
            <div className="epfo-goal-card__title">Fix my details</div>
            <div className="epfo-goal-card__desc">Update Aadhaar, PAN, bank account, or name</div>
          </Link>
          
          <Link to="/services/transfer" className="epfo-goal-card">
            <div className="epfo-goal-card__icon" style={{ background: 'var(--epfo-primary-surface)', color: 'var(--epfo-primary)' }}>
              <ArrowLeftRight size={20} />
            </div>
            <div className="epfo-goal-card__title">Move PF</div>
            <div className="epfo-goal-card__desc">Transfer money from a previous employer</div>
          </Link>

          <Link to="/account" className="epfo-goal-card">
            <div className="epfo-goal-card__icon" style={{ background: '#F0F0F0', color: 'var(--epfo-text-secondary)' }}>
              <Activity size={20} />
            </div>
            <div className="epfo-goal-card__title">View account</div>
            <div className="epfo-goal-card__desc">Check balance, passbook, and employment history</div>
          </Link>
          
          <Link to="/recovery" className="epfo-goal-card">
            <div className="epfo-goal-card__icon" style={{ background: 'var(--epfo-red-light)', color: 'var(--epfo-red)' }}>
              <AlertTriangle size={20} />
            </div>
            <div className="epfo-goal-card__title">Fix failed request</div>
            <div className="epfo-goal-card__desc">Diagnose why a claim or transfer was rejected</div>
          </Link>
        </div>
      </section>

      {/* Active Requests */}
      {requests.length > 0 && (
        <section className="epfo-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="epfo-section__title" style={{ margin: 0 }}>Active Requests</h2>
            <Link to="/requests" className="epfo-btn epfo-btn--ghost" style={{ fontSize: '14px', padding: 0 }}>
              View all
            </Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {requests.map(req => (
              <Link 
                key={req.id} 
                to={`/requests/${req.id}`}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: 'var(--epfo-white)',
                  border: '1px solid var(--epfo-border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--epfo-text-primary)', marginBottom: '4px' }}>
                    {req.title}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)' }}>
                    ID: <span className="mono">{req.id}</span> • Filed on {new Date(req.filedOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <div className="epfo-status epfo-status--pending">
                  {req.statusLabel}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
