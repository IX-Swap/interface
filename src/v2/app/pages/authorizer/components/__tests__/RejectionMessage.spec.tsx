import React from 'react'
import { render, cleanup } from 'test-utils'
import { RejectionMessage, RejectionMessageProps } from '../RejectionMessage'
import { AuthorizationInfoWithStatus } from 'v2/types/authorizer'

describe('RejectionMessage', () => {
  const approval: AuthorizationInfoWithStatus = {
    _id: 'id',
    authorizer: 'authorizer',
    comment: 'comment',
    sharedWithUser: false,
    status: 'Approved',
    timestamp: '10/10/2020'
  }
  const rejection: AuthorizationInfoWithStatus = {
    ...approval,
    status: 'Rejected'
  }
  const props: RejectionMessageProps = {
    data: [approval]
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<RejectionMessage {...props} />)
  })

  it('renders nothing if data is undefined', () => {
    const { container } = render(
      <RejectionMessage {...props} data={undefined} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if data is an empty array', () => {
    const { container } = render(<RejectionMessage {...props} data={[]} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if last item is approval', () => {
    const { container } = render(<RejectionMessage {...props} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders only status if last item is rejection and comment is not shared', () => {
    const { getByText, queryByText } = render(
      <RejectionMessage {...props} data={[rejection]} />
    )

    expect(getByText(rejection.status)).toBeTruthy()
    expect(queryByText(rejection.comment)).toBeFalsy()
  })

  it('renders status and comment if last item is rejection and comment is shared', () => {
    const { getByText, queryByText } = render(
      <RejectionMessage
        {...props}
        data={[{ ...rejection, sharedWithUser: true }]}
      />
    )

    expect(getByText(rejection.status)).toBeTruthy()
    expect(queryByText(rejection.comment)).toBeTruthy()
  })
})
