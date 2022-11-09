import React from 'react'
import { render } from 'test-utils'
import { DSOForm, getCreateModeRedirect } from 'app/components/DSO/DSOForm'
import { SaveDraftButton } from 'app/components/DSO/DSODraftButton'
import { getDSODocumentsPayload } from '../requests'
import { dso, DSODocuments } from '__fixtures__/issuance'
import * as useSetPageTitle from 'app/hooks/useSetPageTitle'
import * as useCreateDSO from 'app/pages/issuance/hooks/useCreateDSO'
import * as useSubmitDSO from 'app/pages/issuance/hooks/useSubmitDSO'
import * as useUpdateDSO from 'app/pages/issuance/hooks/useUpdateDSO'
import { dsoFormSteps } from '../steps'
import { DSOStepper } from 'app/components/DSO/DSOFormStepper'

jest.mock('app/components/DSO/DSODraftButton', () => ({
  SaveDraftButton: jest.fn(() => null)
}))

describe('DSO Save Draft Button', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DSO Draft Button component', () => {
    render(<DSOForm />)
    expect(SaveDraftButton).toHaveBeenCalled()
  })

  it('should match snapshot', () => {
    const { container } = render(<DSOForm />)

    expect(container).toMatchSnapshot()
  })
})
