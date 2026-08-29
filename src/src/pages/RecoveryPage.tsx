import { Link } from 'react-router-dom'
import { getRequests, diagnoseFailure } from '../services/mockData'
import { AlertTriangle, CheckCircle2, ChevronRight, User, Building2, Landmark, Server, ShieldAlert } from 'lucide-react'

export function RecoveryPage() {
  // We don't specify citizen ID, it defaults to demo user
  const allRequests = getRequests()
  
  // Find all requests that have a diagnosis
  const recoverableFailures = allRequests.map(req => {
    return {
      request: req,
      diagnosis: diagnoseFailure(req.id)
    }
  }).filter(item => item.diagnosis !== null)

  const renderOwnerIcon = (owner: string) => {
    switch (owner) {
      case 'member': return <User size={16} />
      case 'employer': return <Building2 size={16} />
      case 'epfo': return <ShieldAlert size={16} />
      case 'bank': return <Landmark size={16} />
      case 'system': return <Server size={16} />
      default: return <AlertTriangle size={16} />
    }
  }

  return (
    <div className="epfo-page">
      <div className="epfo-page-header">
        <h1>Fix a Failed Request</h1>
        <div className="epfo-page-header__subtitle">
          Find out why your request was rejected and how to fix it.
        </div>
      </div>

      <div style={{ maxWidth: '800px' }}>
        {recoverableFailures.length === 0 ? (
          <div className="epfo-empty">
            <div className="epfo-empty__icon"><CheckCircle2 size={48} color="var(--epfo-green)" /></div>
            <h2 className="epfo-empty__title">No rejected requests</h2>
            <p className="epfo-empty__desc">
              You don't have any recent requests that require fixing.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {recoverableFailures.map(({ request, diagnosis }) => (
              <div key={request.id} className="epfo-recovery" style={{ border: '1px solid var(--epfo-error)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <div className="epfo-recovery__header" style={{ background: 'var(--epfo-error-subtle)', padding: '16px 24px', borderBottom: '1px solid var(--epfo-error-border)' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--epfo-error-text)', fontSize: '18px', margin: 0 }}>
                    <AlertTriangle size={20} /> {request.title} Failed
                  </h3>
                </div>
                
                <div className="epfo-recovery__body" style={{ padding: '24px', background: 'var(--epfo-white)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)', marginBottom: '4px' }}>Request ID</div>
                      <div className="mono" style={{ fontSize: '14px' }}>{request.id}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)', marginBottom: '4px' }}>Filed On</div>
                      <div style={{ fontSize: '14px' }}>
                        {new Date(request.filedOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <div className="epfo-recovery__section" style={{ marginBottom: '16px' }}>
                    <div className="epfo-recovery__section-title" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--epfo-text-secondary)', marginBottom: '8px' }}>Reason</div>
                    <div className="epfo-recovery__section-content" style={{ fontSize: '16px' }}>
                      {diagnosis!.userFacingCause}
                    </div>
                  </div>

                  <div className="epfo-recovery__section" style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--epfo-bg-subtle)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'var(--epfo-white)', borderRadius: '50%', color: 'var(--epfo-primary)' }}>
                      {renderOwnerIcon(diagnosis!.owner)}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)' }}>Who needs to act?</div>
                      <div style={{ fontSize: '15px', fontWeight: 600, textTransform: 'capitalize' }}>
                        {diagnosis!.owner === 'epfo' ? 'EPFO' : diagnosis!.owner}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--epfo-border-subtle)' }}>
                    <Link to={`/requests/${request.id}`} className="epfo-btn epfo-btn--primary">
                      View Full Details & Fix <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
