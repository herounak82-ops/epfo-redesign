import { useParams, Link, useNavigate } from 'react-router-dom'
import { getRequestDetail, diagnoseFailure } from '../services/mockData'
import { ArrowLeft, Download, AlertTriangle, User, Building2, Landmark, Server, ShieldAlert } from 'lucide-react'

export function RequestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  if (!id) return null
  
  const request = getRequestDetail(id)

  if (!request) {
    return (
      <div className="epfo-page">
        <Link to="/requests" className="epfo-btn epfo-btn--ghost" style={{ padding: 0, marginBottom: '24px' }}>
          <ArrowLeft size={16} /> Back to Requests
        </Link>
        <div className="epfo-alert epfo-alert--error">
          Request not found or you don't have permission to view it.
        </div>
      </div>
    )
  }

  const isRejected = request.status === 'rejected' || request.status === 'failed'
  const isSettled = request.status === 'settled' || request.status === 'approved'
  
  const diagnosis = diagnoseFailure(id)

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
      <Link to="/requests" className="epfo-btn epfo-btn--ghost" style={{ padding: 0, marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Requests
      </Link>

      <div style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>
              {request.form_type || request.category || 'Service Request'} 
              {request.claim_reason ? ` — ${request.claim_reason.replace(/_/g, ' ')}` : ''}
            </h1>
            <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)' }}>
              Request ID: <span className="mono">{id}</span>
            </div>
          </div>
          <div className={`epfo-status ${
            isSettled ? 'epfo-status--verified' :
            isRejected ? 'epfo-status--error' : 'epfo-status--pending'
          }`} style={{ fontSize: '14px', padding: '6px 12px' }}>
            {request.status.replace(/_/g, ' ').toUpperCase()}
          </div>
        </div>

        {diagnosis && (
          <div className="epfo-recovery" style={{ marginBottom: '32px', border: '1px solid var(--epfo-error)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div className="epfo-recovery__header" style={{ background: 'var(--epfo-error-subtle)', padding: '16px 24px', borderBottom: '1px solid var(--epfo-error-border)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--epfo-error-text)', fontSize: '18px', margin: 0 }}>
                <AlertTriangle size={20} /> Request Failed: Action Required
              </h3>
            </div>
            
            <div className="epfo-recovery__body" style={{ padding: '24px', background: 'var(--epfo-white)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                
                <div className="epfo-recovery__section">
                  <div className="epfo-recovery__section-title" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--epfo-text-secondary)', marginBottom: '8px' }}>What happened?</div>
                  <div className="epfo-recovery__section-content" style={{ fontSize: '16px', lineHeight: 1.5 }}>
                    {diagnosis.userFacingCause}
                  </div>
                </div>

                <div className="epfo-recovery__section" style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--epfo-bg-subtle)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'var(--epfo-white)', borderRadius: '50%', color: 'var(--epfo-primary)' }}>
                    {renderOwnerIcon(diagnosis.owner)}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)' }}>Who needs to act?</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, textTransform: 'capitalize' }}>
                      {diagnosis.owner === 'epfo' ? 'EPFO' : diagnosis.owner}
                    </div>
                  </div>
                </div>

                <div className="epfo-recovery__section">
                  <div className="epfo-recovery__section-title" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--epfo-text-secondary)', marginBottom: '8px' }}>What you need to do</div>
                  <div className="epfo-recovery__section-content" style={{ fontSize: '16px', lineHeight: 1.5, marginBottom: '16px' }}>
                    {diagnosis.actionRequired}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)' }}>
                    <strong>Next step:</strong> {diagnosis.nextStep}
                  </div>
                </div>

                {diagnosis.evidenceRequired && (
                  <div className="epfo-recovery__section" style={{ background: 'var(--epfo-bg-subtle)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--epfo-border-subtle)' }}>
                    <div className="epfo-recovery__section-title" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--epfo-text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertTriangle size={16} /> Evidence Required
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '15px' }}>{diagnosis.evidenceRequired.document}</div>
                          <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)', marginTop: '4px' }}>{diagnosis.evidenceRequired.why}</div>
                        </div>
                        <div className={`epfo-status ${diagnosis.evidenceRequired.status === 'uploaded' ? 'epfo-status--verified' : diagnosis.evidenceRequired.status === 'missing' ? 'epfo-status--action-needed' : 'epfo-status--error'}`}>
                          {diagnosis.evidenceRequired.status.toUpperCase()}
                        </div>
                      </div>
                      
                      {diagnosis.evidenceRequired.canUpload && diagnosis.evidenceRequired.status !== 'uploaded' && (
                        <div style={{ marginTop: '8px' }}>
                          <button className="epfo-btn epfo-btn--secondary epfo-btn--sm">
                            <Download size={14} style={{ transform: 'rotate(180deg)' }} /> Upload Document
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--epfo-border-subtle)' }}>
                {diagnosis.resumableJourney && (
                  <Link to={diagnosis.resumableJourney.path} className="epfo-btn epfo-btn--primary">
                    {diagnosis.resumableJourney.label}
                  </Link>
                )}
                {diagnosis.supportBridge && (
                  <button 
                    className="epfo-btn epfo-btn--secondary"
                    onClick={() => {
                      if (diagnosis.supportBridge?.type === 'grievance') {
                        navigate('/grievance/draft', { 
                          state: { 
                            prefillData: diagnosis.supportBridge.prefillData,
                            requestId: id,
                            reason: diagnosis.code
                          } 
                        })
                      }
                    }}
                  >
                    {diagnosis.supportBridge.label}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Timeline</h2>
            <div className="epfo-timeline">
              {[...(request.status_history || [])].reverse().map((history: any, i: number) => {
                const isCurrent = i === 0
                return (
                  <div key={i} className={`epfo-timeline__item ${isCurrent ? 'epfo-timeline__item--current' : 'epfo-timeline__item--complete'}`}>
                    <div className="epfo-timeline__dot"></div>
                    <div className="epfo-timeline__title">{history.status.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</div>
                    <div className="epfo-timeline__meta">
                      {new Date(history.at).toLocaleString('en-IN', { 
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <div className="epfo-record" style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Request Details</h3>
              
              {request.amount_requested !== undefined && (
                <div className="epfo-record__field" style={{ marginBottom: '12px' }}>
                  <span className="epfo-record__label">Amount</span>
                  <span className="epfo-record__value">₹{request.amount_requested.toLocaleString('en-IN')}</span>
                </div>
              )}
              
              <div className="epfo-record__field" style={{ marginBottom: '12px' }}>
                <span className="epfo-record__label">Filed On</span>
                <span className="epfo-record__value">
                  {request.filed_on ? new Date(request.filed_on).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                </span>
              </div>
            </div>

            <button className="epfo-btn epfo-btn--secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <Download size={16} /> Download PDF Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
