import React from 'react'
import { render } from 'test-utils'
import {
  DSOCardCover,
  DSOCardCoverProps
} from 'app/components/DSO/components/DSOCard/DSOCardCover'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { dso } from '__fixtures__/authorizer'

jest.mock('app/components/DSO/components/DSOLogo', () => ({
  DSOLogo: jest.fn(() => null)
}))
jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('DSOCardCover', () => {
  const props: DSOCardCoverProps = { dso: dso, viewURL: 'foo' }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DSOCardCover {...props} />)
  })

  it('renders DSOLogo with correct props', () => {
    render(<DSOCardCover {...props} />)

    expect(DSOLogo).toHaveBeenCalledTimes(1)
    expect(DSOLogo).toHaveBeenCalledWith(
      expect.objectContaining({
        dsoId: dso._id
      }),
      {}
    )
  })

  it('renders AppRouterLink with correct props', () => {
    render(<DSOCardCover {...props} />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        to: props.viewURL,
        params: { dsoId: dso._id, issuerId: dso.createdBy }
      }),
      {}
    )
  })
})
