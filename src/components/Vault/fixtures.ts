import { ActionHistoryStatus, ActionTypes } from './enum'
import { ActionHistory, TransactionHistory } from './interfaces'

export const accreditationHistoryRejected: ActionHistory[] = [
  {
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 1,
    type: ActionTypes.ACCREDITATION,
  },
  {
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 2,
    type: ActionTypes.ACCREDITATION,
  },
  {
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 3,
    type: ActionTypes.KYC,
  },
]

export const accreditationHistoryPending: ActionHistory[] = [
  {
    status: ActionHistoryStatus.PENDING,
    date: new Date().getTime() - 4,
    type: ActionTypes.ACCREDITATION,
  },
  {
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 5,
    type: ActionTypes.ACCREDITATION,
  },
  {
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 6,
    type: ActionTypes.KYC,
  },
  {
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 7,
    type: ActionTypes.ACCREDITATION,
  },
  {
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 8,
    type: ActionTypes.KYC,
  },
  {
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 9,
    type: ActionTypes.ACCREDITATION,
  },
  {
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 10,
    type: ActionTypes.KYC,
  },
  {
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 11,
    type: ActionTypes.ACCREDITATION,
  },
  {
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 12,
    type: ActionTypes.KYC,
  },
]

export const accreditationHistoryApproved: ActionHistory[] = [
  {
    status: ActionHistoryStatus.APPROVED,
    date: new Date().getTime() - 13,
    type: ActionTypes.ACCREDITATION,
  },
  {
    status: ActionHistoryStatus.REJECTED,
    date: new Date().getTime() - 14,
    type: ActionTypes.ACCREDITATION,
  },
  {
    status: ActionHistoryStatus.APPROVED,
    date: new Date().getTime() - 15,
    type: ActionTypes.KYC,
  },
]

export const transactionHistory: TransactionHistory[] = [
  {
    status: ActionHistoryStatus.APPROVED,
    sum: '+820',
    sender: '0xceD04c7926eA0a240e1fC5FD2BeFDAB924F26962',
    receiver: '0xceD04c7926eA0a240e1fC5FD2BeFDAB924F26962',
    date: new Date().getTime() - 16,
    type: ActionTypes.DEPOSIT,
  },
  {
    sum: '-820',
    receiver: '0xceD04c7926eA0a240e1fC5FD2BeFDAB924F26962',
    status: ActionHistoryStatus.PENDING,
    date: new Date().getTime() - 17,
    type: ActionTypes.WITHDRAW,
  },
  {
    status: ActionHistoryStatus.REJECTED,
    sum: '+820',
    sender: '0xceD04c7926eA0a240e1fC5FD2BeFDAB924F26962',
    receiver: '0xceD04c7926eA0a240e1fC5FD2BeFDAB924F26962',
    date: new Date().getTime() - 18,
    type: ActionTypes.DEPOSIT,
  },
  {
    sum: '-820',
    receiver: '0xceD04c7926eA0a240e1fC5FD2BeFDAB924F26962',
    status: ActionHistoryStatus.APPROVED,
    date: new Date().getTime() - 19,
    type: ActionTypes.WITHDRAW,
  },
]
