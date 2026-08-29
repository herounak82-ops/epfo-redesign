import { Link } from 'react-router-dom'
import { CheckCircle2, Clock, XCircle, Info, ChevronRight, ShieldAlert } from 'lucide-react'
import { getAccountHealth, getMember } from '../services/mockData'
import type { AccountHealthItem, HealthStatus } from '../services/types'

function StatusIcon({ status }: { status: HealthStatus }) {
  switch (status) {
    case 'verified':
      return <CheckCircle2 size={20} color="var(--epfo-green)" />
    case 'action_needed':
      return <ShieldAlert size={20} color="#92610A" />
    case 'error':
      return <XCircle size={20} color="var(--epfo-red)" />
    case 'pending':
      return <Clock size={20} color="var(--epfo-blue)" />
    case 'not_applicable':
      return <Info size={20} color="var(--epfo-text-secondary)" />
  }
}

export function AccountHealthPage() {
  const member = getMember()
  const healthItems = getAccountHealth()

  if (!member) return <div className="epfo-page">Member not found</div>

  const verified = healthItems.filter(i => i.status === 'verified' || i.status === 'not_applicable')
  const needsAction = healthItems.filter(i => i.status === 'action_needed' || i.status === 'error')
  const pending = healthItems.filter(i => i.status === 'pending')

  return (
    <div className="epfo-page">
      <div className="epfo-page-header">
        <h1>Account Health</h1>
        <div className="epfo-page-header__subtitle">
          We check these items to ensure you can access all EPFO services without delays.
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          background: 'var(--epfo-white)', 
          padding: '20px', 
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--epfo-border-subtle)',
          borderLeft: `4px solid ${needsAction.length > 0 ? 'var(--epfo-saffron)' : 'var(--epfo-green)'}`
        }}>
          <div style={{ marginTop: '2px' }}>
            {needsAction.length > 0 ? (
              <ShieldAlert size={24} color="#92610A" />
            ) : (
              <CheckCircle2 size={24} color="var(--epfo-green)" />
            )}
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
              {needsAction.length > 0 
                ? `${needsAction.length} item${needsAction.length > 1 ? 's' : ''} need${needsAction.length === 1 ? 's' : ''} your attention` 
                : 'Your account is in good standing'}
            </h2>
            <p style={{ color: 'var(--epfo-text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
              {needsAction.length > 0
                ? 'Resolving these issues will prevent claims from being rejected and services from being blocked.'
                : 'All necessary verifications are complete. You are ready to use all online services.'}
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Needs Action */}
        {needsAction.length > 0 && (
          <section>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--epfo-text-primary)', marginBottom: '12px' }}>
              Action Needed ({needsAction.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {needsAction.map(item => (
                <HealthCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Pending */}
        {pending.length > 0 && (
          <section>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--epfo-text-primary)', marginBottom: '12px' }}>
              Pending Processing ({pending.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pending.map(item => (
                <HealthCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Verified */}
        {verified.length > 0 && (
          <section>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--epfo-text-primary)', marginBottom: '12px' }}>
              Verified ({verified.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {verified.map(item => (
                <HealthCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function HealthCard({ item }: { item: AccountHealthItem }) {
  // Map health status to CSS status modifier
  const statusClass = (() => {
    switch (item.status) {
      case 'verified': return 'epfo-status--verified'
      case 'action_needed': return 'epfo-status--action-needed'
      case 'error': return 'epfo-status--error'
      case 'pending': return 'epfo-status--pending'
      case 'not_applicable': return 'epfo-status--neutral'
      default: return 'epfo-status--neutral'
    }
  })()

  const fixUrl = (() => {
    if (item.id === 'uan') return '/help'
    if (item.id === 'date_of_exit') return '/services/transfer?scenario=missing_doe'
    if (item.id === 'nomination') return '/profile'
    if (item.id === 'transfer_readiness') return '/services/transfer'
    return `/services/kyc?fix=${item.id}`
  })()

  return (
    <div className="epfo-health-item" data-status={item.status}>
      <div style={{ marginTop: '2px', flexShrink: 0 }}>
        <StatusIcon status={item.status} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--epfo-text-primary)' }}>
            {item.label}
          </div>
          <div className={`epfo-status ${statusClass}`}>
            {item.statusLabel}
          </div>
        </div>
        
        <p style={{ fontSize: '14px', color: 'var(--epfo-text-primary)', marginBottom: '8px', lineHeight: 1.5 }}>
          {item.explanation}
        </p>
        
        <div style={{ 
          fontSize: '13px', 
          color: 'var(--epfo-text-secondary)', 
          background: 'var(--epfo-bg-default)', 
          padding: '10px 12px', 
          borderRadius: 'var(--radius-sm)',
          marginBottom: '12px',
          lineHeight: 1.4
        }}>
          <strong>Why it matters:</strong> {item.whyItMatters}
        </div>

        {item.nextAction !== 'No action needed.' && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingTop: '12px',
            borderTop: '1px solid var(--epfo-border-subtle)'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>
              {item.nextAction}
            </div>
            {item.status === 'action_needed' && (
              <Link to={fixUrl} className="epfo-btn epfo-btn--ghost" style={{ padding: '4px 8px' }}>
                Fix now <ChevronRight size={16} />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
