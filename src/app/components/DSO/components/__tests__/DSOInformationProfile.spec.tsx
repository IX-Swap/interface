import React from 'react'
import { DSOInformationProfile } from 'app/components/DSO/components/DSOInformationProfile'
import { Form } from 'components/form/Form'
import { DSOIntroduction } from 'app/components/DSO/components/DSOIntroduction'
import { DSOBusinessModel } from 'app/components/DSO/components/DSOBusinessModel'
import { DSOUseOfProceeds } from 'app/components/DSO/components/DSOUseOfProceeds'
import { DSOFundRaisingMilestone } from 'app/components/DSO/components/DSOFundRaisingMilestone'
import { render } from 'test-utils'

jest.mock('app/components/DSO/components/DSOIntroduction', () => ({
  DSOIntroduction: jest.fn(() => <div />)
}))

jest.mock('app/components/DSO/components/DSOBusinessModel', () => ({
  DSOBusinessModel: jest.fn(() => <div />)
}))

jest.mock('app/components/DSO/components/DSOUseOfProceeds', () => ({
  DSOUseOfProceeds: jest.fn(() => <div />)
}))

jest.mock('app/components/DSO/components/DSOFundRaisingMilestone', () => ({
  DSOFundRaisingMilestone: jest.fn(() => <div />)
}))

describe('DSOInformationProfile', () => {
  it.skip('renders without errors', () => {
    render(
      <Form>
        <DSOInformationProfile />
      </Form>
    )
  })

  it('renders components correctly', () => {
    render(
      <Form>
        <DSOInformationProfile />
      </Form>
    )

    expect(DSOIntroduction).toHaveBeenCalled()
    expect(DSOBusinessModel).toHaveBeenCalled()
    expect(DSOUseOfProceeds).toHaveBeenCalled()
    expect(DSOFundRaisingMilestone).toHaveBeenCalled()
  })
})
