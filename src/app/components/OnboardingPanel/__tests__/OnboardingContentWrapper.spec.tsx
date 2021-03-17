import React from 'react'
import { render, cleanup } from 'test-utils'
import { OnboardingContentWrapper } from 'app/components/OnboardingPanel/OnboardingContentWrapper'
import * as useSecurityRouter from 'app/pages/security/router'
import * as useHomeRouter from 'app/pages/home/router'
import { MemoryRouter } from 'react-router-dom'

describe('ContentWrapper', () => {
  // const identitiesRouter = {
  //   paths: {
  //     createIndividual: '/individual',
  //     createCorporate: '/corporate'
  //   }
  // }
  const securityRouter = {
    paths: {
      setup2fa: '/setup2fa'
    }
  }

  const homeRouter = {
    paths: {
      landing: '/home'
    }
  }

  beforeEach(() => {
    // jest
    //   .spyOn(useIdentitiesRouter, 'useIdentitiesRouter')
    //   .mockImplementation(() => identitiesRouter as any)
    jest
      .spyOn(useSecurityRouter, 'useSecurityRouter')
      .mockImplementation(() => securityRouter as any)
    jest
      .spyOn(useHomeRouter, 'useHomeRouter')
      .mockImplementation(() => homeRouter as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <OnboardingContentWrapper>
          <div />
        </OnboardingContentWrapper>
      </MemoryRouter>
    )
  })

  // it('does not render wrapper when not in the onboardingPages path', () => {
  //   const { container } = render(
  //     <MemoryRouter initialEntries={['/accounts']}>
  //       <OnboardingContentWrapper>
  //         <div />
  //       </OnboardingContentWrapper>
  //     </MemoryRouter>
  //   )

  //   expect(container.firstElementChild).toBeEmptyDOMElement()
  // })
})
