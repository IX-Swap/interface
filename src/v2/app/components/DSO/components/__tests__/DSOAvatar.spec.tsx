/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOAvatar,
  DSOAvatarProps
} from 'v2/app/components/DSO/components/DSOAvatar'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'

jest.mock('v2/app/components/DSO/components/ViewDocument', () => ({
  ViewDocument: jest.fn(({ children }) =>
    children(
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    )
  )
}))

describe('DSOAvatar', () => {
  const props: DSOAvatarProps = {
    imageId: '',
    size: 2,
    variant: 'rounded',
    dsoOwnerId: '',
    button: <div data-testid='test-button' />
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOAvatar {...props} />)
  })

  it('renders ViewDocument with correct props', () => {
    render(<DSOAvatar {...props} />)

    expect(ViewDocument).toHaveBeenCalledTimes(1)
    expect(ViewDocument).toHaveBeenCalledWith(
      {
        documentId: props.imageId,
        ownerId: props.dsoOwnerId,
        children: expect.any(Function)
      },
      {}
    )
  })

  it('renders ViewDocument with correct props if dsoOwnerId is undefined', () => {
    render(<DSOAvatar {...props} dsoOwnerId={undefined} />)

    expect(ViewDocument).toHaveBeenCalledTimes(1)
    expect(ViewDocument).toHaveBeenCalledWith(
      {
        documentId: props.imageId,
        ownerId: '',
        children: expect.any(Function)
      },
      {}
    )
  })

  it('renders button correctly', () => {
    const { getByTestId } = render(<DSOAvatar {...props} />)
    const button = getByTestId('test-button')

    expect(button).toBeTruthy()
  })
})
