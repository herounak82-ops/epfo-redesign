import { useState } from 'react'
import { Eye, EyeOff, ShieldCheck, FileText, Download, ExternalLink } from 'lucide-react'
import { useAuth } from '../components/AuthContext'

export function LoginPage() {
  const { login } = useAuth()
  const [uan, setUan] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!uan || !password) {
      setError('Please enter both UAN and password.')
      return
    }

    if (captchaInput !== 'X7B9') {
      setError('Invalid CAPTCHA code.')
      return
    }

    setError('')
    setLoading(true)

    const success = await login(uan, password)
    
    if (!success) {
      setError('Invalid UAN or password. Please try again.')
      setLoading(false)
    }
    // If success, AuthContext will trigger re-render of App and show authenticated shell
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--epfo-bg-default)' }}>
      {/* Header */}
      <header style={{ 
        background: 'var(--epfo-white)', 
        borderBottom: '1px solid var(--epfo-border-subtle)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Simulated Govt Logo/Identity */}
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'var(--epfo-blue)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700
          }}>
            GOI
          </div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--epfo-text-primary)', fontSize: '18px' }}>
              Employees' Provident Fund Organisation
            </div>
            <div style={{ color: 'var(--epfo-text-secondary)', fontSize: '14px' }}>
              Ministry of Labour & Employment, Government of India
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
        
        {/* Left Column: Login Form */}
        <div style={{ flex: '1 1 400px', maxWidth: '480px' }}>
          <div style={{ 
            background: 'var(--epfo-white)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            boxShadow: 'var(--shadow-2)',
            borderTop: '4px solid var(--epfo-primary)'
          }}>
            <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', color: 'var(--epfo-text-primary)' }}>
              Member Login
            </h1>
            <p style={{ color: 'var(--epfo-text-secondary)', marginBottom: '24px', fontSize: '14px' }}>
              Access your PF passbook, claims, and service history.
            </p>

            {error && (
              <div className="epfo-alert epfo-alert--error" style={{ marginBottom: '24px' }}>
                <div className="epfo-alert__content">{error}</div>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="epfo-form-group">
                <label htmlFor="uan" className="epfo-form-label epfo-form-label--required">UAN (Universal Account Number)</label>
                <input 
                  id="uan" 
                  type="text" 
                  className="epfo-input" 
                  value={uan}
                  onChange={(e) => setUan(e.target.value)}
                  placeholder="Enter 12-digit UAN" 
                  maxLength={12}
                />
              </div>

              <div className="epfo-form-group">
                <label htmlFor="password" className="epfo-form-label epfo-form-label--required">Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'} 
                    className="epfo-input" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: '48px' }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--epfo-text-secondary)',
                      cursor: 'pointer'
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Fake CAPTCHA */}
              <div className="epfo-form-group">
                <label htmlFor="captcha" className="epfo-form-label epfo-form-label--required">Security Code</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ 
                    background: '#f0f0f0', 
                    padding: '8px 16px', 
                    letterSpacing: '4px', 
                    fontWeight: 700, 
                    fontFamily: 'monospace',
                    fontSize: '18px',
                    color: '#333',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    userSelect: 'none'
                  }}>
                    X7B9
                  </div>
                  <input 
                    id="captcha"
                    type="text"
                    className="epfo-input"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter code"
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="epfo-btn epfo-btn--primary" 
                style={{ width: '100%', marginBottom: '16px', position: 'relative' }}
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <a href="#" className="epfo-link" onClick={e => e.preventDefault()}>Forgot Password?</a>
                <a href="#" className="epfo-link" onClick={e => e.preventDefault()}>Unlock Account</a>
              </div>
            </form>
          </div>

          <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--epfo-text-secondary)', textAlign: 'center', padding: '12px', background: 'var(--epfo-blue-light)', borderRadius: 'var(--radius-md)' }}>
            <strong>Prototype Notice:</strong> This is a demo environment. Enter any UAN and Password to log in. The CAPTCHA code is "X7B9".
          </div>
        </div>

        {/* Right Column: Information & Services */}
        <div style={{ flex: '1 1 400px' }}>
          
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--epfo-text-primary)' }}>
              Important Notices
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: 'var(--epfo-white)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--epfo-red)', boxShadow: 'var(--shadow-1)' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <ShieldCheck size={20} color="var(--epfo-red)" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>Beware of Fraud</div>
                    <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)' }}>
                      EPFO never asks you to share your PIN, OTP, UAN or Password over phone or WhatsApp. Do not download any unauthorized apps.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--epfo-text-primary)' }}>
              Quick Services
            </h2>
            <div className="epfo-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              
              <a href="#" onClick={e => e.preventDefault()} className="epfo-record" style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                <div style={{ background: 'var(--epfo-blue-light)', padding: '8px', borderRadius: '50%', color: 'var(--epfo-blue)' }}>
                  <FileText size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--epfo-text-primary)', marginBottom: '4px' }}>Track Application Status</div>
                  <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)' }}>Check status of your claim or transfer</div>
                </div>
              </a>

              <a href="#" onClick={e => e.preventDefault()} className="epfo-record" style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                <div style={{ background: 'var(--epfo-blue-light)', padding: '8px', borderRadius: '50%', color: 'var(--epfo-blue)' }}>
                  <Download size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--epfo-text-primary)', marginBottom: '4px' }}>Death Claim by Nominee</div>
                  <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)' }}>File claim for a deceased member</div>
                </div>
              </a>

              {/* Modernized UMANG delegation */}
              <a href="#" onClick={e => e.preventDefault()} className="epfo-record" style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                <div style={{ background: 'var(--epfo-primary-surface)', padding: '8px', borderRadius: '50%', color: 'var(--epfo-primary)' }}>
                  <ExternalLink size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--epfo-text-primary)', marginBottom: '4px' }}>Activate / Know Your UAN</div>
                  <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)' }}>
                    Now available through UMANG app using Aadhaar face authentication.
                  </div>
                </div>
              </a>

            </div>
          </div>

        </div>
      </main>
      
      {/* Footer */}
      <footer style={{ 
        background: 'var(--epfo-text-primary)', 
        color: 'var(--epfo-white)', 
        padding: '24px', 
        marginTop: 'auto',
        fontSize: '13px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '24px' }}>
          <div>
            <div>© 2026 Employees' Provident Fund Organisation</div>
            <div style={{ opacity: 0.7, marginTop: '4px' }}>Designed with UX4G Design System</div>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: 'var(--epfo-white)', opacity: 0.8, textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--epfo-white)', opacity: 0.8, textDecoration: 'none' }}>Terms of Use</a>
            <a href="#" style={{ color: 'var(--epfo-white)', opacity: 0.8, textDecoration: 'none' }}>Accessibility Statement</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
