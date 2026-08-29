import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getMember, submitKycCorrection, getRequests, diagnoseFailure } from '../services/mockData'
import { CheckCircle2, Upload, Info, AlertCircle, ShieldAlert, RefreshCw, AlertTriangle, ChevronRight } from 'lucide-react'

type KycType = 'bank' | 'pan' | 'aadhaar';

export function KYCPage() {
  const member = getMember()
  const location = useLocation()
  
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<KycType | null>(null)
  
  // Form State
  const [newValue, setNewValue] = useState('')
  const [confirmValue, setConfirmValue] = useState('')
  const [ifscCode, setIfscCode] = useState('')
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [ackId, setAckId] = useState('')
  const [hasReturnParam, setHasReturnParam] = useState(false)

  useEffect(() => {
    // Parse URL params to support deep linking from Account Health
    const params = new URLSearchParams(location.search)
    const fixParam = params.get('fix')
    
    if (fixParam && ['bank', 'pan', 'aadhaar'].includes(fixParam)) {
      setSelectedType(fixParam as KycType)
      setHasReturnParam(true)
      // Auto-jump to diagnosis step
      setStep(2)
    }
  }, [location])

  if (!member) return <div className="epfo-page">Member not found</div>

  // Check for recent failed KYC
  const allRequests = getRequests()
  const recentKyc = allRequests.find(req => req.type === 'kyc_correction' || req.title.includes('KYC'))
  const recentDiagnosis = recentKyc?.status === 'rejected' ? diagnoseFailure(recentKyc.id) : null

  const handleNext = () => setStep(s => s + 1)
  const handlePrev = () => setStep(s => Math.max(1, s - 1))

  const selectedRecord = selectedType ? member.kyc.find(k => k.type === selectedType) : null

  const getVerificationPath = (type: KycType) => {
    switch(type) {
      case 'bank': return { owner: 'Employer', desc: 'This correction requires employer verification to become active.' }
      case 'pan': return { owner: 'Income Tax Dept / EPFO', desc: 'This correction requires automated verification with the Income Tax Department, followed by EPFO review.' }
      case 'aadhaar': return { owner: 'UIDAI / EPFO', desc: 'This correction requires UIDAI demographic authentication.' }
    }
  }

  const handleSubmit = async () => {
    if (!selectedType) return
    setIsProcessing(true)
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1200))
    
    const additionalDetails = selectedType === 'bank' ? { bank_name: 'State Bank of India (Simulated)' } : undefined;
    const result = submitKycCorrection(selectedType, newValue, additionalDetails)
    
    setAckId(result.ackId)
    setIsProcessing(false)
    setStep(5)
  }

  const steps = [
    { num: 1, label: 'Select' },
    { num: 2, label: 'Diagnosis' },
    { num: 3, label: 'Edit' },
    { num: 4, label: 'Review' },
    { num: 5, label: 'Status' }
  ]

  return (
    <div className="epfo-page">
      <div className="epfo-page-header">
        <h1>Update KYC Details</h1>
        <div className="epfo-page-header__subtitle">
          Keep your identification and bank details up to date.
        </div>
      </div>

      {recentDiagnosis && (
        <div className="epfo-alert epfo-alert--error" style={{ marginBottom: '32px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>Your recent KYC update was rejected</div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>{recentDiagnosis.userFacingCause}</div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>Before submitting a new update, you should resolve this issue.</div>
            </div>
          </div>
          <Link to={`/requests/${recentKyc?.id}`} className="epfo-btn epfo-btn--sm" style={{ background: 'var(--epfo-white)', color: 'var(--epfo-error-text)', border: '1px solid var(--epfo-error-border)' }}>
            View & Fix <ChevronRight size={14} />
          </Link>
        </div>
      )}

      <div className="epfo-stepper" style={{ overflowX: 'auto', paddingBottom: '16px' }}>
        {steps.map((s, i) => (
          <div key={s.num} style={{ display: 'flex', alignItems: 'center', minWidth: i === steps.length - 1 ? 'auto' : '100px' }}>
            <div className={`epfo-stepper__step ${step === s.num ? 'epfo-stepper__step--active' : ''} ${step > s.num ? 'epfo-stepper__step--complete' : ''}`}>
              <div className="epfo-stepper__number">
                {step > s.num ? <CheckCircle2 size={16} /> : s.num}
              </div>
              <span style={{ whiteSpace: 'nowrap' }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className="epfo-stepper__connector" style={{ minWidth: '32px' }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ maxWidth: '800px' }}>
          <div className="epfo-card-grid">
            {(['bank', 'pan', 'aadhaar'] as KycType[]).map((type) => {
              const kyc = member.kyc.find(k => k.type === type)
              
              return (
                <div key={type} className="epfo-record" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="epfo-record__header">
                    <div className="epfo-record__title">{type.toUpperCase()}</div>
                    <div className={`epfo-status ${
                      kyc?.status === 'approved' ? 'epfo-status--verified' : 
                      kyc?.status === 'rejected' ? 'epfo-status--error' :
                      kyc?.status === 'pending_employer_approval' || kyc?.status === 'submitted' ? 'epfo-status--pending' : 'epfo-status--action-needed'
                    }`}>
                      {kyc?.status === 'pending_employer_approval' ? 'Pending Approval' : 
                       kyc?.status === 'submitted' ? 'Under Verification' :
                       kyc?.status === 'approved' ? 'Verified' : 
                       kyc?.status === 'rejected' ? 'Rejected' : 'Not Added'}
                    </div>
                  </div>
                  <div style={{ flex: 1, marginBottom: '24px' }}>
                    {kyc ? (
                      <>
                        <div style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '2px', fontFamily: 'monospace' }}>
                          {kyc.value_masked}
                        </div>
                        {kyc.bank_name && (
                          <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', marginTop: '4px' }}>
                            {kyc.bank_name}
                          </div>
                        )}
                        {kyc.rejection_reason && (
                          <div style={{ fontSize: '13px', color: 'var(--epfo-red)', marginTop: '8px', background: 'var(--epfo-red-light)', padding: '8px', borderRadius: '4px' }}>
                            {kyc.rejection_reason}
                          </div>
                        )}
                      </>
                    ) : (
                      <div style={{ color: 'var(--epfo-text-secondary)' }}>No detail found.</div>
                    )}
                  </div>
                  <button 
                    className="epfo-btn epfo-btn--secondary" 
                    style={{ width: '100%' }}
                    onClick={() => {
                      setSelectedType(type)
                      setHasReturnParam(false) // Not deep-linked
                      handleNext()
                    }}
                  >
                    {kyc ? 'Update' : 'Add'} {type.toUpperCase()}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {step === 2 && selectedType && (
        <div style={{ maxWidth: '600px' }}>
          {!hasReturnParam && (
            <button className="epfo-btn epfo-btn--ghost" onClick={handlePrev} style={{ padding: 0, marginBottom: '24px' }}>
              ← Back to KYC list
            </button>
          )}
          
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Diagnosis: {selectedType.toUpperCase()} Record</h2>
          
          <div style={{ background: 'var(--epfo-bg-default)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--epfo-border-subtle)', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
              {selectedRecord?.status === 'approved' ? (
                <CheckCircle2 size={24} color="var(--epfo-green)" style={{ flexShrink: 0 }} />
              ) : selectedRecord?.status === 'rejected' ? (
                <ShieldAlert size={24} color="var(--epfo-red)" style={{ flexShrink: 0 }} />
              ) : (
                <AlertCircle size={24} color="#92610A" style={{ flexShrink: 0 }} />
              )}
              
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                  {selectedRecord?.status === 'approved' ? 'Record is Verified' : 
                   selectedRecord?.status === 'rejected' ? 'Record Rejected' :
                   selectedRecord?.status === 'pending_employer_approval' || selectedRecord?.status === 'submitted' ? 'Verification Pending' :
                   'Attention Required'}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', lineHeight: 1.5 }}>
                  {selectedRecord?.status === 'approved' 
                    ? `Your ${selectedType.toUpperCase()} is already verified. If you need to update it due to a recent change, you can submit a new record.` 
                    : selectedRecord?.status === 'rejected' 
                      ? `Your previous submission was rejected: "${selectedRecord.rejection_reason}". You must submit a corrected record.`
                      : selectedRecord?.status === 'pending_employer_approval' || selectedRecord?.status === 'submitted'
                        ? `A correction is already under process. You can submit a new one which will replace the pending request.`
                        : `You have not completed the verification for your ${selectedType.toUpperCase()}.`}
                </p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--epfo-border-subtle)', paddingTop: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Why this matters</div>
              <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)' }}>
                {selectedType === 'bank' ? 'Required to receive online claim payments directly into your account.' :
                 selectedType === 'pan' ? 'Required for tax compliance on high-value withdrawals.' :
                 'Required as the primary demographic identity anchor for all services.'}
              </div>
            </div>
          </div>

          <button className="epfo-btn epfo-btn--primary" onClick={handleNext}>
            Proceed to Update
          </button>
        </div>
      )}

      {step === 3 && selectedType && (
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Enter Proposed {selectedType.toUpperCase()}</h2>
          
          {selectedRecord && (
            <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--epfo-bg-default)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)', marginBottom: '4px' }}>Current Value in Record</div>
              <div style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'monospace' }}>{selectedRecord.value_masked}</div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="epfo-form-group">
              <label htmlFor="new-value" className="epfo-form-label epfo-form-label--required">
                {selectedType === 'bank' ? 'New Bank Account Number' : `New ${selectedType.toUpperCase()} Number`}
              </label>
              <input 
                id="new-value" 
                type="text" 
                className="epfo-input" 
                placeholder={`Enter full ${selectedType} number`} 
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                autoComplete="off" 
              />
            </div>
            
            <div className="epfo-form-group">
              <label htmlFor="confirm-value" className="epfo-form-label epfo-form-label--required">
                Confirm Number
              </label>
              <input 
                id="confirm-value" 
                type="text" 
                className="epfo-input" 
                placeholder="Re-enter to confirm" 
                value={confirmValue}
                onChange={(e) => setConfirmValue(e.target.value)}
                autoComplete="off" 
              />
              {confirmValue && newValue !== confirmValue && (
                <div style={{ fontSize: '13px', color: 'var(--epfo-red)', marginTop: '4px' }}>Values do not match.</div>
              )}
            </div>

            {selectedType === 'bank' && (
              <div className="epfo-form-group">
                <label htmlFor="kyc-ifsc" className="epfo-form-label epfo-form-label--required">Bank IFSC Code</label>
                <input 
                  id="kyc-ifsc" 
                  type="text" 
                  className="epfo-input" 
                  placeholder="e.g. SBIN0001234" 
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  autoComplete="off" 
                />
              </div>
            )}

            <div className="epfo-form-group" style={{ marginTop: '12px' }}>
              <label htmlFor="kyc-proof" className="epfo-form-label">Upload Evidence Document (Required)</label>
              <div style={{ 
                border: '2px dashed var(--epfo-border-default)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '32px', 
                textAlign: 'center',
                cursor: 'pointer',
                background: 'var(--epfo-bg-default)'
              }}>
                <Upload size={24} color="var(--epfo-text-secondary)" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '14px', fontWeight: 500 }}>
                  {selectedType === 'bank' ? 'Upload cancelled cheque or passbook' : `Upload scanned copy of ${selectedType.toUpperCase()}`}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)', marginTop: '4px' }}>JPG, PNG or PDF (Max 2MB)</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            <button className="epfo-btn epfo-btn--secondary" onClick={handlePrev}>Back</button>
            <button 
              className="epfo-btn epfo-btn--primary" 
              onClick={handleNext}
              disabled={!newValue || newValue !== confirmValue || (selectedType === 'bank' && !ifscCode)}
            >
              Review Change
            </button>
          </div>
        </div>
      )}

      {step === 4 && selectedType && (
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Review Correction</h2>
          
          <div className="epfo-review" style={{ marginBottom: '24px' }}>
            <div className="epfo-review__header" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Proposed Changes</h3>
              <button className="epfo-btn epfo-btn--ghost" style={{ padding: 0, height: 'auto', fontSize: '14px' }} onClick={handlePrev}>Edit</button>
            </div>
            <div className="epfo-review__body">
              <div className="epfo-review__row" style={{ alignItems: 'center' }}>
                <span className="epfo-review__row-label" style={{ width: '120px' }}>Current</span>
                <span className="epfo-review__row-value" style={{ color: 'var(--epfo-text-secondary)', textDecoration: 'line-through' }}>
                  {selectedRecord?.value_masked || 'None'}
                </span>
              </div>
              <div className="epfo-review__row" style={{ alignItems: 'center', background: 'var(--epfo-green-light)', padding: '8px', margin: '0 -8px', borderRadius: '4px' }}>
                <span className="epfo-review__row-label" style={{ width: '120px' }}>Proposed</span>
                <span className="epfo-review__row-value" style={{ fontWeight: 600, fontFamily: 'monospace' }}>
                  {newValue}
                </span>
              </div>
              {selectedType === 'bank' && (
                <div className="epfo-review__row">
                  <span className="epfo-review__row-label" style={{ width: '120px' }}>Proposed IFSC</span>
                  <span className="epfo-review__row-value">{ifscCode}</span>
                </div>
              )}
            </div>
          </div>

          <div className="epfo-alert epfo-alert--info" style={{ marginBottom: '32px' }}>
            <div className="epfo-alert__icon"><Info size={20} /></div>
            <div className="epfo-alert__content">
              <strong>Verification Path: {getVerificationPath(selectedType).owner}</strong><br/>
              {getVerificationPath(selectedType).desc}
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '32px', cursor: 'pointer' }}>
            <input type="checkbox" style={{ marginTop: '4px', transform: 'scale(1.2)' }} required />
            <span style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--epfo-text-secondary)' }}>
              I hereby declare that the proposed details are true and correct. I authorize EPFO to verify these details.
            </span>
          </label>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="epfo-btn epfo-btn--secondary" onClick={handlePrev} disabled={isProcessing}>Back</button>
            <button className="epfo-btn epfo-btn--primary" onClick={handleSubmit} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <RefreshCw size={18} className="epfo-spin" style={{ marginRight: '8px' }} /> Processing...
                </>
              ) : 'Submit Correction'}
            </button>
          </div>
        </div>
      )}

      {step === 5 && selectedType && (
        <div className="epfo-confirmation" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="epfo-confirmation__icon" style={{ margin: '0 auto 24px' }}>
            <CheckCircle2 size={48} color="var(--epfo-green)" />
          </div>
          <h2 className="epfo-confirmation__title" style={{ fontSize: '24px' }}>Correction Submitted</h2>
          <p className="epfo-confirmation__subtitle" style={{ fontSize: '16px', marginBottom: '32px' }}>
            Your KYC update request has been generated successfully.
          </p>

          <div style={{ background: 'var(--epfo-white)', border: '1px solid var(--epfo-border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px', textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', marginBottom: '8px' }}>Reference Number</div>
            <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--epfo-primary)', marginBottom: '24px' }}>
              {ackId}
            </div>
            
            <div style={{ borderTop: '1px solid var(--epfo-border-subtle)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span style={{ color: 'var(--epfo-text-secondary)' }}>Status:</span>
                <span style={{ fontWeight: 600 }}>{selectedType === 'bank' ? 'Pending Employer Approval' : 'Under Verification'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span style={{ color: 'var(--epfo-text-secondary)' }}>Submitted On:</span>
                <span style={{ fontWeight: 600 }}>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--epfo-text-secondary)' }}>Pending With:</span>
                <span style={{ fontWeight: 600 }}>{getVerificationPath(selectedType).owner}</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            {hasReturnParam ? (
              <Link to="/account/health" className="epfo-btn epfo-btn--primary">Return to Account Health</Link>
            ) : (
              <Link to={`/requests/${ackId}`} className="epfo-btn epfo-btn--primary">Track Status</Link>
            )}
            <button onClick={() => {
              setStep(1);
              setSelectedType(null);
              setNewValue('');
              setConfirmValue('');
              setIfscCode('');
            }} className="epfo-btn epfo-btn--secondary">More Corrections</button>
          </div>
        </div>
      )}
    </div>
  )
}


