import React from 'react'
import { render } from 'test-utils'
import {
  DSOPreview,
  DSOPreviewProps
} from 'app/components/DSO/DSOPreview/DSOPreview'
import { dso } from '__fixtures__/authorizer'
import { DSOInformationView } from 'app/components/DSO/DSOPreview/DSOInformationView'
import { DSOPricingViewCompact } from 'app/components/DSO/components/DSOPricingViewCompact'
import { DSOTeamView } from 'app/components/DSO/DSOPreview/DSOTeamView'
import { DSOTermsViewCompact } from 'app/components/DSO/DSOPreview/DSOTermsViewCompact'

window.URL.revokeObjectURL = jest.fn()

jest.mock('app/components/DSO/components/DSOPricingViewCompact', () => ({
  DSOPricingViewCompact: jest.fn(() => null)
}))

jest.mock('app/components/DSO/DSOPreview/DSOInformationView', () => ({
  DSOInformationView: jest.fn(() => null)
}))

jest.mock('app/components/DSO/DSOPreview/DSOTermsViewCompact', () => ({
  DSOTermsViewCompact: jest.fn(() => null)
}))

jest.mock('app/components/DSO/DSOPreview/DSOTeamView', () => ({
  DSOTeamView: jest.fn(() => null)
}))

describe('DSOPreview', () => {
  const props: DSOPreviewProps = { data: dso, showAuthorizations: false }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DSOToken', () => {
    render(<DSOPreview {...props} />)

    expect(DSOPricingViewCompact).toHaveBeenCalled()
    expect(DSOTermsViewCompact).toHaveBeenCalled()
    expect(DSOInformationView).toHaveBeenCalled()
    expect(DSOTeamView).toHaveBeenCalled()
  })
})
