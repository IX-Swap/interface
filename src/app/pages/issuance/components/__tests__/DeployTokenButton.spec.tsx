import React from 'react'
import { render } from 'test-utils'
import {
  DeployTokenButton,
  DeployTokenButtonProps
} from 'app/pages/issuance/components/DeployTokenButton'
import { deploymentInfo } from '__fixtures__/issuance'
import { formatDateAndTime } from 'helpers/dates'

describe('DeployTokenButton', () => {
  const props: DeployTokenButtonProps = {
    isDeploying: false,
    isInitializing: false,
    isDeployed: false,
    onClick: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('displays initializing message if isInitializing is true', () => {
    const { container } = render(
      <DeployTokenButton {...props} isInitializing />
    )

    expect(container).toHaveTextContent(`Getting info...`)
  })

  it('displays deploying message if isDeploying is true', () => {
    const { container } = render(<DeployTokenButton {...props} isDeploying />)

    expect(container).toHaveTextContent(`Token is being deployed...`)
  })

  it('displays success message if deployed', () => {
    const { container } = render(
      <DeployTokenButton {...props} deploymentInfo={deploymentInfo} />
    )

    expect(container).toHaveTextContent(
      `Successfully deployed at ${formatDateAndTime(deploymentInfo.updatedAt)}`
    )
  })
})
