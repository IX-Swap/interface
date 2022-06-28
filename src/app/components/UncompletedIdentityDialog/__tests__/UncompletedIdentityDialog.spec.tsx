import React from 'react'
import { render } from 'test-utils'
import { UncompletedIdentityDialog } from 'app/components/UncompletedIdentityDialog/UncompletedIdentityDialog'
import * as useUncompletedIdentityDialogData from 'app/components/UncompletedIdentityDialog/hook/useUncompletedIdentityDialogData'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { fireEvent, waitFor } from '@testing-library/dom'
import { history } from 'config/history'

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

const defaultPath = '/app'

const mockedData = {
  title: 'Create an Identity',
  message: 'To manage your account please create your identity first',
  actionLabel: 'Proceed Now',
  action: '/test'
}

describe('UncompletedIdentityDialog', () => {
  beforeEach(() => {
    history.push(defaultPath)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders LoadingIndicator if data is undefined', () => {
    jest
      .spyOn(
        useUncompletedIdentityDialogData,
        'useUncompletedIdentityDialogData'
      )
      .mockImplementation(() => ({ data: undefined, isLoading: false } as any))

    render(<UncompletedIdentityDialog />)

    expect(LoadingIndicator).toHaveBeenCalled()
  })

  it('renders LoadingIndicator if data is loading', () => {
    jest
      .spyOn(
        useUncompletedIdentityDialogData,
        'useUncompletedIdentityDialogData'
      )
      .mockImplementation(() => ({ data: mockedData, isLoading: true } as any))

    render(<UncompletedIdentityDialog />)

    expect(LoadingIndicator).toHaveBeenCalled()
  })

  it('renders loaded data', () => {
    jest
      .spyOn(
        useUncompletedIdentityDialogData,
        'useUncompletedIdentityDialogData'
      )
      .mockImplementation(() => ({ data: mockedData, isLoading: false } as any))

    jest.spyOn(React, 'useState').mockImplementation(() => [false, jest.fn()])

    const { getByText } = render(<UncompletedIdentityDialog />)

    expect(LoadingIndicator).not.toHaveBeenCalled()
    expect(getByText(mockedData.title)).toBeInTheDocument()
    expect(getByText(mockedData.message)).toBeInTheDocument()
    expect(getByText(mockedData.actionLabel)).toBeInTheDocument()
  })

  it('invokes history push on button click when action is not null', async () => {
    jest
      .spyOn(
        useUncompletedIdentityDialogData,
        'useUncompletedIdentityDialogData'
      )
      .mockImplementation(() => ({ data: mockedData, isLoading: false } as any))

    jest.spyOn(React, 'useState').mockImplementation(() => [false, jest.fn()])

    const { getByRole } = render(<UncompletedIdentityDialog />)

    fireEvent.click(getByRole('button'))
    await waitFor(() => {
      expect(history.location.pathname).toEqual(mockedData.action)
    })
  })

  it('not invokes history push on button click when action is null', async () => {
    jest
      .spyOn(
        useUncompletedIdentityDialogData,
        'useUncompletedIdentityDialogData'
      )
      .mockImplementation(
        () =>
          ({ data: { ...mockedData, action: null }, isLoading: false } as any)
      )

    jest.spyOn(React, 'useState').mockImplementation(() => [false, jest.fn()])

    const { getByRole } = render(<UncompletedIdentityDialog />)

    fireEvent.click(getByRole('button'))
    await waitFor(() => {
      expect(history.location.pathname).toEqual(defaultPath)
    })
  })
})
