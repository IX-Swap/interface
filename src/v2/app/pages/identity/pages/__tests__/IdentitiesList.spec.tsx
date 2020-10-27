/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualPreview } from 'v2/app/pages/identity/components/IndividualPreview'
import { CorporatePreview } from 'v2/app/pages/identity/components/CorporatePreview'
import { IdentityRoot } from 'v2/app/pages/identity/pages/IdentitiesList'
import * as individualIdentityHook from 'v2/hooks/identity/useIndividualIdentity'
import * as allCorporateIdentitiesHook from 'v2/hooks/identity/useAllCorporateIdentities'
import { individual, corporate } from '__fixtures__/identity'
import {
  generateQueryResult,
  generateInfiniteQueryResult
} from '__fixtures__/useQuery'
import { IdentityDialog } from 'v2/app/pages/identity/components/IdentityDialog'

jest.mock('v2/app/pages/identity/components/IdentityDialog', () => ({
  IdentityDialog: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/IndividualPreview', () => ({
  IndividualPreview: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/CorporatePreview', () => ({
  CorporatePreview: jest.fn(() => null)
}))

describe('IdentitiesRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [corporate] }))
    render(<IdentityRoot />)
  })

  it('renders IndividualIdPreview & CorporatePreview', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [corporate] }))
    render(<IdentityRoot />)

    expect(IndividualPreview).toHaveBeenCalledTimes(1)
    expect(CorporatePreview).toHaveBeenCalledTimes(1)
  })

  it('renders IdentityDialog with correct props identities exist', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [corporate] }))
    render(<IdentityRoot />)

    expect(IdentityDialog).toHaveBeenCalledWith(
      {
        closeFn: expect.any(Function),
        isOpen: false
      },
      {}
    )
  })

  it('renders IdentityDialog with correct props identities does not exist', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({}))
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({}))
    render(<IdentityRoot />)

    expect(IdentityDialog).toHaveBeenCalledWith(
      {
        closeFn: expect.any(Function),
        isOpen: false
      },
      {}
    )
  })
})
