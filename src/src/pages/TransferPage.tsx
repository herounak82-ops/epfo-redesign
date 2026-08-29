import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getMember, submitMockTransfer, TRANSFER_DEMO_CITIZEN_ID, getTransferReadiness, getRequests, diagnoseFailure } from '../services/mockData'
import { ArrowLeftRight, CheckCircle2, ChevronRight, RefreshCw, AlertCircle, ShieldAlert, Info, AlertTriangle } from 'lucide-react'
import type { TransferReadiness } from '../services/types'

type DemoScenario = 'ready' | 'missing_doe' | 'kyc_blocked' | 'transferred' | 'multiple_uan'

export function TransferPage() {
  const [scenario, setScenario] = useState<DemoScenario>('ready')
  const location = useLocation()
  
  // Use CIT-006 if we want to show already transferred, otherwise use CIT-016
  const memberId = scenario === 'transferred' ? 'CIT-006' : TRANSFER_DEMO_CITIZEN_ID
  const member = getMember(memberId)

  const [step, setStep] = useState(1)
  const [selectedEmploymentCode, setSelectedEmploymentCode] = useState<string | null>(null)
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [ackId, setAckId] = useState('')
  const [readiness, setReadiness] = useState<TransferReadiness | null>(null)

  useEffect(() => {
    // Check for deep link scenario
    const params = new URLSearchParams(location.search)
    const urlScenario = params.get('scenario')
    if (urlScenario && ['ready', 'missing_doe', 'kyc_blocked', 'transferred'].includes(urlScenario)) {
      setScenario(urlScenario as DemoScenario)
      // Auto-jump to readiness check if we came from Account Health blocked
      if (urlScenario === 'missing_doe' || urlScenario === 'kyc_blocked') {
        const citizen = getMember(TRANSFER_DEMO_CITIZEN_ID)
        if (citizen) {
          const pastEmps = citizen.employments.filter(e => e.employment_status === 'closed')
          if (pastEmps.length > 0) {
            setSelectedEmploymentCode(pastEmps[0].establishment.establishment_code)
            setStep(3) // Jump to readiness check
          }
        }
      }
    }
  }, [location])

  // Update readiness when selected employment or scenario changes
  useEffect(() => {
    if (selectedEmploymentCode) {
      setReadiness(getTransferReadiness(memberId, selectedEmploymentCode, scenario === 'transferred' ? 'ready' : scenario))
    }
  }, [selectedEmploymentCode, scenario, memberId])

  if (!member) return <div className="epfo-page">Member not found</div>

  // Check for recent failed transfer
  const allRequests = getRequests(memberId)
  const recentTransfer = allRequests.find(req => req.type === 'transfer' || req.title.includes('Transfer'))
  const recentDiagnosis = recentTransfer?.status === 'rejected' ? diagnoseFailure(recentTransfer.id) : null

  const pastEmployments = member.employments.filter(e => e.employment_status === 'closed')
  const currentEmployment = member.employments.find(e => e.employment_status === 'current')
  
  const selectedEmployment = pastEmployments.find(e => e.establishment.establishment_code === selectedEmploymentCode)

  const handleNext = () => setStep(s => s + 1)
  const handlePrev = () => setStep(s => Math.max(1, s - 1))

  const handleSubmit = async () => {
    if (!selectedEmploymentCode) return
    setIsProcessing(true)
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1000))
    
    const result = submitMockTransfer(memberId, selectedEmploymentCode)
    
    if (result.success && result.transfer) {
      setAckId(result.transfer.ack_id)
      setIsProcessing(false)
      setStep(6)
    }
  }

  const steps = [
    { num: 1, label: 'Goal' },
    { num: 2, label: 'Account' },
    { num: 3, label: 'Readiness' },
    { num: 4, label: 'Review' },
    { num: 5, label: 'Confirm' }
  ]

  return (
    <div className="epfo-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div className="epfo-page-header" style={{ marginBottom: '24px' }}>
          <h1>Move PF to Current Employer</h1>
          <div className="epfo-page-header__subtitle">
            Transfer your provident fund and service history from a previous job.
          </div>
        </div>
        
        {/* Demo Switcher */}
        <div className="epfo-demo-switcher">
          <label style={{ fontWeight: 600 }}>Demo Scenario:</label>
          <select value={scenario} onChange={(e) => {
            setScenario(e.target.value as DemoScenario)
            setStep(1)
            setSelectedEmploymentCode(null)
          }}>
            <option value="ready">Ready to Transfer (CIT-016)</option>
            <option value="missing_doe">Blocked: Missing Date of Exit</option>
            <option value="kyc_blocked">Blocked: KYC / Bank Pending</option>
            <option value="transferred">Already Transferred (CIT-006)</option>
            <option value="multiple_uan">Multiple UANs Found</option>
          </select>
        </div>
      </div>

      {recentDiagnosis && (
        <div className="epfo-alert epfo-alert--error" style={{ marginBottom: '32px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>Your recent transfer was rejected</div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>{recentDiagnosis.userFacingCause}</div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>Before submitting a new transfer, you should resolve this issue.</div>
            </div>
          </div>
          <Link to={`/requests/${recentTransfer?.id}`} className="epfo-btn epfo-btn--sm" style={{ background: 'var(--epfo-white)', color: 'var(--epfo-error-text)', border: '1px solid var(--epfo-error-border)' }}>
            View & Fix <ChevronRight size={14} />
          </Link>
        </div>
      )}

      {step <= 5 && (
        <div className="epfo-stepper" style={{ overflowX: 'auto', paddingBottom: '16px', marginBottom: '32px' }}>
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
      )}

      {/* Step 1: Goal Intro */}
      {step === 1 && (
        <div style={{ maxWidth: '700px' }}>
          <div style={{ background: 'var(--epfo-bg-default)', borderRadius: 'var(--radius-xl)', padding: '32px', marginBottom: '32px', border: '1px solid var(--epfo-border-subtle)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Keep your PF and pension continuous</h2>
            <p style={{ fontSize: '16px', color: 'var(--epfo-text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              When you change jobs, your PF doesn't automatically move to your new employer. By transferring your account, you ensure:
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', paddingLeft: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="var(--epfo-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--epfo-text-primary)' }}>Consolidated savings</strong>
                  <span style={{ color: 'var(--epfo-text-secondary)', fontSize: '14px' }}>All your EPF money earns interest together in one active account.</span>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="var(--epfo-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--epfo-text-primary)' }}>Continuous pension service</strong>
                  <span style={{ color: 'var(--epfo-text-secondary)', fontSize: '14px' }}>Your service months are added together. 10 years of total service makes you eligible for a lifetime pension.</span>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="var(--epfo-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--epfo-text-primary)' }}>Easier future withdrawals</strong>
                  <span style={{ color: 'var(--epfo-text-secondary)', fontSize: '14px' }}>You won't have to manage multiple member IDs when you need to make a claim.</span>
                </div>
              </li>
            </ul>
            
            <button className="epfo-btn epfo-btn--primary epfo-btn--lg" onClick={handleNext}>
              Find previous accounts <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Account Selection */}
      {step === 2 && (
        <div style={{ maxWidth: '800px' }}>
          <button className="epfo-btn epfo-btn--ghost" onClick={handlePrev} style={{ padding: 0, marginBottom: '24px' }}>
            ← Back
          </button>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Select Account to Transfer From</h2>
          
          {scenario === 'multiple_uan' ? (
            <div className="epfo-alert epfo-alert--info" style={{ marginBottom: '24px' }}>
              <div className="epfo-alert__icon"><Info size={20} /></div>
              <div className="epfo-alert__content">
                <strong>We found more than one EPFO account connected to your employment history.</strong><br/>
                These accounts may be linked to different UANs or old Member IDs. Please identify the correct previous employment to continue the transfer into your current active UAN ({member.uan_masked}).
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--epfo-text-secondary)', marginBottom: '24px' }}>
              We found {pastEmployments.length} previous employment record{pastEmployments.length !== 1 ? 's' : ''} linked to your UAN ({member.uan_masked}).
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pastEmployments.map(emp => {
              const isSelected = selectedEmploymentCode === emp.establishment.establishment_code;
              const isTransferred = emp.transfer_status === 'transferred' || emp.transfer_status === 'transferred_to_current_member';
              
              return (
                <div 
                  key={emp.establishment.establishment_code}
                  className={`epfo-emp-card ${isSelected ? 'epfo-emp-card--selected' : ''} ${isTransferred ? 'epfo-emp-card--transferred' : ''}`}
                  onClick={() => !isTransferred && setSelectedEmploymentCode(emp.establishment.establishment_code)}
                  role="button"
                  tabIndex={isTransferred ? -1 : 0}
                  onKeyDown={(e) => {
                    if (!isTransferred && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      setSelectedEmploymentCode(emp.establishment.establishment_code);
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--epfo-text-primary)', marginBottom: '4px' }}>
                        {emp.establishment.name.replace(' (synthetic)', '')}
                      </h3>
                      <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)' }}>
                        Member ID: <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>{emp.member_id_masked}</span>
                      </div>
                    </div>
                    {isTransferred ? (
                      <div className="epfo-status epfo-status--verified">Already Transferred</div>
                    ) : (
                      <div className="epfo-status epfo-status--neutral">Available</div>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid var(--epfo-border-subtle)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--epfo-text-secondary)', fontWeight: 600 }}>Period</span>
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>
                        {new Date(emp.date_of_joining).getFullYear()} – {emp.date_of_exit ? new Date(emp.date_of_exit).getFullYear() : 'Present'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--epfo-text-secondary)', fontWeight: 600 }}>PF Balance</span>
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>₹{emp.current_epf_balance.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--epfo-text-secondary)', fontWeight: 600 }}>Service Record</span>
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>{emp.eps_service_months} months</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            <button 
              className="epfo-btn epfo-btn--primary" 
              onClick={handleNext}
              disabled={!selectedEmploymentCode}
            >
              Continue with selected account
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Readiness Check */}
      {step === 3 && selectedEmployment && readiness && (
        <div style={{ maxWidth: '800px' }}>
          <button className="epfo-btn epfo-btn--ghost" onClick={handlePrev} style={{ padding: 0, marginBottom: '24px' }}>
            ← Back
          </button>
          
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Checking Transfer Readiness</h2>
            <p style={{ color: 'var(--epfo-text-secondary)' }}>
              We are verifying if this account is ready to be transferred to {currentEmployment?.establishment.name.replace(' (synthetic)', '') || 'your current employer'}.
            </p>
          </div>

          {readiness.blockerCount > 0 ? (
            <div className="epfo-alert epfo-alert--error" style={{ marginBottom: '24px' }}>
              <div className="epfo-alert__icon"><ShieldAlert size={20} /></div>
              <div className="epfo-alert__content">
                <div className="epfo-alert__title">Action Required</div>
                <div>{readiness.blockerCount} issue{readiness.blockerCount > 1 ? 's' : ''} must be resolved before you can transfer this account.</div>
              </div>
            </div>
          ) : (
            <div className="epfo-alert epfo-alert--success" style={{ marginBottom: '24px' }}>
              <div className="epfo-alert__icon"><CheckCircle2 size={20} /></div>
              <div className="epfo-alert__content">
                <div className="epfo-alert__title">Ready to Transfer</div>
                <div>All checks passed. You can proceed with the transfer request.</div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {readiness.checks.map(check => (
              <div key={check.id} className={`epfo-readiness-check epfo-readiness-check--${check.status}`}>
                <div className="epfo-readiness-check__icon">
                  {check.status === 'ready' ? <CheckCircle2 size={20} color="var(--epfo-green)" /> :
                   check.status === 'blocked' ? <AlertCircle size={20} color="var(--epfo-red)" /> :
                   <AlertCircle size={20} color="#92610A" />}
                </div>
                <div className="epfo-readiness-check__content">
                  <div className="epfo-readiness-check__header">
                    <div className="epfo-readiness-check__label">{check.label}</div>
                    <div className={`epfo-status epfo-status--${check.status === 'ready' ? 'verified' : check.status === 'blocked' ? 'error' : 'action-needed'}`}>
                      {check.statusLabel}
                    </div>
                  </div>
                  
                  {check.status === 'blocked' && check.what ? (
                    <>
                      <div className="epfo-readiness-check__explanation">{check.what}</div>
                      <div className="epfo-readiness-check__blocker-detail">
                        <div className="epfo-readiness-check__blocker-row">
                          <span className="epfo-readiness-check__blocker-key">Why</span>
                          <span className="epfo-readiness-check__blocker-val">{check.why}</span>
                        </div>
                        <div className="epfo-readiness-check__blocker-row">
                          <span className="epfo-readiness-check__blocker-key">Who</span>
                          <span className="epfo-readiness-check__blocker-val">{check.who}</span>
                        </div>
                        <div className="epfo-readiness-check__blocker-row" style={{ marginTop: '8px' }}>
                          <span className="epfo-readiness-check__blocker-key">Next</span>
                          <span className="epfo-readiness-check__blocker-val" style={{ fontWeight: 500 }}>{check.next}</span>
                        </div>
                        {check.fixPath && (
                          <div style={{ marginTop: '12px' }}>
                            <Link to={check.fixPath} className="epfo-btn epfo-btn--secondary epfo-btn--sm">
                              Resolve issue <ChevronRight size={14} />
                            </Link>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="epfo-readiness-check__explanation">{check.explanation}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="epfo-btn epfo-btn--primary" onClick={handleNext} disabled={!readiness.isReady}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Employment Continuity & Review */}
      {step === 4 && selectedEmployment && currentEmployment && (
        <div style={{ maxWidth: '800px' }}>
          <button className="epfo-btn epfo-btn--ghost" onClick={handlePrev} style={{ padding: 0, marginBottom: '24px' }}>
            ← Back
          </button>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>What is Moving?</h2>
          
          <div className="epfo-emp-timeline" style={{ marginBottom: '32px' }}>
            <div className="epfo-emp-timeline__node epfo-emp-timeline__node--source">
              <div className="epfo-emp-timeline__role">Transferring From</div>
              <div className="epfo-emp-timeline__name">{selectedEmployment.establishment.name.replace(' (synthetic)', '')}</div>
              <div className="epfo-emp-timeline__dates">
                {new Date(selectedEmployment.date_of_joining).toLocaleDateString('en-IN', {month:'short', year:'numeric'})} to {selectedEmployment.date_of_exit ? new Date(selectedEmployment.date_of_exit).toLocaleDateString('en-IN', {month:'short', year:'numeric'}) : 'Present'}
              </div>
              <div className="epfo-emp-timeline__stats">
                <div className="epfo-emp-timeline__stat">
                  <span className="epfo-emp-timeline__stat-label">Member ID</span>
                  <span className="epfo-emp-timeline__stat-value" style={{ fontFamily: 'monospace' }}>{selectedEmployment.member_id_masked}</span>
                </div>
              </div>
            </div>
            
            <div className="epfo-emp-timeline__connector">
              <ArrowLeftRight size={24} />
            </div>
            
            <div className="epfo-emp-timeline__node epfo-emp-timeline__node--destination">
              <div className="epfo-emp-timeline__role">Consolidating Into</div>
              <div className="epfo-emp-timeline__name">{currentEmployment.establishment.name.replace(' (synthetic)', '')}</div>
              <div className="epfo-emp-timeline__dates">
                Since {new Date(currentEmployment.date_of_joining).toLocaleDateString('en-IN', {month:'short', year:'numeric'})}
              </div>
              <div className="epfo-emp-timeline__stats">
                <div className="epfo-emp-timeline__stat">
                  <span className="epfo-emp-timeline__stat-label">Member ID</span>
                  <span className="epfo-emp-timeline__stat-value" style={{ fontFamily: 'monospace' }}>{currentEmployment.member_id_masked}</span>
                </div>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Service Continuity Summary</h3>
          <div className="epfo-review" style={{ marginBottom: '32px' }}>
            <div className="epfo-review__body" style={{ padding: '0' }}>
              <div className="epfo-review__row" style={{ padding: '16px 24px' }}>
                <span className="epfo-review__row-label">PF Balance carrying forward</span>
                <span className="epfo-review__row-value">₹{selectedEmployment.current_epf_balance.toLocaleString('en-IN')}</span>
              </div>
              <div className="epfo-review__row" style={{ padding: '16px 24px' }}>
                <span className="epfo-review__row-label">Service months added to pension record</span>
                <span className="epfo-review__row-value">{selectedEmployment.eps_service_months} months</span>
              </div>
              <div className="epfo-review__row" style={{ padding: '16px 24px', background: 'var(--epfo-primary-surface)' }}>
                <span className="epfo-review__row-label" style={{ color: 'var(--epfo-text-primary)', fontWeight: 600 }}>UAN & KYC Connection</span>
                <span className="epfo-review__row-value" style={{ color: 'var(--epfo-primary)' }}>Remains the same</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="epfo-btn epfo-btn--primary" onClick={handleNext}>
              Review and Submit
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Confirm & Submit */}
      {step === 5 && selectedEmployment && currentEmployment && (
        <div style={{ maxWidth: '700px' }}>
          <button className="epfo-btn epfo-btn--ghost" onClick={handlePrev} style={{ padding: 0, marginBottom: '24px' }}>
            ← Back
          </button>
          
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Final Confirmation</h2>
          
          <div className="epfo-alert epfo-alert--info" style={{ marginBottom: '32px' }}>
            <div className="epfo-alert__icon"><Info size={20} /></div>
            <div className="epfo-alert__content">
              <strong>What happens next?</strong><br/>
              After submission, this request will be sent to your previous employer (or current employer depending on system routing) for digital attestation, followed by EPFO processing. This usually takes 7-10 days.
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '32px', cursor: 'pointer', padding: '16px', background: 'var(--epfo-bg-default)', borderRadius: 'var(--radius-md)', border: '1px solid var(--epfo-border-subtle)' }}>
            <input type="checkbox" style={{ marginTop: '4px', transform: 'scale(1.2)' }} required />
            <span style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--epfo-text-primary)' }}>
              I am asking EPFO to transfer the eligible PF record and service history from my previous employment to my current employment. I declare that the details shown are true to the best of my knowledge.
            </span>
          </label>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="epfo-btn epfo-btn--secondary" onClick={handlePrev} disabled={isProcessing}>Back</button>
            <button className="epfo-btn epfo-btn--primary" onClick={handleSubmit} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <RefreshCw size={18} className="epfo-spin" style={{ marginRight: '8px' }} /> Checking records...
                </>
              ) : 'Submit transfer request'}
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Acknowledgement */}
      {step === 6 && (
        <div className="epfo-confirmation" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="epfo-confirmation__icon" style={{ margin: '0 auto 24px' }}>
            <CheckCircle2 size={48} color="var(--epfo-green)" />
          </div>
          <h2 className="epfo-confirmation__title" style={{ fontSize: '24px' }}>Transfer Request Submitted</h2>
          <p className="epfo-confirmation__subtitle" style={{ fontSize: '16px', marginBottom: '32px' }}>
            Your request to consolidate your previous PF account into your current account has been generated.
          </p>

          <div style={{ background: 'var(--epfo-white)', border: '1px solid var(--epfo-border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px', textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', marginBottom: '8px' }}>Reference Number (Tracking ID)</div>
            <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--epfo-primary)', marginBottom: '24px' }}>
              {ackId}
            </div>
            
            <div style={{ borderTop: '1px solid var(--epfo-border-subtle)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span style={{ color: 'var(--epfo-text-secondary)' }}>From:</span>
                <span style={{ fontWeight: 600, textAlign: 'right' }}>{selectedEmployment?.establishment.name.replace(' (synthetic)', '')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span style={{ color: 'var(--epfo-text-secondary)' }}>To:</span>
                <span style={{ fontWeight: 600, textAlign: 'right' }}>{currentEmployment?.establishment.name.replace(' (synthetic)', '')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--epfo-text-secondary)' }}>Current State:</span>
                <span style={{ fontWeight: 600 }}>Sent to Employer for Attestation</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to={`/requests/${ackId}`} className="epfo-btn epfo-btn--primary">Track Status</Link>
            <Link to="/" className="epfo-btn epfo-btn--secondary">Return Home</Link>
          </div>
        </div>
      )}
    </div>
  )
}
