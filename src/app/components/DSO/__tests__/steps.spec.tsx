import { dsoFormSteps } from 'app/components/DSO/steps'

describe('steps', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('steps have the correct labels', () => {
    expect(dsoFormSteps[0].label).toEqual('DSO Information')
    expect(dsoFormSteps[1].label).toEqual('Company Information')
    expect(dsoFormSteps[2].label).toEqual('Documents')
  })

  // it('steps have the form value getters', () => {
  //   expect(dsoFormSteps[0].getFormValues()).toBe(null)
  //   expect(dsoFormSteps[1].getFormValues()).toBe(null)
  //   expect(dsoFormSteps[2].getFormValues()).toBe(null)
  // })
})
