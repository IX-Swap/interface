import * as useTreasuryWallet from 'app/pages/authorizer/hooks/useTreasuryWallet'
import { TokenDeploymentView } from 'app/pages/authorizer/pages/TokenDeployment/TokenDeploymentView'
import * as useDeployToken from 'app/pages/issuance/hooks/useDeployToken'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { generateQueryResult } from '__fixtures__/useQuery'
import { DeployTokenButton } from 'app/pages/issuance/components/DeployTokenButton'
import { deploymentInfo } from '__fixtures__/issuance'

jest.mock('app/pages/issuance/components/DeployTokenButton', () => ({
  DeployTokenButton: jest.fn(() => null)
}))

describe('TokenDeploymentView', () => {
  beforeEach(() => {
    const useDeployTokenResponse = {
      deploy: jest.fn(),
      isInitializing: false,
      isDeploying: false,
      isDeployed: false
    }

    jest
      .spyOn(useDeployToken, 'useDeployToken')
      .mockImplementation(() => useDeployTokenResponse as any)

    const useTreasuryWalletResponse = generateQueryResult({
      data: { balance: 100000 },
      isLoading: false
    })

    jest
      .spyOn(useTreasuryWallet, 'useTreasuryWallet')
      .mockImplementation(() => useTreasuryWalletResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TokenDeploymentView data={dso} />)
  })

  it('renders with correct props', () => {
    render(<TokenDeploymentView data={dso} />)

    expect(useDeployToken.useDeployToken).toHaveBeenCalledWith(dso._id)
    expect(useTreasuryWallet.useTreasuryWallet).toHaveBeenCalledWith(
      dso.network?.networkCode,
      dso._id
    )
  })

  it('renders deploy token button if deployment info is undefined', () => {
    render(<TokenDeploymentView data={{ ...dso, deploymentInfo: undefined }} />)

    expect(DeployTokenButton).toHaveBeenCalled()
  })

  it('does not render deploy token button if deployment info is defined', () => {
    render(
      <TokenDeploymentView data={{ ...dso, deploymentInfo: deploymentInfo }} />
    )

    expect(DeployTokenButton).not.toHaveBeenCalled()
  })
})
