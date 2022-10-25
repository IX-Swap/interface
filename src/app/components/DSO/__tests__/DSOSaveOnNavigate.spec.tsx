import React from 'react'
import { Form } from 'components/form/Form'
import { render, cleanup } from 'test-utils'
import { Route } from 'react-router-dom'
import { history } from 'config/history'
import { waitFor } from '@testing-library/dom'
import { act } from 'react-dom/test-utils'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { DSOSaveOnNavigate } from '../DSOSaveOnNavigate'
import { dsoFormSteps } from '../steps'
import { DSOFormContextWrapper } from '../DSOFormContext'

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: () => ({
    formState: {
      isDirty: true
    },
    watch: () => jest.fn()
  })
}))

describe('DSOSaveOnNavigate', () => {
  const pathname = '/test'
  const save = jest.fn(async () => await Promise.resolve({}))
  const mutation = [save, { isLoading: false }] as any
  const transformer = jest.fn()
  const nextCallback = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  beforeEach(() => {
    history.push(pathname)
  })

  it('renders without errors', () => {
    render(
      <DSOFormContextWrapper>
        <Form>
          <DSOSaveOnNavigate
            transformData={transformer}
            mutation={mutation}
            isNew={false}
            redirectFunction={() => IdentityRoute.editCorporate}
            activeStep={1}
            move={'backward'}
            stepsList={dsoFormSteps}
            nextCallback={nextCallback}
          />
        </Form>
      </DSOFormContextWrapper>
    )
  })

  it('renders a Back button if passed with backward move prop', () => {
    const { getByText } = render(
      <DSOFormContextWrapper>
        <Form>
          <DSOSaveOnNavigate
            transformData={transformer}
            mutation={mutation}
            isNew={false}
            redirectFunction={() => IdentityRoute.editCorporate}
            activeStep={1}
            move={'backward'}
            stepsList={dsoFormSteps}
            nextCallback={nextCallback}
          />
        </Form>
      </DSOFormContextWrapper>
    )
    expect(getByText('Back')).toBeTruthy()
  })

  it('renders a Next button if passed with forward move prop', () => {
    const { getByText } = render(
      <DSOFormContextWrapper>
        <Form>
          <DSOSaveOnNavigate
            transformData={transformer}
            mutation={mutation}
            isNew={false}
            redirectFunction={() => IdentityRoute.editCorporate}
            activeStep={1}
            move={'forward'}
            stepsList={dsoFormSteps}
            nextCallback={nextCallback}
          />
        </Form>
      </DSOFormContextWrapper>
    )
    expect(getByText('Next')).toBeTruthy()
  })

  it('renders a Next button if move prop is null', () => {
    const { getByText } = render(
      <DSOFormContextWrapper>
        <Form>
          <DSOSaveOnNavigate
            transformData={transformer}
            mutation={mutation}
            isNew={false}
            redirectFunction={() => IdentityRoute.editCorporate}
            activeStep={1}
            move={null}
            stepsList={dsoFormSteps}
            nextCallback={nextCallback}
          />
        </Form>
      </DSOFormContextWrapper>
    )
    expect(getByText('Next')).toBeTruthy()
  })

  it('invokes save function when location changed', async () => {
    render(
      <Route path={pathname}>
        <DSOFormContextWrapper>
          <Form>
            <DSOSaveOnNavigate
              transformData={transformer}
              mutation={mutation}
              isNew={false}
              redirectFunction={() => IdentityRoute.editCorporate}
              activeStep={1}
              move={'backward'}
              stepsList={dsoFormSteps}
              nextCallback={nextCallback}
            />
          </Form>
        </DSOFormContextWrapper>
      </Route>
    )

    act(() => {
      history.push(pathname + '?test')
    })

    await waitFor(() => {
      expect(save).toBeCalledTimes(0)
    })
  })
})
