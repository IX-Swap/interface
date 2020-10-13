/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { ListChildComponentProps } from 'react-window'
import { render, cleanup } from 'test-utils'
import { NotificationsItem } from 'v2/app/pages/notifications/components/NotificationsItem'
import { notification } from '__fixtures__/notification'
import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg'
import { ReactComponent as ErrorIcon } from 'assets/icons/error.svg'

jest.mock('assets/icons/success.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/error.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))

describe('NotificationsItem', () => {
  const props: ListChildComponentProps = {
    data: [notification],
    index: 0,
    style: {}
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<NotificationsItem {...props} />)
  })

  it('renders SuccessIcon if type is success', () => {
    render(<NotificationsItem {...props} />)

    expect(SuccessIcon).toHaveBeenCalledTimes(1)
  })

  it('renders ErrorIcon if type is not success', () => {
    render(
      <NotificationsItem
        {...props}
        data={[{ ...notification, type: 'test-type' }]}
      />
    )

    expect(ErrorIcon).toHaveBeenCalledTimes(1)
  })
})
