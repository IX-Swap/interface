import React from 'react'
import { render } from 'test-utils'
import { RejectionMessage, RejectionMessageProps } from '../RejectionMessage'
import { Authorizable, AuthorizationInfoWithStatus } from 'types/authorizer'

describe('RejectionMessage', () => {
  const authorizable: Authorizable = {
    _id: 'id',
    status: 'Approved',
    updatedAt: '10/10/2020',
    createdAt: '10/10/2020',
    level: 'Level 1',
    authorizations: []
  }
  const approval: AuthorizationInfoWithStatus = {
    _id: 'id',
    authorizer: 'authorizer',
    comment: 'comment',
    sharedWithUser: false,
    status: 'Approved',
    timestamp: 'timestamp'
  }
  const rejection: AuthorizationInfoWithStatus = {
    ...approval,
    status: 'Rejected'
  }
  const props: RejectionMessageProps = {
    data: { ...authorizable, authorizations: [approval] }
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<RejectionMessage {...props} />)
  })

  it('renders nothing if data is undefined', () => {
    const { container } = render(
      <RejectionMessage {...props} data={undefined} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if data is an empty array', () => {
    const { container } = render(
      <RejectionMessage
        {...props}
        data={{
          ...authorizable,
          authorizations: []
        }}
      />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if last item is approval', () => {
    const { container } = render(<RejectionMessage {...props} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders only status if last item is rejection and comment is not shared', () => {
    const { getByText, queryByText } = render(
      <RejectionMessage
        {...props}
        data={{
          ...authorizable,
          authorizations: [rejection]
        }}
      />
    )

    expect(getByText(rejection.status)).toBeTruthy()
    expect(queryByText(rejection.comment)).toBeFalsy()
  })

  it('renders status and comment if last item is rejection and comment is shared', () => {
    const { getByText, queryByText } = render(
      <RejectionMessage
        {...props}
        data={{
          ...authorizable,
          authorizations: [{ ...rejection, sharedWithUser: true }]
        }}
      />
    )

    expect(getByText(rejection.status)).toBeTruthy()
    expect(queryByText(rejection.comment)).toBeTruthy()
  })

  it('renders nothing if status is submitted', () => {
    const { container } = render(
      <RejectionMessage
        {...props}
        data={{
          ...authorizable,
          status: 'Submitted',
          authorizations: [rejection]
        }}
      />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
