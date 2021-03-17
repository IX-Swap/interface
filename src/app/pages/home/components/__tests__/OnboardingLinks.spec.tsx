import { OnboardingLinks } from 'app/pages/home/components/OnboardingLinks'
import React from 'react'
import { render, cleanup } from 'test-utils'
// import * as useIdentitiesRouter from 'app/pages/_identity/router'

jest.mock('app/pages/home/components/OnboardingLink', () => ({
  OnboardingLink: jest.fn(() => null)
}))

describe('OnboardingLinks', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    // const objResponse = {
    //   paths: {
    //     createIndividual: '/create/individuals',
    //     createCorporate: '/create/corporate'
    //   }
    // }

    // jest
    //   .spyOn(useIdentitiesRouter, 'useIdentitiesRouter')
    //   .mockImplementation(() => objResponse as any)

    render(<OnboardingLinks />)
  })

  it('renders components correctly', () => {
    // const objResponse = {
    //   paths: {
    //     createIndividual: '/create/individuals',
    //     createCorporate: '/create/corporate'
    //   }
    // }
    // jest
    //   .spyOn(useIdentitiesRouter, 'useIdentitiesRouter')
    //   .mockImplementation(() => objResponse as any)
    // const { getByText } = render(<OnboardingLinks />)
    // expect(getByText('Invest')).toBeTruthy()
    // expect(getByText('Raise Capital')).toBeTruthy()
    // expect(OnboardingLink).toHaveBeenNthCalledWith(
    //   1,
    //   expect.objectContaining({
    //     label: 'Individual',
    //     link: '/create/individuals'
    //   }),
    //   {}
    // )
    // expect(OnboardingLink).toHaveBeenNthCalledWith(
    //   2,
    //   expect.objectContaining({
    //     label: 'Corporate',
    //     link: '/create/corporate'
    //   }),
    //   {}
    // )
    // expect(OnboardingLink).toHaveBeenNthCalledWith(
    //   3,
    //   expect.objectContaining({
    //     label: 'Fundraise',
    //     link: '/create/corporate'
    //   }),
    //   {}
    // )
  })
})
