import { Link } from 'react-router-dom'
import { Wallet, UserX, ArrowLeftRight, Activity, AlertTriangle, FileText, Info } from 'lucide-react'

export function ServicesPage() {
  return (
    <div className="epfo-page">
      <div className="epfo-page-header">
        <h1>Services</h1>
        <div className="epfo-page-header__subtitle">
          Select what you want to achieve.
        </div>
      </div>

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
        
        <Link to="/requests" className="epfo-goal-card">
          <div className="epfo-goal-card__icon" style={{ background: '#F0F0F0', color: 'var(--epfo-text-secondary)' }}>
            <FileText size={20} />
          </div>
          <div className="epfo-goal-card__title">Track requests</div>
          <div className="epfo-goal-card__desc">Check the status of your claims and updates</div>
        </Link>
      </div>

      <div style={{ marginTop: '40px', padding: '24px', background: 'var(--epfo-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--epfo-border-subtle)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Info size={20} color="var(--epfo-primary)" />
          Don't see what you're looking for?
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', marginBottom: '16px' }}>
          Some older services or specific administrative forms might not be listed here. You can still access them through the traditional portal navigation.
        </p>
        <Link to="/help" className="epfo-btn epfo-btn--secondary epfo-btn--sm">
          Visit Help Centre
        </Link>
      </div>
    </div>
  )
}
