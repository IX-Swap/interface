import React from 'react'
import { useAddPopup } from 'state/application/hooks'
import { useLoader, useSaveVettingDraft } from 'state/launchpad/hooks'
import { VettingFormValues } from './types'

interface UseSaveDraftVettingArgs {
  issuanceId: number
  vettingId?: number
  goMain: () => void
  initialData?: VettingFormValues
}

export const useSaveDraftVetting = ({ issuanceId, vettingId, goMain, initialData }: UseSaveDraftVettingArgs) => {
  const saveDraftVetting = useSaveVettingDraft(issuanceId)
  const addPopup = useAddPopup()
  const loader = useLoader(false)

  const saveDraft = React.useCallback(
    async (values: VettingFormValues) => {
      if (!initialData) return
      loader.start()

      try {
        await saveDraftVetting(values, initialData, vettingId)

        addPopup({ info: { success: true, summary: 'Draft saved successfully' } })
        goMain()
      } catch (err: any) {
        addPopup({ info: { success: false, summary: err?.toString() } })
      } finally {
        loader.stop()
      }
    },
    [initialData, vettingId, saveDraftVetting]
  )
  return saveDraft
}
