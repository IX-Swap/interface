import { OnboardingDialog } from 'app/components/OnboardingDialog/OnboardingDialog'
import * as useOnboardingPanel from 'app/components/OnboardingPanel/hooks/useOnboardingPanel'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('OnboardingDialog', () => {
  const child = jest.fn(() => <span />)
  const props = {
    initOpened: true,
    children: child,
    title: 'Title',
    closeLabel: 'close',
    actionLabel: 'Action',
    action: 'path/to/action',
    actionArrow: true
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = { open: true }

    jest
      .spyOn(useOnboardingPanel, 'useOnboardingPanel')
      .mockImplementation(() => objResponse as any)

    render(<OnboardingDialog {...props} />)
  })

  it('renders props correctly', () => {
    const objResponse = { open: true }

    jest
      .spyOn(useOnboardingPanel, 'useOnboardingPanel')
      .mockImplementation(() => objResponse as any)

    const { getByText } = render(<OnboardingDialog {...props} />)

    expect(getByText('Title')).toBeTruthy()
    expect(getByText('close')).toBeTruthy()
    expect(getByText('Action')).toBeTruthy()
  })
})
