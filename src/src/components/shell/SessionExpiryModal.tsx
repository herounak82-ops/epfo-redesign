import { useEffect, useState, useRef } from 'react'
import { AlertTriangle } from 'lucide-react'

import { sessionExpiryEvents } from './events'

interface SessionExpiryModalProps {
  onSignIn: () => void;
}

export function SessionExpiryModal({ onSignIn }: SessionExpiryModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // 1. Simulate a natural timeout (e.g. 5 minutes in a real app, 
    //    but for demo we'll make it 20 minutes so it doesn't interrupt standard flows,
    //    and we will rely on manual trigger for demoing)
    const timeout = setTimeout(() => {
      setIsOpen(true)
    }, 20 * 60 * 1000)

    // 2. Listen for manual trigger
    const handleExpire = () => {
      setIsOpen(true)
    }
    sessionExpiryEvents.addEventListener('expire', handleExpire)

    return () => {
      clearTimeout(timeout)
      sessionExpiryEvents.removeEventListener('expire', handleExpire)
    }
  }, [])

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="epfo-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-expiry-title"
    >
      <div 
        className="epfo-modal-content"
        style={{
          background: 'var(--epfo-white)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          maxWidth: '480px',
          width: '100%',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--epfo-saffron-light)',
            color: '#92610A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <AlertTriangle size={24} />
          </div>
          <h2 id="session-expiry-title" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--epfo-text-primary)', margin: 0 }}>
            Session Expired
          </h2>
        </div>
        
        <p style={{ fontSize: '16px', color: 'var(--epfo-text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
          Your session ended after a period of inactivity to protect your personal information.
        </p>
        
        <p style={{ fontSize: '14px', color: 'var(--epfo-text-primary)', marginBottom: '32px', padding: '12px', background: 'var(--epfo-bg-default)', borderRadius: 'var(--radius-md)' }}>
          <strong>Don't worry:</strong> Any information you have entered on the current page is saved. You can sign in again to continue exactly where you left off.
        </p>
        
        <button 
          ref={buttonRef}
          className="epfo-btn epfo-btn--primary" 
          style={{ width: '100%' }}
          onClick={() => {
            setIsOpen(false)
            onSignIn()
          }}
        >
          Sign in and continue
        </button>
      </div>
    </div>
  )
}
