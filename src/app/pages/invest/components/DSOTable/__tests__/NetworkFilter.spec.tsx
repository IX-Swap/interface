import React from 'react'
import { render, fireEvent, waitFor } from 'test-utils'
import { NetworkFilter } from 'app/pages/invest/components/DSOTable/NetworkFilter'
import { within } from '@testing-library/dom'
import { useAllNetworks } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'
import { generateQueryResult } from '__fixtures__/useQuery'
import { networks } from '__fixtures__/network'
import { history } from 'config/history'
import { generatePath } from 'react-router'

jest.mock('app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks')

const useAllNetworksMock = useAllNetworks as jest.Mock<
  Partial<ReturnType<typeof useAllNetworks>>
>

describe('Network Filter', () => {
  beforeEach(() => {
    history.replace(generatePath('/', { search: '' }))
    useAllNetworksMock.mockReturnValue(generateQueryResult({ data: networks }))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without any error', async () => {
    render(<NetworkFilter />)
  })

  it('invokes removeFilter on change select value to default', async () => {
    const { getByRole } = render(<NetworkFilter />)
    const select = getByRole('button')
    fireEvent.mouseDown(select)
    const listBox = within(getByRole('listbox'))
    fireEvent.click(listBox.getByText(`Network`))

    await waitFor(() => {
      expect(history.location.search).toBe(``)
    })
  })

  it('invokes updateFilter on change select value', async () => {
    const { getByRole } = render(<NetworkFilter />)
    const select = getByRole('button')
    fireEvent.mouseDown(select)
    const listBox = within(getByRole('listbox'))
    fireEvent.click(listBox.getByText(`${networks[0].name}`))

    await waitFor(() => {
      expect(history.location.search).toBe(`?network=${networks[0]._id}`)
    })
  })
})
