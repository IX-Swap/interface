import { act } from '@testing-library/react-hooks'
import { useTaxResidencies } from 'app/pages/identity/components/TaxDeclarationForm/hooks/useTaxResidencies'
import { waitFor, cleanup, renderHookWithForm } from 'test-utils'

describe('Hook', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct data', async () => {
    await act(async () => {
      const { result } = renderHookWithForm(() => useTaxResidencies(), {
        singaporeOnly: 'yes',
        taxAvailable: true
      })

      await waitFor(
        () => {
          expect(result.current.singaporeOnly).toEqual(true)
          expect(result.current.taxAvailable).toEqual(true)
        },
        { timeout: 1000 }
      )
    })
  })
})
