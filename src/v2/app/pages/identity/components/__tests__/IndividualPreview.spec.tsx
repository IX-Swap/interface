/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as individualIdentityHook from 'v2/hooks/identity/useIndividualIdentity'
import { IndividualPreview } from 'v2/app/pages/identity/components/IndividualPreview'
import { generateQueryResult } from '__fixtures__/useQuery'
import { individual } from '__fixtures__/identity'
import { QueryStatus } from 'react-query'
import { Section } from 'v2/app/pages/identity/components/Section'
import { NoIdentity } from 'v2/app/pages/identity/components/NoIdentity'
import { IndividualInfoView } from 'v2/app/pages/identity/components/IndividualInfoView'

jest.mock('v2/app/pages/identity/components/IndividualInfoView', () => ({
  IndividualInfoView: jest.fn(() => null)
}))

jest.mock('v2/app/pages/identity/components/Section', () => ({
  Section: jest.fn(({ children }) => children)
}))

jest.mock('v2/app/pages/identity/components/NoIdentity', () => ({
  NoIdentity: jest.fn(() => null)
}))

describe('IndividualIdPreview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualPreview />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(
        generateQueryResult({ queryStatus: QueryStatus.Loading })
      )
    const { container } = render(<IndividualPreview />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders NoIdentity if data is undefined', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: undefined }))
    render(<IndividualPreview />)

    expect(NoIdentity).toHaveBeenCalledWith(
      { link: 'createIndividual', text: 'Create Individual Identity' },
      {}
    )
  })

  it('renders UserInfoComponent & viewIndividualIdentity link', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))

    render(<IndividualPreview />)

    expect(IndividualInfoView).toHaveBeenCalledWith(
      {
        data: individual
      },
      {}
    )
  })

  it('renders Section with correct props', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))

    render(<IndividualPreview />)

    expect(Section).toHaveBeenCalledWith(
      {
        title: `${individual.firstName} ${individual.lastName}`,
        actions: expect.anything(),
        children: expect.anything()
      },
      {}
    )
  })
})
