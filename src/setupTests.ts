// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import 'jest-localstorage-mock'
import ReactDOM from 'react-dom'
import { ReactPortal } from 'react'

beforeAll(() => {
  jest
    .spyOn(ReactDOM, 'createPortal')
    .mockImplementation(element => element as ReactPortal)
})
