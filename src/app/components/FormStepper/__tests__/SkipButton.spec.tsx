import { fireEvent, waitFor } from '@testing-library/react'
import { SkipButton } from 'app/components/FormStepper/SkipButton'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { history } from 'config/history'
import React from 'react'
import { render, cleanup } from 'test-utils'
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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SkipButton mutation={mutation} />)
  })

  it('invokes mutate function with correct data', async () => {
    const { container } = render(<SkipButton mutation={mutation} />)
    const skipButton = container.querySelector('button') as HTMLButtonElement
    fireEvent.click(skipButton, { bubbles: true, cancellable: true })

    await expect(save).toHaveBeenCalledWith(skippedPayload)

    await waitFor(
      () => {
        expect(history.location.pathname).toEqual(IdentityRoute.createIssuer)
      },
      { timeout: 1000 }
    )
  })
})
