import { PersonnelList } from 'app/pages/_identity/components/CorporateIdentityView/PersonnelList'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { CompanyPersonnel } from 'app/pages/_identity/components/CorporateIdentityView/CompanyPersonnel'

jest.mock(
  'app/pages/_identity/components/CorporateIdentityView/CompanyPersonnel',
  () => ({
    CompanyPersonnel: jest.fn(() => null)
  })
)

describe('PersonnelList', () => {
  const personnels = corporate.representatives
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PersonnelList personnel={personnels} />)
  })

  it('returns null when personnels length < 1', () => {
    const { container } = render(<PersonnelList personnel={[]} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders components correctly', () => {
    render(<PersonnelList personnel={personnels} />)

    expect(CompanyPersonnel).toHaveBeenNthCalledWith(
      1,
      {
        personnel: personnels[0],
        showDocumentHeader: false,
        documentsTitle: 'Documents'
      },
      {}
    )
  })
})
