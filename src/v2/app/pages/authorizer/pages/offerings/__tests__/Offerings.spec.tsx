/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Offerings,
  renderDSOView
} from 'v2/app/pages/authorizer/pages/offerings/Offerings'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { dso } from '__fixtures__/authorizer'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { DataroomFeature } from 'v2/types/authorizer'

jest.mock('v2/app/components/DSO/DSOForm', () => ({
  DSOForm: jest.fn(() => null)
}))

jest.mock('v2/app/pages/authorizer/components/AuthorizerView', () => ({
  AuthorizerView: jest.fn(() => null)
}))

describe('Offerings', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<Offerings />)
  })

  describe('renderDSOView', () => {
    it('renders DigitalSecurity component with correct data', () => {
      const digitalSecurity = renderDSOView(dso)

      expect(digitalSecurity).toEqual(
        <AuthorizerView
          title='About This Offering'
          data={dso}
          feature={DataroomFeature.offerings}
        >
          <DSOForm data={dso} isEditing={false} />
        </AuthorizerView>
      )
    })
  })
})
