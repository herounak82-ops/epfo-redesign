import { useState } from 'react'
import { Search, Phone, MessageSquare, Book, ChevronDown } from 'lucide-react'

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="epfo-record" style={{ padding: 0 }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: 'var(--epfo-text-primary)'
        }}
        className="epfo-faq-button"
      >
        <span style={{ fontWeight: 500 }}>{question}</span>
        <ChevronDown 
          size={16} 
          color="var(--epfo-text-secondary)" 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
        />
      </button>
      <div 
        style={{
          display: isOpen ? 'block' : 'none',
          padding: '0 16px 16px 16px',
          color: 'var(--epfo-text-secondary)',
          lineHeight: 1.5,
          borderTop: '1px solid var(--epfo-border-subtle)',
          marginTop: isOpen ? '0' : '-1px',
          paddingTop: isOpen ? '16px' : '0'
        }}
      >
        {answer}
      </div>
    </div>
  )
}

export function HelpPage() {
  return (
    <div className="epfo-page">
      <div className="epfo-page-header">
        <h1>Help & Support</h1>
        <div className="epfo-page-header__subtitle">
          Find answers or contact EPFO support.
        </div>
      </div>

      <div style={{ maxWidth: '800px' }}>
        <div role="search" style={{ position: 'relative', marginBottom: '40px' }}>
          <label htmlFor="help-search" className="sr-only">Search help topics</label>
          <Search size={20} color="var(--epfo-text-secondary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input 
            id="help-search"
            type="search" 
            className="epfo-input" 
            placeholder="Search for 'How to claim PF' or 'Update KYC'" 
            style={{ paddingLeft: '48px', height: '56px', fontSize: '16px' }}
          />
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Frequently Asked Questions</h2>
        <div className="epfo-card-grid" style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <FAQItem 
            question="How do I check my PF balance?" 
            answer="You can check your PF balance from the 'Account' section after logging in. It will show your total balance across all your employments, as well as the detailed passbook." 
          />
          <FAQItem 
            question="What is UAN and how do I activate it?" 
            answer="UAN stands for Universal Account Number. It is a unique 12-digit number assigned to you by EPFO. You can activate it through the UMANG app using Aadhaar-based face authentication." 
          />
          <FAQItem 
            question="How long does a PF withdrawal take?" 
            answer="Online PF withdrawal claims are typically settled within 3 to 7 working days, provided your Aadhaar is verified and your bank account details are correct and approved by your employer." 
          />
          <FAQItem 
            question="Why was my KYC rejected?" 
            answer="KYC can be rejected if the name on your document does not exactly match the name in your EPFO records, or if the document is invalid. You can check the specific rejection reason in the 'Fix failed request' section." 
          />
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Contact Us</h2>
        <div className="epfo-card-grid epfo-card-grid--3">
          <div className="epfo-record" style={{ textAlign: 'center', padding: '24px 16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--epfo-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--epfo-primary)' }}>
              <Phone size={24} />
            </div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Toll Free</div>
            <div style={{ color: 'var(--epfo-text-secondary)', fontSize: '14px', marginBottom: '12px' }}>14470</div>
            <a href="tel:14470" className="epfo-btn epfo-btn--secondary epfo-btn--sm" style={{ width: '100%' }}>Call Now</a>
          </div>
          
          <div className="epfo-record" style={{ textAlign: 'center', padding: '24px 16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--epfo-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--epfo-blue)' }}>
              <MessageSquare size={24} />
            </div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>WhatsApp</div>
            <div style={{ color: 'var(--epfo-text-secondary)', fontSize: '14px', marginBottom: '12px' }}>Support by regional office</div>
            <button className="epfo-btn epfo-btn--secondary epfo-btn--sm" style={{ width: '100%' }}>Find Number</button>
          </div>

          <div className="epfo-record" style={{ textAlign: 'center', padding: '24px 16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--epfo-red-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--epfo-red)' }}>
              <Book size={24} />
            </div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Grievance</div>
            <div style={{ color: 'var(--epfo-text-secondary)', fontSize: '14px', marginBottom: '12px' }}>EPFiGMS Portal</div>
            <button className="epfo-btn epfo-btn--secondary epfo-btn--sm" style={{ width: '100%' }}>Register Grievance</button>
          </div>
        </div>
      </div>
    </div>
  )
}
