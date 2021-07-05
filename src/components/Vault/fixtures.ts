import { ActionHistory } from './interfaces'

export const accreditationHistory: ActionHistory[] = [
  {
    name: 'Pass Accreditation',
    status: 'Rejected',
    date: new Date().getTime(),
  },
  {
    name: 'Pass Accreditation',
    status: 'Rejected',
    date: new Date().getTime() - 1000,
  },
  {
    name: 'KYC',
    status: 'Approved',
    date: new Date().getTime() - 2000,
  },
]
