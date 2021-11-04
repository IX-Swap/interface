import React from 'react'
import { render } from 'test-utils'
import { BlockchainSelector } from 'app/pages/admin/components/BlockchainSelector/BlockchainSelector'
import { BlockchainNetworks } from 'types/blockchain'
import { fireEvent, waitFor } from '@testing-library/react'
import { history } from 'config/history'

describe('BlockchainSelector', () => {
  it('should render blockchain networks', () => {
    const { getAllByTestId } = render(<BlockchainSelector />)
    const items = getAllByTestId('blockchain-selector-item')

    expect(items).toHaveLength(4)
    Object.values(BlockchainNetworks).forEach((network, index) => {
      expect(items[index]).toHaveTextContent(network)
    })
  })

  it('should update search query on item click', async () => {
    const { getByText } = render(<BlockchainSelector />)

    fireEvent.click(getByText('Tezos'))

    await waitFor(() => {
      expect(history.location.search).toBe('?blockchainNetwork=XTZ')
    })
  })
})
