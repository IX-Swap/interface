import {
  columns,
  renderDate
} from 'app/pages/admin/components/AdminIdentityList/columns'

describe('columns', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('has the correct labels', () => {
    expect(columns[0].label).toEqual('Date of Application')
    expect(columns[1].label).toEqual('Name')
    expect(columns[2].label).toEqual('Email Address')
    expect(columns[3].label).toEqual('Country')
    expect(columns[4].label).toEqual('Created by')
  })

  it('renders date correctly', () => {
    expect(renderDate('2021-03-24T02:34:44.863Z')).toEqual('03/24/2021')
  })
})
