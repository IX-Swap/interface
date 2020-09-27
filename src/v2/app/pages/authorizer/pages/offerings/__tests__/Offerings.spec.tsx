/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Offerings,
  renderDSOView
} from 'v2/app/pages/authorizer/pages/offerings/Offerings'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { dso } from '__fixtures__/authorizer'

jest.mock('v2/app/components/DSO/DSOForm', () => ({
  DSOForm: jest.fn(() => null)
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

      expect(digitalSecurity).toEqual(<DSOForm dso={dso} isEditing={false} />)
    })
  })
})
