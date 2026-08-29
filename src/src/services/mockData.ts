/**
 * Mock Data Service Layer
 * 
 * Wraps the authoritative mock data from data/epfo_mock_package/epfo_mock_data.json.
 * The data directory is the single source of truth — we import from it directly.
 * All functions return deterministic data. No random generation.
 */

import mockDataJson from '../../../data/epfo_mock_package/epfo_mock_data.json';
import type {
  Citizen,
  MockData,
  AccountHealthItem,
  HealthStatus,
  ServiceRequest,
  Notification,
  Employment,
  KYCItem,
  Claim,
  TransferRequest,
  TransferReadiness,
  ReadinessCheck,
  FailureDiagnosis,
} from './types';

const data = mockDataJson as unknown as MockData;

// Default demo member — CIT-007 Mohammed Faizan
// Good for most journeys: active UAN, all KYC approved, date of exit present
const DEFAULT_CITIZEN_ID = 'CIT-007';

/**
 * Get a citizen by ID. Defaults to the demo member.
 */
export function getMember(citizenId: string = DEFAULT_CITIZEN_ID): Citizen | null {
  return data.citizens.find(c => c.synthetic_citizen_id === citizenId) || null;
}

/**
 * Get all citizens (for admin/demo purposes).
 */
export function getAllMembers(): Citizen[] {
  return data.citizens;
}

/**
 * Get all employers.
 */
export function getEmployers() {
  return data.employers;
}

/**
 * Compute Account Health items for a citizen.
 * Each item has: status, explanation, why it matters, next action, responsible party.
 */
