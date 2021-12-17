import { SubFundSelect } from 'app/pages/issuance/components/DSOFilters/SubFundSelect'
import * as useVCCDSO from 'app/pages/issuance/hooks/useVCCDSO'
import { history } from 'config/history'
import React from 'react'
import { render, cleanup, fireEvent, within, waitFor } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('SubFundSelect', () => {
  beforeEach(() => {
    history.push('/', {})
    const objResponse = generateQueryResult({
      data: [dso, { ...dso, _id: '0987', tokenName: 'DSO2' }]
    })

    jest
      .spyOn(useVCCDSO, 'useVCCDSO')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SubFundSelect />)
  })

  it('shows correct options', () => {
    const { getByRole, getByText } = render(<SubFundSelect />)
    fireEvent.mouseDown(getByRole('button'))

    expect(getByText('Select All')).toBeTruthy()
    expect(getByText(dso.tokenName)).toBeTruthy()
    expect(getByText('DSO2')).toBeTruthy()
  })

  it('shows correct content when options are selected', async () => {
    const { getByRole, container } = render(<SubFundSelect />)
    fireEvent.mouseDown(getByRole('button'))

    const listbox = within(getByRole('listbox'))
    fireEvent.click(listbox.getByText(dso.tokenName))

    await waitFor(() => {
      expect(container.querySelector('.MuiSelect-select')).toHaveTextContent(
        'token name'
      )
      expect(history.location.search).toEqual('?subfunds=1')
    })
  })
})
