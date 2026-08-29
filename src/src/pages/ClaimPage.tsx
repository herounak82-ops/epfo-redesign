import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMember, getAccountHealth, checkClaimEligibility, submitMockClaim, formatCurrency, diagnoseFailure } from '../services/mockData'
import { AlertCircle, CheckCircle2, Upload, Info, AlertTriangle, ChevronRight } from 'lucide-react'

export function ClaimPage() {
  const [step, setStep] = useState<number>(1)
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Form State
  const [selectedClaimType, setSelectedClaimType] = useState<string>('')
  const [claimAmount, setClaimAmount] = useState<string>('')
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [ackId, setAckId] = useState('')

  const member = getMember()
  const health = getAccountHealth()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  if (!member) return <div className="epfo-page">Member not found</div>

  // Check for recent failed claim
  const recentClaim = member.claims.length > 0 ? member.claims[0] : null
  const recentDiagnosis = recentClaim?.status === 'rejected' ? diagnoseFailure(recentClaim.claim_id_masked) : null

  // Step 1: Readiness Check
  const isReady = health.filter(h => 
    (h.id === 'aadhaar' || h.id === 'pan' || h.id === 'bank' || h.id === 'uan' || h.id === 'date_of_exit') && 
    (h.status === 'action_needed' || h.status === 'error')
  ).length === 0

  // Step 2: Eligibility
  const eligibility = checkClaimEligibility()
  
  // Handlers
  const handleNext = () => setStep(s => s + 1)
  const handlePrev = () => setStep(s => Math.max(1, s - 1))

  const handleVerifyOTP = async () => {
    if (otp !== '123456') {
      setOtpError('Invalid OTP. Please enter 123456 for demo.')
      return
    }
    setOtpError('')
    setIsProcessing(true)
    
    // Simulate service delay
    await new Promise(r => setTimeout(r, 1000))
    
    const typeLabel = eligibility.eligibleTypes.find(t => t.id === selectedClaimType)?.label || 'Claim'
    const result = submitMockClaim(typeLabel, 'Demo submission', Number(claimAmount) || 0)
    
    setAckId(result.ackId)
    setIsProcessing(false)
    setStep(6)
  }

  const steps = [
    { num: 1, label: 'Readiness' },
    { num: 2, label: 'Eligibility' },
    { num: 3, label: 'Details' },
    { num: 4, label: 'Review' },
    { num: 5, label: 'Verify' },
    { num: 6, label: 'Status' }
  ]

  return (
    <div className="epfo-page">
      <div className="epfo-page-header">
        <h1>Get PF Money</h1>
        <div className="epfo-page-header__subtitle">
          Withdraw funds or apply for advances.
        </div>
      </div>

      {recentDiagnosis && (
        <div className="epfo-alert epfo-alert--error" style={{ marginBottom: '32px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>Your recent claim was rejected</div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>{recentDiagnosis.userFacingCause}</div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>Before submitting a new claim, you should resolve this issue.</div>
            </div>
          </div>
          <Link to={`/requests/${recentClaim?.claim_id_masked}`} className="epfo-btn epfo-btn--sm" style={{ background: 'var(--epfo-white)', color: 'var(--epfo-error-text)', border: '1px solid var(--epfo-error-border)' }}>
            View & Fix <ChevronRight size={14} />
          </Link>
        </div>
      )}

      <div className="epfo-stepper" style={{ overflowX: 'auto', paddingBottom: '16px' }}>
        {steps.map((s, i) => (
          <div key={s.num} style={{ display: 'flex', alignItems: 'center', minWidth: i === steps.length - 1 ? 'auto' : '120px' }}>
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
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Account Readiness Check</h2>
          <p style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', marginBottom: '24px' }}>
            We check your account to ensure your claim won't be rejected for missing details.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {health.filter(h => h.id === 'aadhaar' || h.id === 'pan' || h.id === 'bank' || h.id === 'uan' || h.id === 'date_of_exit').map(h => (
              <div key={h.id} className="epfo-record" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
                {h.status === 'verified' || h.status === 'not_applicable' ? (
                  <CheckCircle2 size={24} color="var(--epfo-green)" />
                ) : (
                  <AlertCircle size={24} color="var(--epfo-red)" />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '15px' }}>{h.label}</div>
                  <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)' }}>{h.explanation}</div>
                </div>
                {h.status !== 'verified' && h.status !== 'not_applicable' && (
                  <Link to={h.id === 'date_of_exit' ? '/help' : '/services/kyc'} className="epfo-btn epfo-btn--secondary epfo-btn--sm">See how to fix</Link>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              className="epfo-btn epfo-btn--primary" 
              onClick={() => {
                // If the mock user data changes and no claim types are eligible, we will handle that in step 2.
                // But for safety, we only let them pass if they are ready.
                setIsProcessing(true)
                setTimeout(() => {
                  setIsProcessing(false)
                  handleNext()
                }, 600)
              }}
              disabled={!isReady || isProcessing}
            >
              {isProcessing ? 'Checking...' : 'Continue'}
            </button>
            {!isReady && (
              <div className="epfo-alert epfo-alert--error" style={{ flex: 1, padding: '10px 16px', margin: 0 }}>
                You must resolve the missing prerequisites before continuing.
              </div>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>What do you want to do?</h2>
          
          {!eligibility.isEligible ? (
             <div className="epfo-alert epfo-alert--error" style={{ marginBottom: '24px' }}>
               <div className="epfo-alert__icon"><AlertCircle size={20} /></div>
               <div className="epfo-alert__content">
                 <strong>You are currently not eligible for online claims.</strong>
                 <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                   {eligibility.blockers.map((b, i) => <li key={i}>{b}</li>)}
                 </ul>
               </div>
             </div>
          ) : (
            <>
              <p style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', marginBottom: '24px' }}>
                Based on your service history, you are eligible for the following options:
              </p>
              
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend className="sr-only">Select a claim type</legend>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {eligibility.eligibleTypes.map(type => (
                    <label key={type.id} htmlFor={`claim-type-${type.id}`} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '16px', 
                      padding: '20px', 
                      border: `2px solid ${selectedClaimType === type.id ? 'var(--epfo-primary)' : 'var(--epfo-border-subtle)'}`, 
                      borderRadius: 'var(--radius-lg)', 
                      background: selectedClaimType === type.id ? 'var(--epfo-primary-surface)' : 'var(--epfo-white)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                      <input 
                        type="radio" 
                        id={`claim-type-${type.id}`} 
                        name="claim_type" 
                        value={type.id}
                        checked={selectedClaimType === type.id}
                        onChange={(e) => setSelectedClaimType(e.target.value)}
                        style={{ marginTop: '4px', transform: 'scale(1.2)' }} 
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>{type.label}</div>
                        <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)' }}>{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="epfo-btn epfo-btn--secondary" onClick={handlePrev}>Back</button>
            <button 
              className="epfo-btn epfo-btn--primary" 
              onClick={() => {
                setIsProcessing(true)
                setTimeout(() => {
                  setIsProcessing(false)
                  handleNext()
                }, 500)
              }}
              disabled={!selectedClaimType || !eligibility.isEligible || isProcessing}
            >
              {isProcessing ? 'Loading...' : 'Continue'}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Claim Details</h2>
          
          <div className="epfo-form-group">
            <label htmlFor="claim-amount" className="epfo-form-label epfo-form-label--required">Amount Required (₹)</label>
            <input 
              id="claim-amount" 
              type="number" 
              className="epfo-input" 
              placeholder="e.g. 50000" 
              value={claimAmount}
              onChange={(e) => setClaimAmount(e.target.value)}
            />
            <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)', marginTop: '8px' }}>
              Your current total EPF balance is <strong>{formatCurrency(member.employments.reduce((sum, e) => sum + e.current_epf_balance, 0))}</strong>.
              The final approved amount will be calculated by the EPFO office based on rules.
            </div>
          </div>

          <div className="epfo-form-group" style={{ marginTop: '32px' }}>
            <label htmlFor="upload-proof" className="epfo-form-label">Upload Evidence (Optional for amounts &lt; ₹1,00,000)</label>
            <div style={{ 
              border: '2px dashed var(--epfo-border-default)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '32px', 
              textAlign: 'center',
              cursor: 'pointer',
              background: 'var(--epfo-bg-default)'
            }}>
              <Upload size={24} color="var(--epfo-text-secondary)" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--epfo-text-primary)' }}>Click to upload document</div>
              <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)', marginTop: '4px' }}>PDF only (Max 2MB)</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
            <button className="epfo-btn epfo-btn--secondary" onClick={handlePrev}>Back</button>
            <button 
              className="epfo-btn epfo-btn--primary" 
              onClick={handleNext}
              disabled={!claimAmount}
            >
              Review Details
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Review Claim</h2>
          
          <div className="epfo-alert epfo-alert--info" style={{ marginBottom: '24px' }}>
            <div className="epfo-alert__icon"><Info size={16} /></div>
            <div className="epfo-alert__content">
              Please ensure all details are correct. You cannot change them after submission.
            </div>
          </div>

          <div className="epfo-review" style={{ marginBottom: '32px' }}>
            <div className="epfo-review__header" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Claim Summary</h3>
              <button className="epfo-btn epfo-btn--ghost" style={{ padding: 0, height: 'auto', fontSize: '14px' }} onClick={() => setStep(2)}>Edit</button>
            </div>
            <div className="epfo-review__body">
              <div className="epfo-review__row">
                <span className="epfo-review__row-label">Claim Type</span>
                <span className="epfo-review__row-value">{eligibility.eligibleTypes.find(t => t.id === selectedClaimType)?.label}</span>
              </div>
              <div className="epfo-review__row">
                <span className="epfo-review__row-label">Amount Requested</span>
                <span className="epfo-review__row-value">{formatCurrency(Number(claimAmount))}</span>
              </div>
            </div>
            
            <div className="epfo-review__header" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--epfo-border-subtle)', marginTop: '16px', paddingTop: '16px' }}>
              <h3>Bank & KYC Details</h3>
              <Link to="/services/kyc" className="epfo-btn epfo-btn--ghost" style={{ padding: 0, height: 'auto', fontSize: '14px' }}>Update KYC</Link>
            </div>
            <div className="epfo-review__body">
              <div className="epfo-review__row">
                <span className="epfo-review__row-label">Aadhaar</span>
                <span className="epfo-review__row-value">{member.kyc.find(k => k.type === 'aadhaar')?.value_masked}</span>
              </div>
              <div className="epfo-review__row">
                <span className="epfo-review__row-label">Crediting Bank</span>
                <span className="epfo-review__row-value">{member.kyc.find(k => k.type === 'bank')?.value_masked}</span>
              </div>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '32px', cursor: 'pointer' }}>
            <input type="checkbox" style={{ marginTop: '4px', transform: 'scale(1.2)' }} required />
            <span style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--epfo-text-secondary)' }}>
              I declare that the information provided is correct. I authorize EPFO to process this claim based on the verified bank details and Aadhaar authentication.
            </span>
          </label>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="epfo-btn epfo-btn--secondary" onClick={handlePrev}>Back</button>
            <button className="epfo-btn epfo-btn--primary" onClick={handleNext}>Proceed to Verify</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div style={{ maxWidth: '480px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Aadhaar OTP Verification</h2>
          <p style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
            An OTP has been sent to your Aadhaar-linked mobile number ending in <strong>{member.contact.mobile_masked.slice(-4)}</strong>.
          </p>

          {otpError && (
            <div className="epfo-alert epfo-alert--error" style={{ marginBottom: '24px' }}>
              <div className="epfo-alert__content">{otpError}</div>
            </div>
          )}

          <div className="epfo-form-group">
            <label htmlFor="otp" className="epfo-form-label epfo-form-label--required">Enter OTP</label>
            <input 
              id="otp" 
              type="text" 
              className="epfo-input" 
              placeholder="e.g. 123456" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              autoComplete="off"
              style={{ fontSize: '20px', letterSpacing: '4px', textAlign: 'center' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)' }}>
              Resend OTP in 00:59
            </div>
            <button className="epfo-link" style={{ fontSize: '13px' }} disabled>Resend</button>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="epfo-btn epfo-btn--secondary" onClick={handlePrev} disabled={isProcessing}>Cancel</button>
            <button 
              className="epfo-btn epfo-btn--primary" 
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || isProcessing}
              style={{ flex: 1 }}
            >
              {isProcessing ? 'Verifying & Submitting...' : 'Submit Claim'}
            </button>
          </div>
          
          <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--epfo-text-secondary)', textAlign: 'center' }}>
            <strong>Demo:</strong> Enter 123456 to pass verification.
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="epfo-confirmation" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="epfo-confirmation__icon" style={{ margin: '0 auto 24px' }}>
            <CheckCircle2 size={48} color="var(--epfo-green)" />
          </div>
          <h2 className="epfo-confirmation__title" style={{ fontSize: '24px' }}>Claim Submitted Successfully</h2>
          <p className="epfo-confirmation__subtitle" style={{ fontSize: '16px', marginBottom: '32px' }}>
            Your claim has been successfully received by the EPFO portal.
          </p>

          <div style={{ background: 'var(--epfo-white)', border: '1px solid var(--epfo-border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px', textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', marginBottom: '8px' }}>Acknowledgement Number</div>
            <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--epfo-primary)', marginBottom: '24px' }}>
              {ackId}
            </div>
            
            <div style={{ borderTop: '1px solid var(--epfo-border-subtle)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span style={{ color: 'var(--epfo-text-secondary)' }}>Status:</span>
                <span style={{ fontWeight: 600 }}>Under Process</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span style={{ color: 'var(--epfo-text-secondary)' }}>Submitted On:</span>
                <span style={{ fontWeight: 600 }}>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--epfo-text-secondary)' }}>Next Expected State:</span>
                <span style={{ fontWeight: 600 }}>Field Office Review</span>
              </div>
            </div>
          </div>
          
          <div className="epfo-alert epfo-alert--info" style={{ textAlign: 'left', marginBottom: '32px' }}>
            <div className="epfo-alert__icon"><Info size={16} /></div>
            <div className="epfo-alert__content">
              <strong>What happens next?</strong><br/>
              Your claim will be verified by the dealing hand. Online PF withdrawal claims are typically settled within 3 to 7 working days. You will receive an SMS when the status changes.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to={`/requests/${ackId}`} className="epfo-btn epfo-btn--primary">Track Status</Link>
            <Link to="/" className="epfo-btn epfo-btn--secondary">Back to Home</Link>
          </div>
        </div>
      )}
    </div>
  )
}