export function getAccountHealth(citizenId: string = DEFAULT_CITIZEN_ID): AccountHealthItem[] {
  const citizen = getMember(citizenId);
  if (!citizen) return [];

  const items: AccountHealthItem[] = [];

  // UAN status
  items.push({
    id: 'uan',
    label: 'UAN',
    status: citizen.uan_status === 'active' ? 'verified' : 'action_needed',
    statusLabel: citizen.uan_status === 'active' ? 'Active' : 'Needs activation',
    explanation: citizen.uan_status === 'active'
      ? `Your UAN (${citizen.uan_masked}) is active and linked to your account.`
      : 'Your UAN has not been activated yet. You need an active UAN to access online services.',
    whyItMatters: 'Your UAN is your unique identity across all EPFO services.',
    nextAction: citizen.uan_status === 'active'
      ? 'No action needed.'
      : 'Activate your UAN through the UMANG app using Aadhaar-based face authentication.',
    responsibleParty: citizen.uan_status === 'active' ? undefined : 'You (via UMANG app)',
    lastChecked: data.as_of,
  });

  // Aadhaar
  const aadhaar = citizen.kyc.find(k => k.type === 'aadhaar');
  items.push({
    id: 'aadhaar',
    label: 'Aadhaar',
    status: kycToHealthStatus(aadhaar),
    statusLabel: kycStatusLabel(aadhaar),
    explanation: aadhaar?.status === 'approved'
      ? `Your Aadhaar (${aadhaar.value_masked}) is verified.`
      : 'Your Aadhaar verification is not complete.',
    whyItMatters: 'Aadhaar is required for online claims and KYC verification.',
    nextAction: aadhaar?.status === 'approved'
      ? 'No action needed.'
      : 'Complete Aadhaar verification through the member portal.',
    lastChecked: aadhaar?.approved_on || aadhaar?.submitted_on,
  });

  // PAN
  const pan = citizen.kyc.find(k => k.type === 'pan');
  items.push({
    id: 'pan',
    label: 'PAN',
    status: kycToHealthStatus(pan),
    statusLabel: kycStatusLabel(pan),
    explanation: pan?.status === 'approved'
      ? `Your PAN (${pan.value_masked}) is verified.`
      : pan?.status === 'rejected'
        ? `Your PAN verification was rejected. ${pan.rejection_reason || 'Please resubmit with correct details.'}`
        : 'Your PAN verification is pending.',
    whyItMatters: 'PAN is needed for tax-related claims and high-value transactions.',
    nextAction: pan?.status === 'approved'
      ? 'No action needed.'
      : pan?.status === 'rejected'
        ? 'Resubmit your PAN with correct details.'
        : 'Wait for PAN verification to complete.',
    responsibleParty: pan?.status === 'rejected' ? 'You' : undefined,
    lastChecked: pan?.approved_on || pan?.submitted_on,
  });

  // Bank account
  const bank = citizen.kyc.find(k => k.type === 'bank');
  items.push({
    id: 'bank',
    label: 'Bank account',
    status: kycToHealthStatus(bank),
    statusLabel: kycStatusLabel(bank),
    explanation: bank?.status === 'approved'
      ? `Your bank account (${bank.value_masked}${bank.bank_name ? `, ${bank.bank_name.replace(' (synthetic account)', '')}` : ''}) is verified and ready for claim payments.`
      : bank?.status === 'pending_employer_approval'
        ? 'Your bank details have been submitted but are waiting for employer approval.'
        : 'Your bank account is not verified.',
    whyItMatters: 'A verified bank account is required to receive online claim payments.',
    nextAction: bank?.status === 'approved'
      ? 'No action needed.'
      : bank?.status === 'pending_employer_approval'
        ? 'Your employer needs to approve the bank account update.'
        : 'Add or verify your bank details in the KYC section.',
    responsibleParty: bank?.status === 'pending_employer_approval' ? 'Employer' : undefined,
    lastChecked: bank?.approved_on || bank?.submitted_on,
  });

  // Date of Exit — from most recent closed employment
  const closedEmployment = citizen.employments.find(e => e.employment_status === 'closed');
  const currentEmployment = citizen.employments.find(e => e.employment_status === 'current');
  const relevantEmployment = closedEmployment || currentEmployment;
  
  if (relevantEmployment && closedEmployment) {
    items.push({
      id: 'date_of_exit',
      label: 'Date of Exit',
      status: closedEmployment.date_of_exit ? 'verified' : 'error',
      statusLabel: closedEmployment.date_of_exit ? 'Recorded' : 'Missing',
      explanation: closedEmployment.date_of_exit
        ? `Date of Exit from ${closedEmployment.establishment.name.replace(' (synthetic)', '')} is recorded as ${formatDate(closedEmployment.date_of_exit)}.`
        : `Your previous employer (${closedEmployment.establishment.name.replace(' (synthetic)', '')}) has not recorded a Date of Exit.`,
      whyItMatters: 'Date of Exit is required for PF withdrawal and transfer. Without it, your request cannot be processed.',
      nextAction: closedEmployment.date_of_exit
        ? 'No action needed.'
        : 'Contact your previous employer and ask them to update your Date of Exit.',
      responsibleParty: closedEmployment.date_of_exit ? undefined : 'Previous employer',
      lastChecked: data.as_of,
    });
  } else if (currentEmployment) {
    items.push({
      id: 'date_of_exit',
      label: 'Date of Exit',
      status: 'not_applicable',
      statusLabel: 'Not applicable',
      explanation: 'You are currently employed. Date of Exit is only needed after you leave your job.',
      whyItMatters: 'Date of Exit is required when you want to withdraw or transfer PF after leaving a job.',
      nextAction: 'No action needed while you are currently employed.',
      lastChecked: data.as_of,
    });
  }

  // Transfer Readiness (if has closed employment and current employment)
  if (closedEmployment && currentEmployment) {
    // We reuse the getTransferReadiness logic but for the default scenario
    const tr = getTransferReadiness(citizenId, closedEmployment.establishment.establishment_code, 'ready');
    
    // Check if missing DOE for the demo missing_doe scenario block if we're using CIT-016
    // Actually, in the general health page, we just read real mock data.
    const hasExistingTransfer = closedEmployment.transfer_status !== 'not_started' && closedEmployment.transfer_status !== 'not_applicable';
    
    items.push({
      id: 'transfer_readiness',
      label: 'Transfer readiness',
      status: hasExistingTransfer ? 'verified' : tr.isReady ? 'verified' : 'action_needed',
      statusLabel: hasExistingTransfer ? 'Transferred' : tr.isReady ? 'Ready to transfer' : 'Blocked',
      explanation: hasExistingTransfer
        ? 'Your previous PF account has already been transferred to your current employer.'
        : tr.isReady 
          ? `Your previous account from ${closedEmployment.establishment.name.replace(' (synthetic)', '')} is ready to be transferred to your current account.` 
          : 'Your previous account cannot be transferred until all dependencies are resolved.',
      whyItMatters: 'Transferring your PF ensures continuous service history and consolidates your retirement savings into a single active account.',
      nextAction: hasExistingTransfer 
        ? 'No action needed.' 
        : tr.isReady 
          ? 'Start the transfer process.' 
          : 'Resolve the blockers listed above (like Date of Exit or KYC) first.',
      lastChecked: data.as_of,
    });
  }

  // Service history / EPS
  const totalEpsMonths = citizen.employments.reduce((sum, e) => sum + e.eps_service_months, 0);
  items.push({
    id: 'service_history',
    label: 'Service history',
    status: totalEpsMonths > 0 ? 'verified' : 'action_needed',
    statusLabel: totalEpsMonths > 0 ? `${totalEpsMonths} months` : 'Not available',
    explanation: totalEpsMonths > 0
      ? `Your total EPS service is ${totalEpsMonths} months across ${citizen.employments.length} employment${citizen.employments.length > 1 ? 's' : ''}.`
      : 'No service history records are available.',
    whyItMatters: 'Service history is used to determine pension eligibility and transfer continuity.',
    nextAction: totalEpsMonths > 0
      ? 'No action needed.'
      : 'Ensure your employer has submitted contributions.',
    lastChecked: data.as_of,
  });

  // Nomination
  items.push({
    id: 'nomination',
    label: 'Nomination',
    status: citizen.nomination.status === 'filed' ? 'verified' : 'action_needed',
    statusLabel: citizen.nomination.status === 'filed' ? 'Filed' : 'Not filed',
    explanation: citizen.nomination.status === 'filed'
      ? `Your nomination is filed with ${citizen.nomination.nominee_count} nominee${citizen.nomination.nominee_count > 1 ? 's' : ''} covering ${citizen.nomination.allocation_sum_percent}% allocation.`
      : 'You have not filed a nomination. This is important for your family\'s financial security.',
    whyItMatters: 'Nomination ensures your PF savings go to the right person in case of an emergency.',
    nextAction: citizen.nomination.status === 'filed'
      ? 'Review your nomination periodically to keep it current.'
      : 'File your e-Nomination through the member portal.',
    lastChecked: citizen.nomination.last_updated,
  });

  return items;
}

