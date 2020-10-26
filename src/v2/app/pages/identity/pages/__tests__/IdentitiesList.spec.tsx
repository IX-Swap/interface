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

jest.mock('v2/app/pages/identity/components/IndividualPreview', () => ({
  IndividualPreview: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/CorporatePreview', () => ({
  CorporatePreview: jest.fn(() => null)
}))

describe('IdentitiesRoot', () => {
  beforeEach(() => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockReturnValue(generateQueryResult({ data: individual }))
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [corporate] }))
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IdentityRoot />)
  })

  it('renders IndividualIdPreview & CorporatePreview', () => {
    render(<IdentityRoot />)

    expect(IndividualPreview).toHaveBeenCalledTimes(1)
    expect(CorporatePreview).toHaveBeenCalledTimes(1)
  })
})
