/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as individualIdentityHook from 'v2/hooks/identity/useIndividualIdentity'
import * as individualIdentityFormHook from 'v2/app/pages/identity/pages/IdentitiesList'
import { IndividualIdPreview } from 'v2/app/pages/identity/components/IndividualIdPreview'
import { generateQueryResult } from '__fixtures__/useQuery'
import { individual } from '__fixtures__/identity'
import { QueryStatus } from 'react-query'
import { Section } from 'v2/app/pages/identity/components/Section'
import { NoIdentity } from 'v2/app/pages/identity/components/NoIdentity'
import UserInfoComponent from 'v2/app/pages/identity/components/PersonalInfoFields'
import { useTypedForm } from '__fixtures__/createTypedForm'
import { individualIdentityFormValidationSchema } from 'v2/app/pages/identity/components/validation'
import { getIdentityFormDefaultValue } from 'v2/app/pages/identity/utils'

jest.mock('v2/app/pages/identity/components/PersonalInformation', () =>
  jest.fn(() => null)
)
jest.mock('v2/app/pages/identity/components/Section', () => ({
  Section: jest.fn(({ children }) => children)
}))
jest.mock('v2/app/pages/identity/components/NoIdentity', () => ({
  NoIdentity: jest.fn(() => null)
}))

describe('IndividualIdPreview', () => {
  const Form = jest.fn(({ children }) => children)
  beforeEach(() => {
    jest
      .spyOn(individualIdentityFormHook, 'useIndividualIdentityForm')
      .mockReturnValue({ ...useTypedForm(), Form })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualIdPreview />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(
        generateQueryResult({ queryStatus: QueryStatus.Loading })
      )
    const { container } = render(<IndividualIdPreview />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders NoIdentity if data is undefined', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: undefined }))
    render(<IndividualIdPreview />)

    expect(NoIdentity).toHaveBeenCalledWith(
      { link: 'createIndividual', text: 'Create Individual Identity' },
      {}
    )
  })

  it('renders UserInfoComponent & viewIndividualIdentity link', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))
    render(<IndividualIdPreview />)

    expect(UserInfoComponent).toHaveBeenCalledWith(
      {
        isEditing: false,
        useOwnEmail: true
      },
      {}
    )
  })

  it('renders Section with correct props', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))
    render(<IndividualIdPreview />)

    expect(Section).toHaveBeenCalledWith(
      {
        title: `${individual.firstName} ${individual.lastName}`,
        actions: expect.anything(),
        children: expect.anything()
      },
      {}
    )
  })

  it('renders Form with correct props', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))
    render(<IndividualIdPreview />)

    expect(Form).toHaveBeenCalledWith(
      {
        validationSchema: individualIdentityFormValidationSchema,
        onSubmit: alert,
        defaultValues: getIdentityFormDefaultValue(individual, 'individual'),
        children: expect.anything()
      },
      {}
    )
  })
})
