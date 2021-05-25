import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOPreview,
  DSOPreviewProps
} from 'app/components/DSO/DSOPreview/DSOPreview'
import { dso } from '__fixtures__/authorizer'
import { DSOBaseFieldsView } from 'app/components/DSO/DSOPreview/DSOBaseFieldsView'
import { DSOInformationView } from 'app/components/DSO/DSOPreview/DSOInformationView'
import { DSOPricingView } from 'app/components/DSO/DSOPreview/DSOPricingView'
import { DSOTeamView } from 'app/components/DSO/DSOPreview/DSOTeamView'
import { DSOTermsView } from 'app/components/DSO/DSOPreview/DSOTermsView'

window.URL.revokeObjectURL = jest.fn()

jest.mock('app/__tests__/DSO/DSOPreview/DSOBaseFieldsView', () => ({
  DSOBaseFieldsView: jest.fn(() => null)
}))

jest.mock('app/__tests__/DSO/DSOPreview/DSOPricingView', () => ({
  DSOPricingView: jest.fn(() => null)
}))

jest.mock('app/__tests__/DSO/DSOPreview/DSOInformationView', () => ({
  DSOInformationView: jest.fn(() => null)
}))

jest.mock('app/__tests__/DSO/DSOPreview/DSOTermsView', () => ({
  DSOTermsView: jest.fn(() => null)
}))

jest.mock('app/__tests__/DSO/DSOPreview/DSOTeamView', () => ({
  DSOTeamView: jest.fn(() => null)
}))

describe('DSOPreview', () => {
  const props: DSOPreviewProps = { data: dso, showAuthorizations: false }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOPreview {...props} />)
  })

  it('renders DSOToken', () => {
    render(<DSOPreview {...props} />)

    expect(DSOBaseFieldsView).toHaveBeenCalled()
    expect(DSOPricingView).toHaveBeenCalled()
    expect(DSOTermsView).toHaveBeenCalled()
    expect(DSOInformationView).toHaveBeenCalled()
    expect(DSOTeamView).toHaveBeenCalled()
  })
})
