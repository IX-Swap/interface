import { fireEvent, waitFor } from '@testing-library/react'
import { SkipButton } from 'app/components/FormStepper/SkipButton'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { history } from 'config/history'
import React from 'react'
import { render } from 'test-utils'
import { DetailsOfIssuanceFormValues } from 'types/detailsOfIssuance'

describe('SkipButton', () => {
  const save = jest.fn(async () => await Promise.resolve({}))
  const mutation = [save, { isLoading: false }] as any

  const skippedPayload: Partial<DetailsOfIssuanceFormValues> = {
    fullName: ' ',
    companyName: ' ',
    companyRegistrationNumber: ' ',
    contactNumber: ' ',
    email: ' ',
    industry: ' ',
    fundRaisingAmount: 0,
    detail: ' ',
    companyRelated: undefined,
    issuanceRelated: undefined,
    financial: undefined,
    skipped: true
  }

  beforeEach(() => {})

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<SkipButton mutation={mutation} />)
  })

  it('opens and closes dialog boxes by pressing skip and cancel button respectively', async () => {
    const { container, getByText, getByRole, queryByText } = render(
      <SkipButton mutation={mutation} />
    )
    const skipButton = container.querySelector('button') as HTMLButtonElement
    fireEvent.click(skipButton, { bubbles: true, cancellable: true })

    expect(getByText('Are You Sure You Want To Skip This?')).toBeTruthy()

    const cancelButton = getByRole('button', {
      name: 'Cancel'
    }) as HTMLButtonElement
    fireEvent.click(cancelButton, { bubbles: true, cancellable: true })

    await waitFor(
      () => {
        expect(queryByText('Are You Sure You Want To Skip This?')).toBeFalsy()
      },
      { timeout: 1000 }
    )
  })

  it('opens dialog box and invokes mutate function with correct data', async () => {
    const { container, getByText, getByRole } = render(
      <SkipButton mutation={mutation} />
    )
    const skipButton = container.querySelector('button') as HTMLButtonElement
    fireEvent.click(skipButton, { bubbles: true, cancellable: true })

    expect(getByText('Are You Sure You Want To Skip This?')).toBeTruthy()

    const yesButton = getByRole('button', { name: 'Yes' }) as HTMLButtonElement
    fireEvent.click(yesButton, { bubbles: true, cancellable: true })

    await expect(save).toHaveBeenCalledWith(skippedPayload)

    await waitFor(
      () => {
        expect(history.location.pathname).toEqual(IdentityRoute.createIssuer)
      },
      { timeout: 1000 }
    )
  })
})
