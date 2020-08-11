import { AxiosStatic } from 'axios'

const mockAxios = jest.genMockFromModule<AxiosStatic>('axios')

mockAxios.create = jest.fn(() => mockAxios)

mockAxios.request = jest.fn()

export default mockAxios
