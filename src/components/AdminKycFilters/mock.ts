export type KYCIdentity = 'individual' | 'corporate' | '' | null // null for placeholder

export type IdentityOption = {
  label: string
  value: KYCIdentity
}

export const identityOptions: IdentityOption[] = [
  { label: 'All', value: '' },
  { label: 'Individual', value: 'individual' },
  { label: 'Corporate', value: 'corporate' },
]

export const ButtonStatusText: any = {
  approved: 'Approved',
  rejected: 'Declined',
  pending: 'Pending',
  total: 'Total',
  'changes-requested': 'Change requested',
}
