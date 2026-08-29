import { useState, useEffect, useRef, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home, Briefcase, FileText, User, HelpCircle, Menu, X,
  ChevronDown, Globe, Accessibility, Bell, LogOut
} from 'lucide-react'
import { getMember, getNotifications } from '../../services/mockData'
import { SessionExpiryModal } from './SessionExpiryModal'
import { triggerSessionExpiry } from './events'

interface AppShellProps {
  children: ReactNode
}

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/services', label: 'Services', icon: Briefcase },
  { path: '/requests', label: 'Requests', icon: FileText },
  { path: '/account', label: 'Account', icon: User },
  { path: '/help', label: 'Help', icon: HelpCircle },
]

export function AppShell({ children }: AppShellProps) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const accountMenuRef = useRef<HTMLDivElement>(null)
  const member = getMember()
  const notifications = getNotifications()
  const unreadCount = notifications.filter(n => !n.read).length

  // Close account dropdown on outside click or Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setAccountMenuOpen(false)
    }
    if (accountMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [accountMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Skip navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Prototype disclosure */}
      <div className="prototype-banner" role="status">
        <strong>Prototype</strong> — This is a design demonstration. No real EPFO data or transactions are involved.
      </div>

      {/* Desktop header */}
      <header style={{
        background: 'var(--epfo-white)',
        borderBottom: '1px solid var(--epfo-border-default)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: 'var(--content-max-width)',
          margin: '0 auto',
          padding: '0 var(--page-padding-mobile)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
        }}>
          {/* Logo / Identity */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--epfo-text-primary)',
            }}
            aria-label="EPFO Member Services — Home"
          >
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              background: 'var(--epfo-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--epfo-white)',
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            }}>
              EPFO
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.2 }}>
                Member Services
              </div>
              <div style={{ fontSize: 11, color: 'var(--epfo-text-secondary)', lineHeight: 1 }}>
                Employees' Provident Fund Organisation
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            className="desktop-nav"
          >
            {NAV_ITEMS.map(item => {
              const isActive = location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path))
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--epfo-primary)' : 'var(--epfo-text-secondary)',
                    background: isActive ? 'var(--epfo-primary-surface)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'background var(--transition-fast)',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Language */}
            <button
              className="desktop-only"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                border: '1px solid var(--epfo-border-subtle)',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                fontSize: 13,
                cursor: 'pointer',
                color: 'var(--epfo-text-secondary)',
              }}
              aria-label="Change language"
              title="Language"
            >
              <Globe size={14} />
              EN
            </button>

            {/* Notifications */}
            <Link
              to="/requests"
              style={{
                position: 'relative',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--epfo-text-secondary)',
                textDecoration: 'none',
              }}
              aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'var(--epfo-red)',
                  color: 'var(--epfo-white)',
                  fontSize: 10,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }} aria-hidden="true">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Account menu (desktop) */}
            <div style={{ position: 'relative' }} className="desktop-only" ref={accountMenuRef}>
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  border: '1px solid var(--epfo-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: 13,
                  color: 'var(--epfo-text-primary)',
                }}
                aria-expanded={accountMenuOpen}
                aria-haspopup="true"
                aria-label="Account menu"
              >
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'var(--epfo-primary-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--epfo-primary)',
                  fontSize: 11,
                  fontWeight: 700,
                }}>
                  {member?.full_name.charAt(0) || 'M'}
                </div>
                <ChevronDown size={14} />
              </button>

              {accountMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: 4,
                    background: 'var(--epfo-white)',
                    border: '1px solid var(--epfo-border-default)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-2)',
                    minWidth: 220,
                    padding: '8px 0',
                    zIndex: 200,
                  }}
                  role="menu"
                >
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--epfo-border-subtle)',
                  }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{member?.full_name}</div>
                    <div style={{ fontSize: 12, color: 'var(--epfo-text-secondary)' }}>
                      UAN: {member?.uan_masked}
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      color: 'var(--epfo-text-primary)',
                      textDecoration: 'none',
                      fontSize: 14,
                    }}
                    onClick={() => setAccountMenuOpen(false)}
                    role="menuitem"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <Link
                    to="/account/health"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      color: 'var(--epfo-text-primary)',
                      textDecoration: 'none',
                      fontSize: 14,
                    }}
                    onClick={() => setAccountMenuOpen(false)}
                    role="menuitem"
                  >
                    <Accessibility size={16} /> Account health
                  </Link>
                  <div style={{ borderTop: '1px solid var(--epfo-border-subtle)', margin: '4px 0' }} />
                  <button
                    onClick={() => {
                      setAccountMenuOpen(false)
                      triggerSessionExpiry()
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      color: 'var(--epfo-text-primary)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 14,
                      width: '100%',
                      textAlign: 'left',
                    }}
                    role="menuitem"
                  >
                    <LogOut size={16} /> Simulate Expiry (Demo)
                  </button>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      color: 'var(--epfo-red)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 14,
                      width: '100%',
                      textAlign: 'left',
                    }}
                    role="menuitem"
                  >
                    <LogOut size={16} /> Sign out (demo)
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                padding: '8px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--epfo-text-primary)',
              }}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation overlay */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              top: 0,
              background: 'var(--epfo-white)',
              zIndex: 99,
              padding: '16px',
              paddingTop: 96,
              overflowY: 'auto',
            }}
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
          >
            {/* Member info */}
            <div style={{
              padding: '16px',
              background: 'var(--epfo-primary-surface)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: 16,
            }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{member?.full_name}</div>
              <div style={{ fontSize: 13, color: 'var(--epfo-text-secondary)', marginTop: 4 }}>
                UAN: {member?.uan_masked}
              </div>
            </div>

            <nav aria-label="Mobile navigation">
              {NAV_ITEMS.map(item => {
                const isActive = location.pathname === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path))
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 16,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--epfo-primary)' : 'var(--epfo-text-primary)',
                      background: isActive ? 'var(--epfo-primary-surface)' : 'transparent',
                      textDecoration: 'none',
                      marginBottom: 4,
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div style={{
              borderTop: '1px solid var(--epfo-border-subtle)',
              marginTop: 16,
              paddingTop: 16,
            }}>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  fontSize: 16,
                  color: 'var(--epfo-text-primary)',
                  textDecoration: 'none',
                }}
              >
                <User size={20} /> My profile
              </Link>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  fontSize: 16,
                  color: 'var(--epfo-red)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <LogOut size={20} /> Sign out (demo)
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'var(--epfo-white)',
        borderTop: '1px solid var(--epfo-border-default)',
        padding: '32px 0 24px',
        marginTop: 'auto',
      }}>
        <div style={{
          maxWidth: 'var(--content-max-width)',
          margin: '0 auto',
          padding: '0 var(--page-padding-mobile)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            marginBottom: 24,
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Services</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link to="/services/claim" style={{ fontSize: 13, color: 'var(--epfo-text-secondary)' }}>PF withdrawal</Link>
                <Link to="/services/kyc" style={{ fontSize: 13, color: 'var(--epfo-text-secondary)' }}>KYC correction</Link>
                <Link to="/services/transfer" style={{ fontSize: 13, color: 'var(--epfo-text-secondary)' }}>PF transfer</Link>
                <Link to="/account" style={{ fontSize: 13, color: 'var(--epfo-text-secondary)' }}>Account overview</Link>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Support</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link to="/help" style={{ fontSize: 13, color: 'var(--epfo-text-secondary)' }}>Help centre</Link>
                <Link to="/recovery" style={{ fontSize: 13, color: 'var(--epfo-text-secondary)' }}>Fix a failed request</Link>
                <Link to="/requests" style={{ fontSize: 13, color: 'var(--epfo-text-secondary)' }}>Track requests</Link>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>About</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: 13, color: 'var(--epfo-text-secondary)' }}>EPFO Redesign Prototype</span>
                <span style={{ fontSize: 13, color: 'var(--epfo-text-secondary)' }}>UX4G Design System</span>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid var(--epfo-border-subtle)',
            paddingTop: 16,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{ fontSize: 12, color: 'var(--epfo-text-secondary)' }}>
              Hackathon prototype — not an official EPFO service.
              All data is synthetic. No real transactions are processed.
            </div>
            <div style={{ fontSize: 12, color: 'var(--epfo-text-secondary)' }}>
              Built with UX4G Design System
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive styles */}
      <style>{`
        .desktop-nav { display: none; }
        .desktop-only { display: none !important; }
        .mobile-only { display: flex !important; }

        @media (min-width: 768px) {
          .desktop-nav { display: flex; }
          .desktop-only { display: flex !important; }
          .mobile-only { display: none !important; }
        }
      `}</style>
      
      <SessionExpiryModal onSignIn={() => {
        // Since auth context is not yet implemented fully, we just reload or close modal
        window.location.href = '/'
      }} />
    </div>
  )
}
