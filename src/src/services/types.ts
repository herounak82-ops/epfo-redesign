/* TypeScript interfaces matching the mock data schema from data/epfo_mock_package/ */

export interface Contact {
  mobile_masked: string;
  email: string;
  mobile_verified: boolean;
}

export interface Address {
  city: string;
  state: string;
  country: string;
}

export interface KYCItem {
  type: 'aadhaar' | 'pan' | 'bank';
  value_masked: string;
  bank_name?: string;
  ifsc?: string;
  status: 'approved' | 'pending_employer_approval' | 'rejected' | 'submitted';
  verification_source?: string;
  submitted_on: string;
  approved_on?: string;
  rejection_reason?: string;
}

export interface Nomination {
  status: 'filed' | 'not_filed';
  last_updated?: string;
  nominee_count: number;
  allocation_sum_percent: number;
}

export interface LedgerEntry {
  wage_month: string;
  transaction_type: 'monthly_contribution' | 'annual_interest' | 'transfer_credit';
  gross_wages: number | null;
  epf_wages: number | null;
  eps_wages: number | null;
  edli_wages: number | null;
  employee_share: number;
  employer_epf_share: number;
  eps_share: number;
  interest_credited: number;
  source: string;
  posting_status: 'posted' | 'pending';
}

export interface Establishment {
  establishment_code: string;
  name: string;
  sector: string;
  region_code: string;
  office_code: string;
  pf_office: string;
}

export interface Employment {
  member_id_masked: string;
  member_id_components: {
    region_code: string;
    office_code: string;
    establishment_code: string;
    extension_code: string;
    member_number: string;
  };
  establishment: Establishment;
  date_of_joining: string;
  date_of_exit: string | null;
  exit_reason: string | null;
  employment_status: 'current' | 'closed' | 'transferred';
  basic_plus_da_monthly: number;
  current_epf_balance: number;
  eps_service_months: number;
  passbook_last_posted_wage_month: string;
  transfer_status: string;
  ledger: LedgerEntry[];
}

export interface ClaimStatusEntry {
  status: string;
  at: string;
}

export interface Claim {
  claim_id_masked: string;
  form_type: string;
  claim_reason: string;
  filed_on: string;
  amount_requested: number;
  amount_approved: number | null;
  status: string;
  status_history: ClaimStatusEntry[];
  rejection_code: string | null;
  payment_reference_suffix: string | null;
}

export interface Pension {
  eps_service_months: number;
  eps_service_years_approx: number;
  pensionable_salary_average_last_60_months: number;
  ppo_masked: string | null;
  pension_status: string;
  formula_note: string;
}

export interface Grievance {
  registration_number_masked: string;
  category: string;
  routed_office: string;
  status: string;
  filed_on: string;
  last_updated: string;
  reminder_count: number;
  document_count: number;
}

export interface ProfileWorkflow {
  type: string;
  field: string;
  old_value_masked: string;
  new_value_masked: string;
  status: string;
  submitted_on: string;
  approved_on?: string;
}

export interface IntentJourney {
  intent: string;
  required_information: string[];
  action: string;
  result: string;
  demo_outcome: string;
}

export interface Citizen {
  synthetic_citizen_id: string;
  record_status: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  marital_status: string;
  father_or_spouse_name: string;
  contact: Contact;
  address: Address;
  uan_masked: string;
  uan_status: 'active' | 'not_activated' | 'suspended';
  uan_source: string;
  aadhaar_last4: string;
  pan_masked: string;
  kyc: KYCItem[];
  nomination: Nomination;
  employments: Employment[];
  claims: Claim[];
  pension: Pension;
  grievances: Grievance[];
  profile_workflows: ProfileWorkflow[];
  life_certificate: unknown | null;
  intent_journey: IntentJourney;
  narrative: string;
  generated_at: string;
}

export interface MockData {
  schema_version: string;
  dataset_type: string;
  as_of: string;
  privacy_notice: string;
  policy_config: {
    policy_config_id: string;
    effective_as_of: string;
    is_official: boolean;
    note: string;
  };
  employers: Establishment[];
  citizens: Citizen[];
}

/* Account Health types */
export type HealthStatus = 'verified' | 'action_needed' | 'error' | 'pending' | 'not_applicable';

export interface AccountHealthItem {
  id: string;
  label: string;
  status: HealthStatus;
  statusLabel: string;
  explanation: string;
  whyItMatters: string;
  nextAction: string;
  responsibleParty?: string;
  lastChecked?: string;
}

/* Request types for unified display */
export interface ServiceRequest {
  id: string;
  type: 'claim' | 'transfer' | 'kyc_correction' | 'grievance';
  title: string;
  status: string;
  statusLabel: string;
  filedOn: string;
  lastUpdated: string;
  description: string;
}

/* Notification */
export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'action_needed' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
  linkTo?: string;
}

/* Transfer readiness check */
export type ReadinessStatus = 'ready' | 'blocked' | 'warning' | 'not_applicable';

export interface ReadinessCheck {
  id: string;
  label: string;
  status: ReadinessStatus;
  statusLabel: string;
  explanation: string;
  // WHAT / WHY / WHO / NEXT / EFFECT for blockers
  what?: string;
  why?: string;
  who?: string;
  next?: string;
  effect?: string;
  fixPath?: string;
}

export interface TransferReadiness {
  isReady: boolean;
  checks: ReadinessCheck[];
  blockerCount: number;
}

/* In-session transfer request */
export interface TransferStatusEntry {
  status: string;
  label: string;
  at: string;
  note?: string;
}

export interface TransferRequest {
  transfer_id: string;
  from_employment_member_id: string;
  from_establishment_name: string;
  from_date_of_joining: string;
  from_date_of_exit: string;
  to_establishment_name: string;
  to_member_id: string;
  submitted_on: string;
  status: 'submitted' | 'under_review' | 'needs_employer_action' | 'needs_epfo_action' | 'completed' | 'rejected';
  status_history: TransferStatusEntry[];
  epf_amount_transferred: number;
  eps_months_transferred: number;
  ack_id: string;
}

/* Diagnostic / Failure Recovery */

export type Owner = 'member' | 'employer' | 'epfo' | 'bank' | 'system' | 'unknown';

export interface ResumableJourney {
  type: 'claim' | 'kyc' | 'transfer' | 'account';
  path: string;
  label: string;
}

export interface SupportBridge {
  type: 'grievance' | 'help';
  label: string;
  prefillData?: any;
}

export interface EvidenceRequired {
  document: string;
  why: string;
  status: 'missing' | 'uploaded' | 'rejected';
  canUpload: boolean;
}

export interface FailureDiagnosis {
  code: string;
  userFacingCause: string;
  technicalCause?: string;
  owner: Owner;
  actionRequired: string;
  nextStep: string;
  evidenceRequired?: EvidenceRequired;
  resumableJourney?: ResumableJourney;
  supportBridge?: SupportBridge;
}