/**
 * Get all employments for a citizen.
 */
export function getEmployments(citizenId: string = DEFAULT_CITIZEN_ID): Employment[] {
  const citizen = getMember(citizenId);
  return citizen?.employments || [];
}

/**
 * Get KYC items for a citizen.
 */
export function getKYCItems(citizenId: string = DEFAULT_CITIZEN_ID): KYCItem[] {
  const citizen = getMember(citizenId);
  return citizen?.kyc || [];
}

/**
 * Get claims for a citizen.
 */
export function getClaims(citizenId: string = DEFAULT_CITIZEN_ID): Claim[] {
  const citizen = getMember(citizenId);
  return citizen?.claims || [];
}

/**
 * Get all service requests (claims + grievances + profile corrections) as unified list.
 */
export function getRequests(citizenId: string = DEFAULT_CITIZEN_ID): ServiceRequest[] {
  const citizen = getMember(citizenId);
  if (!citizen) return [];

  const requests: ServiceRequest[] = [];

  // Claims
  citizen.claims.forEach(claim => {
    const lastStatus = claim.status_history[claim.status_history.length - 1];
    requests.push({
      id: claim.claim_id_masked,
      type: 'claim',
      title: `${claim.form_type} — ${formatClaimReason(claim.claim_reason)}`,
      status: claim.status,
      statusLabel: formatStatus(claim.status),
      filedOn: claim.filed_on,
      lastUpdated: lastStatus?.at || claim.filed_on,
      description: claim.amount_requested
        ? `₹${claim.amount_requested.toLocaleString('en-IN')} requested`
        : claim.form_type,
    });
  });

  // Grievances
  citizen.grievances.forEach(grievance => {
    requests.push({
      id: grievance.registration_number_masked,
      type: 'grievance',
      title: `Grievance — ${grievance.category}`,
      status: grievance.status,
      statusLabel: formatStatus(grievance.status),
      filedOn: grievance.filed_on,
      lastUpdated: grievance.last_updated,
      description: `Routed to ${grievance.routed_office}`,
    });
  });

  // Profile corrections
  citizen.profile_workflows.forEach((pw, i) => {
    requests.push({
      id: `PWF-${citizenId}-${i}`,
      type: 'kyc_correction',
      title: `${pw.field} correction`,
      status: pw.status,
      statusLabel: formatStatus(pw.status),
      filedOn: pw.submitted_on,
      lastUpdated: pw.approved_on || pw.submitted_on,
      description: `Change ${pw.field} from masked value`,
    });
  });

  // Sort by last updated, most recent first
  requests.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

  return requests;
}

/**
 * Get synthetic notifications for a citizen.
 */
export function getNotifications(citizenId: string = DEFAULT_CITIZEN_ID): Notification[] {
  const citizen = getMember(citizenId);
  if (!citizen) return [];

  const notifications: Notification[] = [];

  // Generate notifications from claims
  citizen.claims.forEach(claim => {
    if (claim.status === 'under_process') {
      notifications.push({
        id: `notif-${claim.claim_id_masked}`,
        title: 'Claim is being processed',
        description: `Your ${claim.form_type} claim (${claim.claim_id_masked}) is under review. No action needed from you.`,
        type: 'info',
        timestamp: claim.status_history[claim.status_history.length - 1]?.at || claim.filed_on,
        read: false,
        linkTo: '/requests',
      });
    }
    if (claim.status === 'rejected') {
      notifications.push({
        id: `notif-${claim.claim_id_masked}`,
        title: 'Claim needs attention',
        description: `Your ${claim.form_type} claim was not approved. See what you need to do.`,
        type: 'action_needed',
        timestamp: claim.status_history[claim.status_history.length - 1]?.at || claim.filed_on,
        read: false,
        linkTo: '/recovery',
      });
    }
    if (claim.status === 'settled') {
      notifications.push({
        id: `notif-${claim.claim_id_masked}`,
        title: 'Claim settled',
        description: `Your ${claim.form_type} claim has been approved and payment has been processed.`,
        type: 'success',
        timestamp: claim.status_history[claim.status_history.length - 1]?.at || claim.filed_on,
        read: true,
        linkTo: '/requests',
      });
    }
  });

  // KYC-related notifications
  const pendingKyc = citizen.kyc.filter(k => k.status === 'pending_employer_approval');
  pendingKyc.forEach(k => {
    notifications.push({
      id: `notif-kyc-${k.type}`,
      title: `${k.type === 'bank' ? 'Bank account' : k.type.toUpperCase()} verification pending`,
      description: `Your ${k.type === 'bank' ? 'bank account' : k.type.toUpperCase()} update is waiting for employer approval.`,
      type: 'info',
      timestamp: k.submitted_on,
      read: false,
      linkTo: '/profile',
    });
  });

  const rejectedKyc = citizen.kyc.filter(k => k.status === 'rejected');
  rejectedKyc.forEach(k => {
    notifications.push({
      id: `notif-kyc-rejected-${k.type}`,
      title: `${k.type.toUpperCase()} verification rejected`,
      description: `Your ${k.type.toUpperCase()} could not be verified. Please resubmit with correct details.`,
      type: 'action_needed',
      timestamp: k.submitted_on,
      read: false,
      linkTo: '/services/kyc',
    });
  });

  // Sort by timestamp, most recent first
  notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return notifications;
}

