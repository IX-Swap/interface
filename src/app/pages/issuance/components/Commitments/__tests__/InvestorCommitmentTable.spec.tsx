import React from 'react'
import { render, renderWithUserStore } from 'test-utils'
import { CommitmentTableFilter } from 'app/pages/issuance/components/Commitments/CommitmentTableFilters'
import { TableView } from 'components/TableWithPagination/TableView'
import { InvestorCommitmentTable } from 'app/pages/issuance/components/Commitments/InvestorCommitmentTable'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { columns } from 'app/pages/issuance/components/Commitments/columns'
import { issuanceURL } from 'config/apiURL'
import { dsoQueryKeys } from 'config/queryKeys'

jest.mock('app/components/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))

jest.mock(
  'app/pages/issuance/components/Commitments/CommitmentTableFilters',
  () => ({
    CommitmentTableFilter: jest.fn(() => null)
  })
)

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('InvestorCommitmentTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders PageHeader with correct props', () => {
    render(<InvestorCommitmentTable />)

    expect(PageHeader).toHaveBeenCalledTimes(1)
    expect(PageHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Investor Commitments',
        variant: 'h3',
        showBreadcrumbs: false,
        noMargin: true
      }),
      {}
    )
  })

  it('renders CommitmentTableFilter', () => {
    render(<InvestorCommitmentTable />)

    expect(CommitmentTableFilter).toHaveBeenCalledTimes(1)
  })

  it('renders CommitmentTableFilter with correct props', () => {
    renderWithUserStore(<InvestorCommitmentTable />)

    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        uri: issuanceURL.commitments.getByDSOId('undefined'),
        name: dsoQueryKeys.getCommitmentsListByDSOId(''),
        columns: columns,
        filter: {
          search: undefined,
          fundStatus: undefined
        },
        themeVariant: 'primary'
      }),
      {}
    )
  })
})
