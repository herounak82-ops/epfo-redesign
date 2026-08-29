import { Link } from 'react-router-dom'
import { getMember, formatDate } from '../services/mockData'
import { User, Phone, MapPin, Edit3 } from 'lucide-react'

export function ProfilePage() {
  const member = getMember()

  if (!member) return <div className="epfo-page">Member not found</div>

  return (
    <div className="epfo-page">
      <div className="epfo-page-header">
        <h1>My Profile</h1>
        <div className="epfo-page-header__subtitle">
          Manage your personal details and contact information.
        </div>
      </div>

      <div style={{ maxWidth: '800px' }}>
        <div className="epfo-record" style={{ padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--epfo-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--epfo-primary)', fontSize: '32px', fontWeight: 600 }}>
            {member.full_name.charAt(0)}
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>{member.full_name}</h2>
            <div style={{ fontSize: '14px', color: 'var(--epfo-text-secondary)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span>UAN: <span className="mono">{member.uan_masked}</span></span>
              <div className="epfo-status epfo-status--verified">Active</div>
            </div>
          </div>
        </div>

        <div className="epfo-card-grid" style={{ marginBottom: '24px' }}>
          <div className="epfo-record">
            <div className="epfo-record__header">
              <h3 className="epfo-record__title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={18} /> Personal Details
              </h3>
              <Link to="/services/kyc" className="epfo-btn epfo-btn--ghost" style={{ padding: '4px 8px', fontSize: '13px' }}>
                <Edit3 size={14} /> Update
              </Link>
            </div>
            
            <div className="epfo-record__meta">
              <div className="epfo-record__field">
                <span className="epfo-record__label">Date of Birth</span>
                <span className="epfo-record__value">{formatDate(member.date_of_birth)}</span>
              </div>
              <div className="epfo-record__field">
                <span className="epfo-record__label">Gender</span>
                <span className="epfo-record__value">{member.gender}</span>
              </div>
              <div className="epfo-record__field">
                <span className="epfo-record__label">Father/Spouse Name</span>
                <span className="epfo-record__value">{member.father_or_spouse_name}</span>
              </div>
              <div className="epfo-record__field">
                <span className="epfo-record__label">Marital Status</span>
                <span className="epfo-record__value">{member.marital_status}</span>
              </div>
            </div>
          </div>

          <div className="epfo-record">
            <div className="epfo-record__header">
              <h3 className="epfo-record__title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={18} /> Contact Details
              </h3>
              <button className="epfo-btn epfo-btn--ghost" style={{ padding: '4px 8px', fontSize: '13px' }}>
                <Edit3 size={14} /> Update
              </button>
            </div>
            
            <div className="epfo-record__meta" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="epfo-record__field">
                <span className="epfo-record__label">Mobile Number</span>
                <span className="epfo-record__value mono" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {member.contact.mobile_masked}
                  {member.contact.mobile_verified && <div className="epfo-status epfo-status--verified" style={{ padding: '0 6px', fontSize: '11px' }}>Verified</div>}
                </span>
              </div>
              <div className="epfo-record__field">
                <span className="epfo-record__label">Email Address</span>
                <span className="epfo-record__value">{member.contact.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="epfo-record" style={{ marginBottom: '24px' }}>
          <div className="epfo-record__header">
            <h3 className="epfo-record__title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} /> Current Address
            </h3>
            <button className="epfo-btn epfo-btn--ghost" style={{ padding: '4px 8px', fontSize: '13px' }}>
              <Edit3 size={14} /> Update
            </button>
          </div>
          
          <div className="epfo-record__meta">
            <div className="epfo-record__field">
              <span className="epfo-record__label">City</span>
              <span className="epfo-record__value">{member.address.city}</span>
            </div>
            <div className="epfo-record__field">
              <span className="epfo-record__label">State</span>
              <span className="epfo-record__value">{member.address.state}</span>
            </div>
            <div className="epfo-record__field">
              <span className="epfo-record__label">Country</span>
              <span className="epfo-record__value">{member.address.country}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