/**
 * Get total EPF balance across all employments.
 */
export function getTotalBalance(citizenId: string = DEFAULT_CITIZEN_ID): number {
  const citizen = getMember(citizenId);
  if (!citizen) return 0;
  return citizen.employments.reduce((sum, e) => sum + e.current_epf_balance, 0);
}

/**
 * Get overall account health summary.
 */
export function getHealthSummary(citizenId: string = DEFAULT_CITIZEN_ID): {
  total: number;
  verified: number;
  actionNeeded: number;
  summary: string;
} {
  const items = getAccountHealth(citizenId);
  const verified = items.filter(i => i.status === 'verified' || i.status === 'not_applicable').length;
  const actionNeeded = items.filter(i => i.status === 'action_needed' || i.status === 'error').length;

  let summary: string;
  if (actionNeeded === 0) {
    summary = 'Ready for most services';
  } else if (actionNeeded === 1) {
    summary = '1 item needs attention';
  } else {
    summary = `${actionNeeded} items need attention`;
  }

  return { total: items.length, verified, actionNeeded, summary };
}

// Helpers

function kycToHealthStatus(kyc: KYCItem | undefined): HealthStatus {
  if (!kyc) return 'action_needed';
  switch (kyc.status) {
    case 'approved': return 'verified';
    case 'pending_employer_approval': return 'pending';
    case 'rejected': return 'error';
    case 'submitted': return 'pending';
    default: return 'action_needed';
  }
}

