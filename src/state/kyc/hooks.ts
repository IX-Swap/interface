import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import apiService from 'services/apiService'
import { kyc } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { BROKER_DEALERS_STATUS } from 'state/brokerDealer/hooks'
import { createKYC, fetchGetMyKyc, updateKYC } from './actions'

import { LONG_WAIT_RESPONSE } from 'constants/misc'
import { KYCStatuses } from 'pages/KYC/enum'

const individualKYCFiles = ['proofOfAddress', 'proofOfIdentity', 'evidenceOfAccreditation']
const corporateKYCFiles = [
  'beneficialOwnersAddress',
  'beneficialOwnersIdentity',
  'authorizationDocuments',
  'corporateDocuments',
  'financialDocuments',
  'authorizationDocuments',
]

export function useKYCState() {
  return useSelector<AppState, AppState['kyc']>((state) => state.kyc)
}

export const getMyKyc = async () => {
  try {
    const result = await apiService.get(kyc.getMyKyc)
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getStatusStats = async (params?: Record<string, string | number>) => {
  try {
    const result = await apiService.get(kyc.getStatusStats, undefined, params)
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getCynopsisRisks = async (address: string) => {
  try {
    const result = await apiService.get(kyc.cynopsisRisks(address))
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getIndividualProgress = async () => {
  try {
    const result = await apiService.get(kyc.individualProgress)
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getCorporateProgress = async () => {
  try {
    const result = await apiService.get(kyc.corporateProgress)
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const createIndividualKYC = async (newKYC: any, draft = false) => {
  const formData = new FormData()

  for (const key in newKYC) {
    if (individualKYCFiles.includes(key)) {
      newKYC[key].forEach((item: any) => {
        formData.append(`${key}`, item)
      })
    } else if (['removedDocuments', 'removedTaxDeclarations'].some((x) => x === key)) {
      formData.append(key, JSON.stringify(newKYC[key]))
    } else if (typeof newKYC[key] === 'object' && newKYC[key].length) {
      const entries = (newKYC[key] as Array<any>)
        .map((x: any, idx: number) =>
          Object.entries(x).map(([objKey, value]) => ({ key: `${key}[${idx}][${objKey}]`, value: value as string }))
        )

        .reduce((acc, e) => [...acc, ...e], [])

      for (const entry of entries) {
        formData.append(entry.key, entry.value as string)
      }
    } else if (typeof newKYC[key] === 'object') {
      const entries = Object.entries(newKYC[key]).map(([objKey, value]) => ({
        key: `${key}[${objKey}]`,
        value: value as string,
      }))

      for (const entry of entries) {
        formData.append(entry.key, entry.value as string)
      }
    } else {
      formData.append(key, newKYC[key])
    }
  }

  try {
    const result = await apiService.post(draft ? kyc.createIndividualDraft : kyc.createIndividual, formData)
    return result.data
  } catch (e: any) {
    if (e.message === LONG_WAIT_RESPONSE) {
      return { id: 1, status: 'pending' }
    }

    throw new Error(e.message)
  }
}

export const createCorporateKYC = async (newKYC: any, draft = false) => {
  const formData = new FormData()
  for (const key in newKYC) {
    if (newKYC[key]) {
      if (corporateKYCFiles.includes(key)) {
        newKYC[key].forEach((item: any) => {
          formData.append(`${key}`, item)
        })
      } else if (['removedDocuments', 'removedBeneficialOwners'].some((x) => x === key)) {
        formData.append(key, JSON.stringify(newKYC[key]))
      } else if (typeof newKYC[key] === 'object' && newKYC[key].length) {
        const entries = (newKYC[key] as Array<any>)
          .map((x: any, idx: number) =>
            Object.entries(x).map(([objKey, value]) => ({ key: `${key}[${idx}][${objKey}]`, value: value as string }))
          )

          .reduce((acc, e) => [...acc, ...e], [])

        for (const entry of entries) {
          formData.append(entry.key, entry.value as string)
        }
      } else if (typeof newKYC[key] === 'object') {
        const entries = Object.entries(newKYC[key]).map(([objKey, value]) => ({
          key: `${key}[${objKey}]`,
          value: value as string,
        }))

        for (const entry of entries) {
          formData.append(entry.key, entry.value as string)
        }
      } else {
        formData.append(key, newKYC[key])
      }
    }
  }

  try {
    const result = await apiService.post(draft ? kyc.createCorporateDraft : kyc.createCorporate, formData)
    return result.data
  } catch (e: any) {
    if (e.message === LONG_WAIT_RESPONSE) {
      return { id: 1, status: 'pending' }
    }

    throw new Error(e.message)
  }
}

// export const createCorporateKYC = async (newKYC: any) => {
//   const formData = new FormData()

//   for (const key in newKYC) {
//     if (corporateKYCFiles.includes(key)) {
//       newKYC[key].forEach((item: any) => {
//         formData.append(`${key}`, item)
//       })
//     } else {
//       if (key === 'removedDocuments' || key === 'removedBeneficialOwners') {
//         formData.append(key, JSON.stringify(newKYC[key]))
//       } else {
//         formData.append(key, newKYC[key])
//       }
//     }
//   }

//   try {
//     const result = await apiService.post(kyc.createCorporate, formData)
//     return result.data
//   } catch (e: any) {
//     if (e.message === LONG_WAIT_RESPONSE) {
//       return { id: 1, status: 'pending' }
//     }

//     throw new Error(e.message)
//   }
// }

export const updateIndividualKYC = async (kycId: number, newKYC: any, draft = false) => {
  const formData = new FormData()
  for (const key in newKYC) {
    if (individualKYCFiles.includes(key)) {
      newKYC[key].forEach((item: any) => {
        if (item.uuid || item.asset?.uuid) {
          console.log('not binary')
        } else {
          formData.append(`${key}`, item)
        }
      })
    } else {
      if (['removedDocuments', 'removedTaxDeclarations'].some((x) => x === key)) {
        formData.append(key, JSON.stringify(newKYC[key]))
      } else if (typeof newKYC[key] === 'object' && newKYC[key].length) {
        const entries = (newKYC[key] as Array<any>)
          .map((x: any, idx: number) =>
            Object.entries(x).map(([objKey, value]) => ({ key: `${key}[${idx}][${objKey}]`, value: value as string }))
          )

          .reduce((acc, e) => [...acc, ...e], [])

        for (const entry of entries) {
          if (entry.value) {
            formData.append(entry.key, entry.value as string)
          }
        }
      } else if (typeof newKYC[key] === 'object') {
        const entries = Object.entries(newKYC[key]).map(([objKey, value]) => ({
          key: `${key}[${objKey}]`,
          value: value as string,
        }))

        for (const entry of entries) {
          if (entry.value) {
            formData.append(entry.key, entry.value as string)
          }
        }
      } else {
        formData.append(key, newKYC[key])
      }
    }
  }

  try {
    const result = draft
      ? await apiService.post(kyc.updateIndividual(kycId, draft), formData)
      : await apiService.put(kyc.updateIndividual(kycId, draft), formData)
    return result.data
  } catch (e) {
    console.log(e)
  }
}

// export const updateCorporateKYC = async (kycId: number, newKYC: any) => {
//   const formData = new FormData()

//   for (const key in newKYC) {
//     if (corporateKYCFiles.includes(key)) {
//       newKYC[key].forEach((item: any) => {
//         if (item.uuid || item.asset?.uuid) {
//           console.log('not binary')
//         } else {
//           formData.append(`${key}`, item)
//         }
//       })
//     } else {
//       if (key === 'removedDocuments' || key === 'removedBeneficialOwners') {
//         formData.append(key, JSON.stringify(newKYC[key]))
//       } else {
//         formData.append(key, newKYC[key])
//       }
//     }
//   }

//   try {
//     const result = await apiService.put(kyc.updateCorporate(kycId), formData)
//     return result.data
//   } catch (e) {
//     console.log(e)
//   }
// }

export const updateCorporateKYC = async (kycId: number, newKYC: any, draft = false) => {
  const formData = new FormData()
  for (const key in newKYC) {
    if (newKYC[key]) {
      if (corporateKYCFiles.includes(key)) {
        newKYC[key].forEach((item: any) => {
          if (item) {
            if (item.uuid || item.asset?.uuid) {
              console.log('not binary')
            } else {
              formData.append(`${key}`, item)
            }
          }
        })
      } else {
        if (['removedDocuments', 'removedBeneficialOwners'].some((x) => x === key)) {
          formData.append(key, JSON.stringify(newKYC[key]))
        } else if (typeof newKYC[key] === 'object' && newKYC[key].length) {
          const entries = (newKYC[key] as Array<any>)
            .map((x: any, idx: number) =>
              Object.entries(x).map(([objKey, value]) => ({ key: `${key}[${idx}][${objKey}]`, value: value as string }))
            )

            .reduce((acc, e) => [...acc, ...e], [])

          for (const entry of entries) {
            if (entry.value) {
              formData.append(entry.key, entry.value as string)
            }
          }
        } else if (typeof newKYC[key] === 'object') {
          const entries = Object.entries(newKYC[key]).map(([objKey, value]) => ({
            key: `${key}[${objKey}]`,
            value: value as string,
          }))

          for (const entry of entries) {
            if (entry.value) {
              formData.append(entry.key, entry.value as string)
            }
          }
        } else {
          formData.append(key, newKYC[key])
        }
      }
    }
  }

  try {
    if (formData.get('taxIdAvailable') === null) {
      formData.set('taxIdAvailable', newKYC.taxIdAvailable)
    }
    if (formData.get('taxNumber') === null) {
      formData.set('taxNumber', newKYC.taxNumber)
    }
    const result = draft
      ? await apiService.post(kyc.createCorporateDraft, formData)
      : await apiService.put(kyc.updateCorporate(kycId, draft), formData)
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export function useCreateIndividualKYC() {
  const dispatch = useDispatch<AppDispatch>()
  const getMyKyc = useGetMyKyc()
  const callback = useCallback(
    async (newKYC: any, draft = false) => {
      try {
        dispatch(createKYC.pending())
        const data = await createIndividualKYC(newKYC, draft)
        dispatch(createKYC.fulfilled(data))
        await getMyKyc()
        return data
      } catch (error: any) {
        if (error.message === LONG_WAIT_RESPONSE) {
          const data = { id: 1, status: KYCStatuses.DRAFT } as any
          dispatch(createKYC.fulfilled(data))
          return data
        }

        dispatch(createKYC.rejected({ errorMessage: 'Could not create individual kyc' }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch, getMyKyc]
  )
  return callback
}

export function useCreateCorporateKYC() {
  const dispatch = useDispatch<AppDispatch>()
  const getMyKyc = useGetMyKyc()
  const callback = useCallback(
    async (newKYC: any, draft = false) => {
      try {
        dispatch(createKYC.pending())
        const data = await createCorporateKYC(newKYC, draft)
        dispatch(createKYC.fulfilled(data))
        await getMyKyc()
        return data
      } catch (error: any) {
        if (error.message === LONG_WAIT_RESPONSE) {
          const data = { id: 1, status: KYCStatuses.DRAFT } as any
          dispatch(createKYC.fulfilled(data))
          return data
        }

        dispatch(createKYC.rejected({ errorMessage: 'Could not create individual kyc' }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch, getMyKyc]
  )
  return callback
}

// export function useCreateCorporateKYC() {
//   const dispatch = useDispatch<AppDispatch>()
//   const getMyKyc = useGetMyKyc()
//   const callback = useCallback(
//     async (newKYC: any) => {
//       try {
//         dispatch(createKYC.pending())
//         const data = await createCorporateKYC(newKYC)
//         dispatch(createKYC.fulfilled(data))
//         await getMyKyc()
//         return data
//       } catch (error: any) {
//         if (error.message === LONG_WAIT_RESPONSE) {
//           const data = { id: 1, status: KYCStatuses.DRAFT } as any
//           dispatch(createKYC.fulfilled(data))
//           return data
//         }

//         dispatch(createKYC.rejected({ errorMessage: 'Could not create corporate kyc' }))
//         return BROKER_DEALERS_STATUS.FAILED
//       }
//     },
//     [dispatch, getMyKyc]
//   )
//   return callback
// }

export function useUpdateIndividualKYC() {
  const dispatch = useDispatch<AppDispatch>()
  const getMyKyc = useGetMyKyc()

  const callback = useCallback(
    async (kycId: number, newKYC: any, draft = false) => {
      try {
        dispatch(updateKYC.pending())
        const data = await updateIndividualKYC(kycId, newKYC, draft)
        dispatch(updateKYC.fulfilled(data))
        await getMyKyc()
        return data
      } catch (error: any) {
        dispatch(updateKYC.rejected({ errorMessage: 'Could not update individual kyc' }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch, getMyKyc]
  )
  return callback
}

export function useUpdateCorporateKYC() {
  const dispatch = useDispatch<AppDispatch>()
  const getMyKyc = useGetMyKyc()

  const callback = useCallback(
    async (kycId: number, newKYC: any, draft = false) => {
      try {
        dispatch(updateKYC.pending())
        const data = await updateCorporateKYC(kycId, newKYC, draft)
        dispatch(updateKYC.fulfilled(data))
        await getMyKyc()
        return data
      } catch (error: any) {
        dispatch(updateKYC.rejected({ errorMessage: 'Could not update individual kyc' }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch, getMyKyc]
  )
  return callback
}

// export function useUpdateCorporateKYC() {
//   const dispatch = useDispatch<AppDispatch>()
//   const getMyKyc = useGetMyKyc()
//   const callback = useCallback(
//     async (kycId: number, newKYC: any) => {
//       try {
//         dispatch(updateKYC.pending())
//         const data = await updateCorporateKYC(kycId, newKYC)
//         dispatch(updateKYC.fulfilled(data))
//         await getMyKyc()
//         return data
//       } catch (error: any) {
//         dispatch(updateKYC.rejected({ errorMessage: 'Could not update corporate kyc' }))
//         return BROKER_DEALERS_STATUS.FAILED
//       }
//     },
//     [dispatch, getMyKyc]
//   )
//   return callback
// }

export function useGetMyKyc() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(async () => {
    try {
      dispatch(fetchGetMyKyc.pending())
      const data = await getMyKyc()
      dispatch(fetchGetMyKyc.fulfilled(data))
      return BROKER_DEALERS_STATUS.SUCCESS
    } catch (error: any) {
      dispatch(fetchGetMyKyc.rejected({ errorMessage: 'Could not get kyc' }))
      return BROKER_DEALERS_STATUS.FAILED
    }
  }, [dispatch])
  return callback
}
