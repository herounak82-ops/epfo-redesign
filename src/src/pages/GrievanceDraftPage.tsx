import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, ShieldAlert, Send } from 'lucide-react'

export function GrievanceDraftPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { prefillData, requestId, reason } = location.state || {}

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ackId, setAckId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate network delay
    setTimeout(() => {
      const ts = new Date().getTime().toString().slice(-6)
      setAckId(`GRV-${ts}`)
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1200)
  }

  if (isSubmitted) {
    return (
      <div className="epfo-page">
        <div className="epfo-confirmation" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginTop: '48px' }}>
          <div className="epfo-confirmation__icon" style={{ margin: '0 auto 24px' }}>
            <CheckCircle2 size={48} color="var(--epfo-green)" />
          </div>
          <h2 className="epfo-confirmation__title" style={{ fontSize: '24px' }}>Grievance Submitted</h2>
          <p className="epfo-confirmation__subtitle" style={{ fontSize: '16px', marginBottom: '32px' }}>
            Your grievance related to request {requestId} has been filed successfully.
          </p>

          <div style={{ background: 'var(--epfo-white)', border: '1px solid var(--epfo-border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px', textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', marginBottom: '8px' }}>Grievance Registration Number</div>
            <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--epfo-primary)', marginBottom: '24px' }}>
              {ackId}
            </div>
            
            <div style={{ borderTop: '1px solid var(--epfo-border-subtle)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span style={{ color: 'var(--epfo-text-secondary)' }}>Category:</span>
                <span style={{ fontWeight: 600, textAlign: 'right' }}>{prefillData?.category || 'General'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span style={{ color: 'var(--epfo-text-secondary)' }}>Routed to:</span>
                <span style={{ fontWeight: 600, textAlign: 'right' }}>{prefillData?.entity || 'EPFO Field Office'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--epfo-text-secondary)' }}>Current State:</span>
                <span style={{ fontWeight: 600 }}>Under Review</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button className="epfo-btn epfo-btn--primary" onClick={() => navigate('/requests')}>Track Status</button>
            <button className="epfo-btn epfo-btn--secondary" onClick={() => navigate(`/requests/${requestId}`)}>Return to Request</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="epfo-page">
      <button onClick={() => navigate(-1)} className="epfo-btn epfo-btn--ghost" style={{ padding: 0, marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ maxWidth: '700px' }}>
        <div className="epfo-page-header" style={{ marginBottom: '32px' }}>
          <h1>Draft Grievance</h1>
          <div className="epfo-page-header__subtitle">
            Escalate an issue regarding your failed request.
          </div>
        </div>

        <div className="epfo-alert epfo-alert--warning" style={{ marginBottom: '32px' }}>
          <div className="epfo-alert__icon"><ShieldAlert size={20} /></div>
          <div className="epfo-alert__content">
            <strong>DEMO MODE</strong><br/>
            This is a simulated grievance draft. Submitting this form will not actually send data to the EPFiGMS portal.
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'var(--epfo-bg-default)', padding: '32px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--epfo-border-subtle)' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Related Request Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'var(--epfo-bg-subtle)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--epfo-text-secondary)', marginBottom: '4px' }}>Request ID</div>
                <div className="mono" style={{ fontWeight: 500 }}>{requestId || 'N/A'}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--epfo-text-secondary)', marginBottom: '4px' }}>Rejection Reason</div>
                <div style={{ fontWeight: 500 }}>{reason || 'N/A'}</div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="grievance-category" style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
              Grievance Category
            </label>
            <input 
              id="grievance-category"
              type="text" 
              className="epfo-input" 
              value={prefillData?.category || 'Request Escalation'} 
              readOnly 
              style={{ background: 'var(--epfo-bg-subtle)' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="responsible-entity" style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
              Responsible Entity
            </label>
            <input 
              id="responsible-entity"
              type="text" 
              className="epfo-input" 
              value={prefillData?.entity || 'EPFO'} 
              readOnly 
              style={{ background: 'var(--epfo-bg-subtle)' }}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label htmlFor="additional-details" style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
              Additional Details (Optional)
            </label>
            <textarea 
              id="additional-details"
              className="epfo-input" 
              rows={4} 
              placeholder="Provide any additional information that might help resolve this issue faster..."
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button type="submit" className="epfo-btn epfo-btn--primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : (
                <><Send size={16} /> Submit Grievance</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
