import { ActionHistoryStatus } from './enum'
import { ActionHistory, TransactionHistory } from './interfaces'

export const accreditationHistoryRejected: ActionHistory[] = [
  {
    name: 'Pass Accreditation',
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime(),
  },
  {
    name: 'Pass Accreditation',
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 1000,
  },
  {
    name: 'KYC',
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 2000,
  },
]

export const accreditationHistoryPending: ActionHistory[] = [
  {
    name: 'Pass Accreditation',
    status: ActionHistoryStatus.PENDING,
    date: new Date().getTime(),
  },
  {
    name: 'Pass Accreditation',
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 1000,
  },
  {
    name: 'KYC',
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 2000,
  },
  {
    name: 'Pass Accreditation',
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 100,
  },
  {
    name: 'KYC',
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 200,
  },
  {
    name: 'Pass Accreditation',
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 10,
  },
  {
    name: 'KYC',
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 20,
  },
  {
    name: 'Pass Accreditation',
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 1,
  },
  {
    name: 'KYC',
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 2,
  },
]

export const accreditationHistoryApproved: ActionHistory[] = [
  {
    name: 'Pass Accreditation',
    status: ActionHistoryStatus.APPROVED,
    date: new Date().getTime(),
  },
  {
    name: 'Pass Accreditation',
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 1000,
  },
  {
    name: 'KYC',
    status: ActionHistoryStatus.APPROVED,
    date: new Date().getTime() - 2000,
  },
]

export const transactionHistory: TransactionHistory[] = [
  {
    name: 'Deposit',
    status: ActionHistoryStatus.APPROVED,
    sum: '+820',
    sender: '234235y372rtfto3478bf84tr9743t',
    receiver: '0x38374773247348339393939393 ',
    date: new Date().getTime(),
  },
  {
    name: 'Withdraw',
    sum: '-820',
    receiver: '0x38374773247348339393939393 ',
    status: ActionHistoryStatus.PENDING,
    date: new Date().getTime() - 1000,
  },
  {
    name: 'Deposit',
    status: ActionHistoryStatus.REJECTED,
    sum: '+820',
    sender: '234235y372rtfto3478bf84tr9743t',
    receiver: '0x38374773247348339393939393 ',
    date: new Date().getTime() - 2000,
  },
  {
    name: 'Withdraw',
    sum: '-820',
    receiver: '0x38374773247348339393939393 ',
    status: ActionHistoryStatus.APPROVED,
    date: new Date().getTime() - 3000,
  },
]
