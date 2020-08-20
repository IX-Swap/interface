/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Offerings, renderDSOView } from 'v2/app/authorizer/offerings/Offerings'
import DigitalSecurity from 'v2/app/components/digital-security'
import { dso } from '__fixtures__/authorizer'

jest.mock('v2/app/components/digital-security', () => jest.fn(() => null))

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
        <DigitalSecurity dso={dso} editMode={false} />
      )
    })
  })
})
