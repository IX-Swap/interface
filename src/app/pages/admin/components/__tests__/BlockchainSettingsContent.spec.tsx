import React from 'react'
import { render } from 'test-utils'
import { BlockchainSettingsContent } from 'app/pages/admin/components/BlockchainSettingsContent/BlockchainSettingsContent'
import * as UseBlockchainSettingsHook from 'app/pages/admin/hooks/useBlockchainSettings'
import { generateQueryResult } from '__fixtures__/useQuery'
import { BlockchainInfoList } from 'app/pages/admin/components/BlockchainInfo/BlockchainInfoList'
import { BlockchainSettingsForm } from 'app/pages/admin/components/BlockchainSettingsForm/BlockchainSettingsForm'
import { BlockchainMetaDataTable } from 'app/pages/admin/components/BlockchainMetaDataTable/BlockchainMetaDataTable'
import { blockchainSettings } from '__fixtures__/blockchain'

jest.mock(
  'app/pages/admin/components/BlockchainInfo/BlockchainInfoList',
  () => ({
    BlockchainInfoList: jest.fn(() => null)
  })
)
jest.mock(
  'app/pages/admin/components/BlockchainSettingsForm/BlockchainSettingsForm',
  () => ({
    BlockchainSettingsForm: jest.fn(() => null)
  })
)
jest.mock(
  'app/pages/admin/components/BlockchainMetaDataTable/BlockchainMetaDataTable',
  () => ({
    BlockchainMetaDataTable: jest.fn(() => null)
  })
)

describe('BlockchainSettingsContent', () => {
  it('should render placeholder when by default', () => {
    const { getByTestId, queryByTestId } = render(<BlockchainSettingsContent />)

    expect(getByTestId('blockchain-settings-placeholder')).toBeInTheDocument()
    expect(queryByTestId('blockchain-settings-loader')).toBeNull()
  })

  it('should render loader when is loading', () => {
    jest
      .spyOn(UseBlockchainSettingsHook, 'useBlockchainSettings')
      .mockReturnValue(generateQueryResult({ isLoading: true }))

    const { getByTestId, queryByTestId } = render(<BlockchainSettingsContent />)

    expect(getByTestId('blockchain-settings-loader')).toBeInTheDocument()
    expect(queryByTestId('blockchain-settings-placeholder')).toBeNull()
  })

  it('should render content', () => {
    jest
      .spyOn(UseBlockchainSettingsHook, 'useBlockchainSettings')
      .mockReturnValue(generateQueryResult({ data: blockchainSettings }))

    const { queryByTestId } = render(<BlockchainSettingsContent />)

    expect(queryByTestId('blockchain-settings-loader')).toBeNull()
    expect(queryByTestId('blockchain-settings-placeholder')).toBeNull()

    expect(BlockchainInfoList).toBeCalledWith(
      { networks: blockchainSettings.networks },
      {}
    )
    expect(BlockchainSettingsForm).toBeCalledWith(
      { decimal: blockchainSettings.decimal },
      {}
    )
    expect(BlockchainMetaDataTable).toBeCalledWith(
      { data: blockchainSettings.metaDataFields },
      {}
    )
  })
})
