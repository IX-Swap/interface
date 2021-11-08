import React from 'react'
import { render } from 'test-utils'
import { BlockchainMetaDataTable } from 'app/pages/admin/components/BlockchainMetaDataTable/BlockchainMetaDataTable'
import { blockchainSettings } from '__fixtures__/blockchain'

describe('BlockchainMetaDataTable', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <BlockchainMetaDataTable data={blockchainSettings.metaDataFields} />
    )
    expect(container).toMatchSnapshot()
  })
})