function kycStatusLabel(kyc: KYCItem | undefined): string {
  if (!kyc) return 'Not submitted';
  switch (kyc.status) {
    case 'approved': return 'Verified';
    case 'pending_employer_approval': return 'Pending employer approval';
    case 'rejected': return 'Rejected';
    case 'submitted': return 'Under verification';
    default: return kyc.status;
  }
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function formatClaimReason(reason: string): string {
  return reason.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function formatStatus(status: string): string {
  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Check claim eligibility for a citizen.
 * Uses current employment status and account health to determine available claim types.
 */
export function checkClaimEligibility(citizenId: string = DEFAULT_CITIZEN_ID): {
  isEligible: boolean;
  eligibleTypes: Array<{ id: string, label: string, description: string }>;
  blockers: string[];
} {
  const citizen = getMember(citizenId);
  if (!citizen) return { isEligible: false, eligibleTypes: [], blockers: ['Member not found'] };

  const health = getAccountHealth(citizenId);
  const criticalBlockers = health.filter(h => h.id !== 'nomination' && h.status !== 'verified' && h.status !== 'not_applicable');
  
  if (criticalBlockers.length > 0) {
    return {
      isEligible: false,
      eligibleTypes: [],
      blockers: criticalBlockers.map(b => b.explanation)
    };
  }

  const eligibleTypes = [];
  const currentEmployment = citizen.employments.find(e => e.employment_status === 'current');
  const closedEmployments = citizen.employments.filter(e => e.employment_status === 'closed');

  // If there's a closed employment with a Date of Exit, Final Settlement is allowed.
  if (closedEmployments.some(e => e.date_of_exit)) {
    eligibleTypes.push({
      id: 'form_19_10c',
      label: 'Final Settlement (Form 19 & 10C)',
      description: 'Withdraw your entire PF balance and pension (if eligible) after leaving a job.'
    });
  }

  // Active employment means PF Advance is allowed.
  if (currentEmployment || citizen.employments.length > 0) {
    eligibleTypes.push({
      id: 'form_31',
      label: 'PF Advance (Form 31)',
      description: 'Take a partial withdrawal for specific reasons like illness, marriage, or housing.'
    });
  }

  // Basic pension logic
  const totalEps = citizen.employments.reduce((sum, e) => sum + e.eps_service_months, 0);
  if (totalEps >= 120 && citizen.pension?.pension_status !== 'active') {
    eligibleTypes.push({
      id: 'form_10d',
      label: 'Monthly Pension (Form 10D)',
      description: 'Apply for regular monthly pension (requires 10+ years of eligible service).'
    });
  }

  return {
    isEligible: eligibleTypes.length > 0,
    eligibleTypes,
    blockers: []
  };
}

/**
 * Submit a mock claim and store it in-memory for the current session.
 */
export function submitMockClaim(
  formType: string, 
  reason: string, 
  amount: number,
  citizenId: string = DEFAULT_CITIZEN_ID
): { success: boolean, ackId: string } {
  const citizen = getMember(citizenId);
  if (!citizen) return { success: false, ackId: '' };

  const randomId = Math.floor(10000000 + Math.random() * 90000000).toString();
  const ackId = `CL-${randomId}`;

  const newClaim: Claim = {
    claim_id_masked: ackId,
    form_type: formType,
    claim_reason: reason,
    filed_on: new Date().toISOString(),
    amount_requested: amount,
    amount_approved: null,
    status: 'under_process',
    status_history: [
      { status: 'submitted', at: new Date().toISOString() },
      { status: 'under_process', at: new Date().toISOString() }
    ],
    rejection_code: null,
    payment_reference_suffix: null
  };

  // Push to the in-memory array for this session
  citizen.claims.unshift(newClaim);

  return { success: true, ackId };
}

/**
 * Submit a KYC correction and store it in-memory for the current session.
 */
export function submitKycCorrection(
  type: 'aadhaar' | 'pan' | 'bank',
  newValue: string,
  additionalDetails?: { bank_name?: string },
  citizenId: string = DEFAULT_CITIZEN_ID
): { success: boolean, ackId: string } {
  const citizen = getMember(citizenId);
  if (!citizen) return { success: false, ackId: '' };

  const randomId = Math.floor(10000000 + Math.random() * 90000000).toString();
  const ackId = `KYC-${randomId}`;

  // Find existing KYC record or create one
  const existingIndex = citizen.kyc.findIndex(k => k.type === type);
  
  // Determine new status based on type
  // Bank requires employer approval, Aadhaar/PAN require EPFO/UIDAI verification
  const newStatus = type === 'bank' ? 'pending_employer_approval' : 'submitted';
  
  const updatedRecord: KYCItem = {
    type,
    value_masked: newValue.length > 4 ? `********${newValue.slice(-4)}` : newValue,
    status: newStatus,
    submitted_on: new Date().toISOString(),
    bank_name: additionalDetails?.bank_name,
    rejection_reason: undefined,
    approved_on: undefined
  };

  if (existingIndex >= 0) {
    citizen.kyc[existingIndex] = updatedRecord;
  } else {
    citizen.kyc.push(updatedRecord);
  }

  // Also push a tracking record to claims (since RequestsPage aggregates from claims in our mock setup)
  const trackingRecord: Claim = {
    claim_id_masked: ackId,
    form_type: `KYC Update - ${type.toUpperCase()}`,
    claim_reason: 'Identity Correction',
    filed_on: new Date().toISOString(),
    amount_requested: 0,
    amount_approved: null,
    status: newStatus === 'pending_employer_approval' ? 'pending_employer' : 'under_process',
    status_history: [
      { status: 'submitted', at: new Date().toISOString() },
      { status: newStatus === 'pending_employer_approval' ? 'pending_employer' : 'under_process', at: new Date().toISOString() }
    ],
    rejection_code: null,
    payment_reference_suffix: null
  };
  
  citizen.claims.unshift(trackingRecord);

  return { success: true, ackId };
}

// ─────────────────────────────────────────────────────────────────────────────
// TRANSFER SERVICE FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

// In-memory transfer request store (session-only)
const _transferRequests: TransferRequest[] = [];

/**
 * The demo member for Transfer is CIT-016 (has both current + closed employment).
 * Callers can override with any citizen ID.
 */
export const TRANSFER_DEMO_CITIZEN_ID = 'CIT-016';

/**
 * Evaluate transfer readiness for a given source employment.
 * The `scenario` parameter allows simulating edge cases:
 *   'missing_doe' — simulate a missing Date of Exit
 *   'kyc_blocked' — simulate a KYC dependency blocker
 *   'ready'       — all checks pass (default)
 */
export function getTransferReadiness(
  citizenId: string = TRANSFER_DEMO_CITIZEN_ID,
  sourceEmploymentCode?: string,
  scenario: 'ready' | 'missing_doe' | 'kyc_blocked' | 'multiple_uan' = 'ready'
): TransferReadiness {
  const citizen = getMember(citizenId);
  if (!citizen) return { isReady: false, checks: [], blockerCount: 0 };

  const closedEmployments = citizen.employments.filter(e => e.employment_status === 'closed');
  const currentEmployment = citizen.employments.find(e => e.employment_status === 'current');
  const sourceEmp = sourceEmploymentCode
    ? closedEmployments.find(e => e.establishment.establishment_code === sourceEmploymentCode)
    : closedEmployments[0];

  const checks: ReadinessCheck[] = [];

  // 1. Date of Exit
  if (scenario === 'missing_doe') {
    checks.push({
      id: 'date_of_exit',
      label: 'Date of Exit',
      status: 'blocked',
      statusLabel: 'Missing',
      explanation: 'Your previous employment does not have a Date of Exit recorded.',
      what: 'Your previous employment record does not have a Date of Exit.',
      why: 'EPFO requires a valid Date of Exit before a transfer can be processed. Without it, the system cannot confirm when your previous employment ended.',
      who: 'Your previous employer is responsible for recording the Date of Exit.',
      next: 'Contact your previous employer\'s HR department and ask them to update the Date of Exit in the EPFO employer portal.',
      effect: 'Once the Date of Exit is recorded, you can return here and submit the transfer.',
      fixPath: '/help',
    });
  } else {
    const hasDateOfExit = sourceEmp?.date_of_exit != null;
    checks.push({
      id: 'date_of_exit',
      label: 'Date of Exit',
      status: hasDateOfExit ? 'ready' : 'blocked',
      statusLabel: hasDateOfExit ? `Recorded — ${formatDate(sourceEmp!.date_of_exit!)}` : 'Missing',
      explanation: hasDateOfExit
        ? `Your Date of Exit from the previous employer is recorded as ${formatDate(sourceEmp!.date_of_exit!)}.`
        : 'Your previous employment does not have a Date of Exit on record.',
      what: hasDateOfExit ? undefined : 'Your previous employment record does not have a Date of Exit.',
      why: hasDateOfExit ? undefined : 'EPFO requires a valid Date of Exit before a transfer can be processed.',
      who: hasDateOfExit ? undefined : 'Your previous employer is responsible for this record.',
      next: hasDateOfExit ? undefined : 'Contact your previous employer\'s HR and ask them to update the Date of Exit.',
      effect: hasDateOfExit ? undefined : 'Once corrected, you can return here and submit the transfer.',
      fixPath: hasDateOfExit ? undefined : '/help',
    });
  }

  // 2. KYC / Bank
  if (scenario === 'kyc_blocked') {
    checks.push({
      id: 'bank_kyc',
      label: 'Bank account',
      status: 'blocked',
      statusLabel: 'Not verified',
      explanation: 'Your bank account has not been verified. It must be active and verified before transfer funds can be credited.',
      what: 'Your bank account is not verified in EPFO records.',
      why: 'Transfer proceeds are credited to your verified bank account.',
      who: 'You need to complete the bank account verification through KYC.',
      next: 'Verify your bank account in the KYC section, then return to the transfer.',
      effect: 'Once your bank is verified, the transfer can proceed.',
      fixPath: '/services/kyc?fix=bank',
    });
  } else {
    const bank = citizen.kyc.find(k => k.type === 'bank');
    const bankReady = bank?.status === 'approved';
    checks.push({
      id: 'bank_kyc',
      label: 'Bank account',
      status: bankReady ? 'ready' : 'blocked',
      statusLabel: bankReady ? 'Verified' : bank?.status === 'pending_employer_approval' ? 'Pending approval' : 'Not verified',
      explanation: bankReady
        ? `Your bank account (${bank!.value_masked}) is verified and ready to receive funds.`
        : bank?.status === 'pending_employer_approval'
          ? 'Your bank account update is pending employer approval.'
          : 'Your bank account has not been verified.',
      what: bankReady ? undefined : 'Your bank account is not in a verified state.',
      why: bankReady ? undefined : 'Transfer proceeds are credited to your verified bank account.',
      who: bankReady ? undefined : bank?.status === 'pending_employer_approval' ? 'Your employer' : 'You',
      next: bankReady ? undefined : bank?.status === 'pending_employer_approval' ? 'Wait for your employer to approve the bank update.' : 'Verify your bank account in KYC.',
      effect: bankReady ? undefined : 'Once verified, the transfer can proceed.',
      fixPath: bankReady ? undefined : '/services/kyc?fix=bank',
    });
  }

  // 3. EPS / Service record
  const epsMonths = sourceEmp?.eps_service_months ?? 0;
  checks.push({
    id: 'service_record',
    label: 'Service / pension record',
    status: epsMonths > 0 ? 'ready' : 'warning',
    statusLabel: epsMonths > 0 ? `${epsMonths} months of service` : 'No service recorded',
    explanation: epsMonths > 0
      ? `Your pension and service record shows ${epsMonths} months of eligible service at the previous employer. This will carry forward.`
      : 'No EPS service months are recorded for this employment. Your pension record may need to be reviewed.',
    what: epsMonths > 0 ? undefined : 'No EPS service months are recorded for this employment.',
    why: epsMonths > 0 ? undefined : 'Your service history affects pension continuity.',
    who: epsMonths > 0 ? undefined : 'EPFO / previous employer',
    next: epsMonths > 0 ? undefined : 'Contact your previous employer or the relevant EPFO office to confirm service records.',
  });

  // 4. Current employer account
  const hasCurrentEmp = currentEmployment != null;
  checks.push({
    id: 'current_employer',
    label: 'Current employer account',
    status: hasCurrentEmp ? 'ready' : 'blocked',
    statusLabel: hasCurrentEmp ? `Active — ${currentEmployment!.establishment.name.replace(' (synthetic)', '')}` : 'No active account found',
    explanation: hasCurrentEmp
      ? `You have an active account with your current employer. The PF will be transferred into this account.`
      : 'You do not have an active current employer account. Transfer requires a destination account.',
    what: hasCurrentEmp ? undefined : 'You have no current active employer PF account.',
    why: hasCurrentEmp ? undefined : 'The transfer needs a destination active account to credit funds into.',
    who: hasCurrentEmp ? undefined : 'Your current employer / EPFO',
    next: hasCurrentEmp ? undefined : 'Ensure your current employer has registered you with EPFO.',
  });

  // 5. Duplicate / in-flight check
  const existingTransfer = _transferRequests.find(t =>
    t.from_employment_member_id === sourceEmp?.member_id_masked &&
    (t.status === 'submitted' || t.status === 'under_review')
  );
  checks.push({
    id: 'no_duplicate',
    label: 'No existing transfer request',
    status: existingTransfer ? 'blocked' : 'ready',
    statusLabel: existingTransfer ? 'Transfer already submitted' : 'No existing request',
    explanation: existingTransfer
      ? `You have already submitted a transfer request (${existingTransfer.ack_id}) that is currently being processed.`
      : 'No pending transfer request found for this employment.',
    what: existingTransfer ? 'A transfer request is already in progress for this account.' : undefined,
    why: existingTransfer ? 'Duplicate transfers are not allowed while a request is being processed.' : undefined,
    next: existingTransfer ? `Track the status of ${existingTransfer.ack_id}.` : undefined,
    fixPath: existingTransfer ? `/requests/${existingTransfer.ack_id}` : undefined,
  });

  const blockers = checks.filter(c => c.status === 'blocked');
  return {
    isReady: blockers.length === 0,
    checks,
    blockerCount: blockers.length,
  };
}

/**
 * Submit a mock transfer request and store it in session memory.
 */
export function submitMockTransfer(
  citizenId: string = TRANSFER_DEMO_CITIZEN_ID,
  sourceEmploymentCode: string
): { success: boolean; transfer: TransferRequest | null } {
  const citizen = getMember(citizenId);
  if (!citizen) return { success: false, transfer: null };

  const sourceEmp = citizen.employments.find(
    e => e.establishment.establishment_code === sourceEmploymentCode && e.employment_status === 'closed'
  );
  const currentEmp = citizen.employments.find(e => e.employment_status === 'current');

  if (!sourceEmp || !currentEmp) return { success: false, transfer: null };

  const now = new Date().toISOString();
  const ts = now.replace(/\D/g, '').slice(4, 12); // 8-digit timestamp segment
  const ackId = `TRF-${ts}`;

  const transfer: TransferRequest = {
    transfer_id: ackId,
    ack_id: ackId,
    from_employment_member_id: sourceEmp.member_id_masked,
    from_establishment_name: sourceEmp.establishment.name.replace(' (synthetic)', ''),
    from_date_of_joining: sourceEmp.date_of_joining,
    from_date_of_exit: sourceEmp.date_of_exit!,
    to_establishment_name: currentEmp.establishment.name.replace(' (synthetic)', ''),
    to_member_id: currentEmp.member_id_masked,
    submitted_on: now,
    status: 'submitted',
    status_history: [
      { status: 'submitted', label: 'Request submitted', at: now, note: 'Transfer request received by EPFO.' },
    ],
    epf_amount_transferred: sourceEmp.current_epf_balance,
    eps_months_transferred: sourceEmp.eps_service_months,
  };

  _transferRequests.push(transfer);

  // Also push a tracking claim for Requests page
  const trackingRecord: Claim = {
    claim_id_masked: ackId,
    form_type: 'Form 13 — PF Transfer',
    claim_reason: 'Job Change / PF Transfer',
    filed_on: now,
    amount_requested: sourceEmp.current_epf_balance,
    amount_approved: null,
    status: 'under_process',
    status_history: [
      { status: 'submitted', at: now },
      { status: 'under_process', at: now },
    ],
    rejection_code: null,
    payment_reference_suffix: null,
  };
  citizen.claims.unshift(trackingRecord);

  return { success: true, transfer };
}

/**
 * Get all transfer requests for a citizen (session + mock pre-seeded).
 */
export function getTransferRequests(citizenId: string = TRANSFER_DEMO_CITIZEN_ID): TransferRequest[] {
  // Return in-session transfers for this citizen
  const citizen = getMember(citizenId);
  if (!citizen) return [];
  // Filter transfers whose "to" account belongs to this citizen (simple session store)
  return _transferRequests;
}

/**
 * Get a specific transfer request by ACK ID.
 */
export function getTransferById(ackId: string): TransferRequest | null {
  return _transferRequests.find(t => t.ack_id === ackId) || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// FAILURE DIAGNOSTICS & RECOVERY
// ─────────────────────────────────────────────────────────────────────────────

export function getRequestDetail(id: string, citizenId: string = DEFAULT_CITIZEN_ID): any {
  const citizen = getMember(citizenId);
  if (!citizen) return null;

  const claim = citizen.claims.find(c => c.claim_id_masked === id);
  if (claim) return claim;

  const grievance = citizen.grievances.find(g => g.registration_number_masked === id);
  if (grievance) return grievance;

  const pwRecord = citizen.profile_workflows.find((_, i) => `PWF-${citizenId}-${i}` === id);
  if (pwRecord) return pwRecord;

  return null;
}

export function diagnoseFailure(requestId: string, citizenId: string = DEFAULT_CITIZEN_ID): FailureDiagnosis | null {
  const request = getRequestDetail(requestId, citizenId);
  if (!request) return null;

  // Is it a claim?
  if (request.claim_id_masked) {
    if (request.status === 'rejected' && request.rejection_code === 'NAME_MISMATCH_BANK') {
      return {
        code: 'NAME_MISMATCH_BANK',
        userFacingCause: 'The name on your EPFO account does not exactly match the name on your bank account.',
        owner: 'member',
        actionRequired: 'Update your Bank KYC or submit a Joint Declaration.',
        nextStep: 'Once names match, re-submit the claim.',
        evidenceRequired: {
          document: 'Joint Declaration Form',
          why: 'Required to correct name mismatch between EPFO and Bank records',
          status: 'missing',
          canUpload: true
        },
        resumableJourney: { type: 'kyc', path: '/services/kyc?fix=bank', label: 'Update Bank Details' }
      };
    }
    
    if (request.status === 'rejected' && request.rejection_code === 'DOE_MISSING') {
      return {
        code: 'DOE_MISSING',
        userFacingCause: 'Your claim cannot be processed because the Date of Exit is missing for your previous employment.',
        owner: 'employer',
        actionRequired: 'Request a Date-of-Exit correction from your previous employer.',
        nextStep: 'Return to your claim and check readiness again after it is corrected.',
        supportBridge: { type: 'grievance', label: 'File Grievance Against Employer', prefillData: { category: 'Date of Exit Update', entity: 'Employer' } }
      };
    }
    
    if (request.form_type?.includes('Transfer') && request.status === 'rejected') {
      return {
        code: 'SERVICE_MISMATCH',
        userFacingCause: 'Your transfer was rejected because your previous employer reported conflicting service dates.',
        owner: 'epfo',
        actionRequired: 'Request EPFO to reconcile your service dates with your previous employer.',
        nextStep: 'Wait for the reconciliation to complete before attempting the transfer again.',
        supportBridge: { type: 'grievance', label: 'Raise Issue with EPFO Field Office', prefillData: { category: 'Transfer Rejection', entity: 'EPFO' } },
        resumableJourney: { type: 'transfer', path: '/services/transfer', label: 'Return to Transfer' }
      };
    }
    
    if (request.form_type?.includes('KYC') && request.status === 'rejected') {
      return {
        code: 'DOC_UNCLEAR',
        userFacingCause: 'Your KYC document could not be verified by the issuing authority because the image or details were unclear.',
        owner: 'member',
        actionRequired: 'Upload a clear copy of your document or ensure the details match exactly.',
        nextStep: 'We will verify the new document within 3-5 days.',
        evidenceRequired: {
          document: 'Clear scanned copy of KYC document',
          why: 'Required by issuing authority for verification',
          status: 'rejected',
          canUpload: true
        },
        resumableJourney: { type: 'kyc', path: '/services/kyc', label: 'Retry KYC' }
      };
    }
  }

  // Not a recoverable failure we mock currently
  return null;
}

// Seed deterministic failures to the demo user for testing Recovery
export function seedMockFailures(citizenId: string = DEFAULT_CITIZEN_ID) {
  const citizen = getMember(citizenId);
  if (!citizen) return;

  // Add DOE_MISSING Claim if it doesn't exist
  if (!citizen.claims.some(c => c.rejection_code === 'DOE_MISSING')) {
    citizen.claims.push({
      claim_id_masked: 'CL-88992211',
      form_type: 'Form 19 — Final Settlement',
      claim_reason: 'Final Settlement',
      filed_on: new Date(Date.now() - 10 * 86400000).toISOString(),
      amount_requested: 45000,
      amount_approved: null,
      status: 'rejected',
      status_history: [
        { status: 'submitted', at: new Date(Date.now() - 10 * 86400000).toISOString() },
        { status: 'rejected', at: new Date(Date.now() - 5 * 86400000).toISOString() }
      ],
      rejection_code: 'DOE_MISSING',
      payment_reference_suffix: null
    });
  }

  // Add Rejected Claim (Bank Mismatch)
  if (!citizen.claims.some(c => c.rejection_code === 'NAME_MISMATCH_BANK')) {
    citizen.claims.push({
      claim_id_masked: 'CL-99887766',
      form_type: 'Form 31 — PF Advance',
      claim_reason: 'Illness',
      filed_on: new Date(Date.now() - 30 * 86400000).toISOString(),
      amount_requested: 15000,
      amount_approved: null,
      status: 'rejected',
      status_history: [
        { status: 'submitted', at: new Date(Date.now() - 30 * 86400000).toISOString() },
        { status: 'rejected', at: new Date(Date.now() - 25 * 86400000).toISOString() }
      ],
      rejection_code: 'NAME_MISMATCH_BANK',
      payment_reference_suffix: null
    });
  }

  // Add Rejected Transfer if it doesn't exist
  if (!citizen.claims.some(c => c.form_type.includes('Transfer') && c.status === 'rejected')) {
    citizen.claims.push({
      claim_id_masked: 'TRF-77665544',
      form_type: 'Form 13 — PF Transfer',
      claim_reason: 'Job Change / PF Transfer',
      filed_on: new Date(Date.now() - 20 * 86400000).toISOString(),
      amount_requested: 12000,
      amount_approved: null,
      status: 'rejected',
      status_history: [
        { status: 'submitted', at: new Date(Date.now() - 20 * 86400000).toISOString() },
        { status: 'rejected', at: new Date(Date.now() - 15 * 86400000).toISOString() }
      ],
      rejection_code: 'SERVICE_MISMATCH',
      payment_reference_suffix: null
    });
  }
  
  // Add Rejected KYC if it doesn't exist
  if (!citizen.claims.some(c => c.form_type.includes('KYC') && c.status === 'rejected')) {
    citizen.claims.push({
      claim_id_masked: 'KYC-55443322',
      form_type: 'KYC Update - PAN',
      claim_reason: 'Identity Correction',
      filed_on: new Date(Date.now() - 8 * 86400000).toISOString(),
      amount_requested: 0,
      amount_approved: null,
      status: 'rejected',
      status_history: [
        { status: 'submitted', at: new Date(Date.now() - 8 * 86400000).toISOString() },
        { status: 'rejected', at: new Date(Date.now() - 2 * 86400000).toISOString() }
      ],
      rejection_code: 'DOC_UNCLEAR',
      payment_reference_suffix: null
    });
  }
}

