import { render, cleanup } from 'test-utils'
import {
  renderCommitmentDSOLogo,
  renderCommitmentDSOFundRaisingAmount,
  renderCommitmentDSOExpectedReturn,
  renderCommitted
} from 'app/pages/accounts/components/Commitments/commitmentsColumns'
import { commitment } from '__fixtures__/authorizer'
import {
  renderDSONameAndStructure,
  renderExpectedReturn,
  renderTotalFundraisingAmount
} from 'app/pages/invest/components/DSOTable/columns'
import { formatMoney } from 'helpers/numbers'

jest.mock('app/pages/invest/components/DSOTable/columns', () => ({
  renderDSONameAndStructure: jest.fn(() => null),
  renderExpectedReturn: jest.fn(() => null),
  renderTotalFundraisingAmount: jest.fn(() => null)
}))

jest.mock('helpers/numbers', () => ({
  formatMoney: jest.fn(() => null)
}))

describe('commitmentsColumns', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders renderCommitmentDSOLogo correctly', async () => {
    render(renderCommitmentDSOLogo(undefined, commitment))
    expect(renderDSONameAndStructure).toHaveBeenCalledWith(
      commitment.dso.tokenName,
      commitment.dso,
      50
    )
  })

  it('renders renderCommitmentDSOFundRaisingAmount correctly', async () => {
    render(renderCommitmentDSOFundRaisingAmount(undefined, commitment))
    expect(renderTotalFundraisingAmount).toHaveBeenCalledWith(
      commitment.dso.totalFundraisingAmount,
      commitment.dso
    )
  })

  it('renders renderCommitmentDSOFundRaisingAmount correctly when FundraisingAmount is null', async () => {
    const commitTest = {
      ...commitment,
      dso: { ...commitment.dso, totalFundraisingAmount: null }
    }
    render(renderCommitmentDSOFundRaisingAmount(undefined, commitTest))
    expect(renderTotalFundraisingAmount).toHaveBeenCalledWith(0, commitTest.dso)
  })

  it('renders renderCommitmentDSOExpectedReturn correctly', async () => {
    render(renderCommitmentDSOExpectedReturn(undefined, commitment))
    expect(renderExpectedReturn).toHaveBeenCalledWith(
      commitment.dso.interestRate,
      commitment.dso
    )
  })

  it('renders renderCommitmentDSOExpectedReturn correctly when interestRate is undefined', async () => {
    const commitTest = {
      ...commitment,
      dso: { ...commitment.dso, interestRate: undefined }
    }
    render(renderCommitmentDSOExpectedReturn(undefined, commitTest))
    expect(renderExpectedReturn).toHaveBeenCalledWith(0, commitTest.dso)
  })

  it('renders renderCommitted correctly', async () => {
    render(renderCommitted(1000, commitment))
    expect(formatMoney).toHaveBeenCalledWith(
      1000,
      commitment.dso.currency.symbol,
      true
    )
  })
})
