/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualIdView } from 'v2/app/pages/identity/pages/individual/IndividualIdView'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { generateQueryResult } from '__fixtures__/useQuery'
import { individual } from '__fixtures__/identity'
import { QueryStatus } from 'react-query'
import * as individualIdentityHook from 'v2/hooks/identity/useIndividualIdentity'
import { IndividualView } from 'v2/app/pages/identity/components/IndividualView'
import { EditButton } from 'v2/app/pages/identity/components/EditButton'

jest.mock('v2/app/pages/identity/components/IndividualView', () => ({
  IndividualView: jest.fn(() => null)
}))

jest.mock('v2/app/pages/identity/components/EditButton', () => ({
  EditButton: jest.fn(() => null)
}))

describe('IndividualIdView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualIdView />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(
        generateQueryResult({ queryStatus: QueryStatus.Loading })
      )
    const { container } = render(<IndividualIdView />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if data is undefined', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: undefined }))

    const { container } = render(<IndividualIdView />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders IndividualIdentityForm with correct props', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))

    render(<IndividualIdView />)

    expect(IndividualView).toHaveBeenCalledWith(
      {
        data: individual
      },
      {}
    )
  })

  it('renders EditButton with correct props', () => {
    render(<IndividualIdView />)

    expect(EditButton).toHaveBeenCalledWith(
      {
        link: IdentityRoute.editIndividual
      },
      {}
    )
  })
})
