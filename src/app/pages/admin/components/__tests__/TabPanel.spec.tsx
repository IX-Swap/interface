import React from 'react'
import { render } from 'test-utils'
import { TabPanel, TabPanelProps } from 'app/pages/admin/components/TabPanel'
import Box from '@mui/material/Box'

jest.mock('@mui/material/Box', () =>
  jest.fn(({ children }) => <div>{children}</div>)
)

describe('TabPanel', () => {
  const MockComp = jest.fn(() => <></>)
  const props: TabPanelProps = {
    value: 0,
    index: 0,
    children: MockComp
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders container as hidden when value and index are not equal', () => {
    props.value = 1
    render(<TabPanel {...props} />)
    expect(Box).toBeCalledWith({ hidden: true, children: MockComp }, {})
  })
})
