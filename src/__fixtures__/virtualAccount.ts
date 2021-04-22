import { AssignedVirtualAccount } from 'app/pages/admin/components/AssignedVirtualAccountsTable/AssignedVirtualAccountsTable'
import { user } from '__fixtures__/user'

export const assignedVirtualAccount: AssignedVirtualAccount = {
  assignedAt: '',
  user: user,
  accountNumber: '0000001',
  currency: 'SGD',
  balance: {
    available: 10000,
    onHold: 1000,
    outstanding: 1000
  }
}
