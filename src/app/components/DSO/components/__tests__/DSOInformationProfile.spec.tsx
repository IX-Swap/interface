import React from 'react'
import { DSOInformationProfile } from 'app/components/DSO/components/DSOInformationProfile'
import { Form } from 'components/form/Form'
import { DSOIntroduction } from 'app/components/DSO/components/DSOIntroduction'
import { DSOBusinessModel } from 'app/components/DSO/components/DSOBusinessModel'
import { DSOUseOfProceeds } from 'app/components/DSO/components/DSOUseOfProceeds'
import { DSOFundRaisingMilestone } from 'app/components/DSO/components/DSOFundRaisingMilestone'
import { render } from 'test-utils'

jest.mock('app/__tests__/DSO/__tests__/DSOIntroduction', () => ({
  DSOIntroduction: jest.fn(() => <div />)
}))

jest.mock('app/__tests__/DSO/__tests__/DSOBusinessModel', () => ({
  DSOBusinessModel: jest.fn(() => <div />)
}))

jest.mock('app/__tests__/DSO/__tests__/DSOUseOfProceeds', () => ({
  DSOUseOfProceeds: jest.fn(() => <div />)
}))

jest.mock('app/__tests__/DSO/__tests__/DSOFundRaisingMilestone', () => ({
  DSOFundRaisingMilestone: jest.fn(() => <div />)
}))

describe('DSOInformationProfile', () => {
  it('renders without errors', () => {
    render(
      <Form>
        <DSOInformationProfile />
      </Form>
    )
  })

  it('renders __tests__ correctly', () => {
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
