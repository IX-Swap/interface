import { Setup2faStore } from '../store'

describe('Setup2faStore', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('has correct initial value', () => {
    const store = new Setup2faStore()

    expect(store.activeStep).toBe(0)
  })

  it('sets activeStep to given value', () => {
    const store = new Setup2faStore()

    store.setActiveStep(3)
    expect(store.activeStep).toBe(3)
  })
  it('sets activeStep to 0 by default', () => {
    const store = new Setup2faStore()

    store.setActiveStep(3)
    expect(store.activeStep).toBe(3)
    store.setActiveStep()
    expect(store.activeStep).toBe(0)
  })
  it('goes to nextPage', () => {
    const store = new Setup2faStore()

    store.nextPage()
    expect(store.activeStep).toBe(1)
  })

  it('goes to prevPage', () => {
    const store = new Setup2faStore()

    store.setActiveStep(3)
    store.prevPage()
    expect(store.activeStep).toBe(2)
  })
})
