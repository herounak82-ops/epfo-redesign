import { Link } from 'react-router-dom'
import { getMember, getTotalBalance, formatCurrency, formatDate } from '../services/mockData'
import { Download, Briefcase } from 'lucide-react'

export function AccountPage() {
  const member = getMember()

  if (!member) return <div className="epfo-page">Member not found</div>

  const totalBalance = getTotalBalance()

  return (
    <div className="epfo-page">
      <div className="epfo-page-header">
        <h1>Account Overview</h1>
        <div className="epfo-page-header__subtitle">
          Your provident fund balance and employment history.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="epfo-record" style={{ background: 'var(--epfo-primary-surface)', border: '1px solid var(--epfo-primary)', gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', marginBottom: '4px' }}>Total EPF Balance</div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--epfo-primary)' }}>
                {formatCurrency(totalBalance)}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)', marginTop: '4px' }}>
                Across {member.employments.length} establishment{member.employments.length > 1 ? 's' : ''}
              </div>
            </div>
            <button className="epfo-btn epfo-btn--primary">
              <Download size={18} /> Download Passbook
            </button>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Briefcase size={20} /> Employment History
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
        {[...member.employments].reverse().map((emp) => {
          const isCurrent = emp.employment_status === 'current'
          
          return (
            <div key={emp.member_id_masked} className="epfo-record" style={{ position: 'relative' }}>
              <div className="epfo-record__header" style={{ borderBottom: '1px solid var(--epfo-border-subtle)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <div className="epfo-record__title" style={{ fontSize: '18px' }}>
                    {emp.establishment.name.replace(' (synthetic)', '')}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)', marginTop: '4px' }}>
                    Est. Code: {emp.establishment.establishment_code}
                  </div>
                </div>
                <div className={`epfo-status ${isCurrent ? 'epfo-status--verified' : 'epfo-status--neutral'}`}>
                  {isCurrent ? 'Current Employer' : 'Closed Account'}
                </div>
              </div>
              
              <div className="epfo-record__meta" style={{ marginBottom: '24px' }}>
                <div className="epfo-record__field">
                  <span className="epfo-record__label">Member ID</span>
                  <span className="epfo-record__value mono">{emp.member_id_masked}</span>
                </div>
                <div className="epfo-record__field">
                  <span className="epfo-record__label">Date of Joining</span>
                  <span className="epfo-record__value">{formatDate(emp.date_of_joining)}</span>
                </div>
                <div className="epfo-record__field">
                  <span className="epfo-record__label">Date of Exit</span>
                  <span className="epfo-record__value">
                    {emp.date_of_exit ? formatDate(emp.date_of_exit) : (isCurrent ? 'Not Applicable' : <span style={{ color: 'var(--epfo-red)', fontWeight: 500 }}>Missing</span>)}
                  </span>
                </div>
                <div className="epfo-record__field">
                  <span className="epfo-record__label">Pension Service</span>
                  <span className="epfo-record__value">{emp.eps_service_months} months</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--epfo-bg-default)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--epfo-text-secondary)', letterSpacing: '0.04em', fontWeight: 500 }}>EPF Balance</div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--epfo-text-primary)' }}>
                    {formatCurrency(emp.current_epf_balance)}
                  </div>
                </div>
                
                {isCurrent ? (
                  <div style={{ fontSize: '13px', color: 'var(--epfo-text-secondary)', textAlign: 'right' }}>
                    Last contribution:<br/>
                    <strong>{emp.passbook_last_posted_wage_month}</strong>
                  </div>
                ) : emp.transfer_status === 'transferred' ? (
                  <div className="epfo-status epfo-status--verified">Transferred Out</div>
                ) : (
                  <Link to="/services/transfer" className="epfo-btn epfo-btn--secondary epfo-btn--sm">
                    Transfer Funds
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
