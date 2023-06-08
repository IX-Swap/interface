import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { AuthorizableStatus } from 'types/util'

export const useAuthorizerFilter = () => {
  const { getFilterValue } = useQueryFilter()
  const statusQueryValue = getFilterValue(
    'authorizationStatus',
    'Submitted'
  ) as AuthorizableStatus
  const isKYCStatusChecked = getFilterValue('filterByKYCStatus', false)
  const isAccreditationStatusChecked = getFilterValue(
    'filterByAccreditationStatus',
    false
  )
  const fundStatusQueryValue = getFilterValue(
    'fundStatus',
    undefined
  ) as AuthorizableStatus
  const commitmentDSOQueryValue = getFilterValue('dso', undefined)
  const fromDateQueryValue = getFilterValue('fromDate', undefined)
  const toDateQueryValue = getFilterValue('toDate', undefined)
  const searchQueryValue = getFilterValue('search', undefined)
  const searchTokenNameQueryValue = getFilterValue('searchTokenName', undefined)
  const deploymentStatus = getFilterValue('deploymentStatus', undefined)

  const isKYCChecked =
    typeof isKYCStatusChecked !== 'undefined' && isKYCStatusChecked === 'true'
  const isAccreditationChecked =
    typeof isAccreditationStatusChecked !== 'undefined' &&
    isAccreditationStatusChecked === 'true'
  const onlyKYCIsChecked = isKYCChecked && !isAccreditationChecked
  const onlyAccreditationIsChecked = !isKYCChecked && isAccreditationChecked
  const bothAreChecked = isKYCChecked && isAccreditationChecked
  const statusFilterQueryValue = bothAreChecked
    ? 'BOTH'
    : onlyKYCIsChecked
    ? 'KYC'
    : onlyAccreditationIsChecked
    ? 'ACCREDITATION'
    : undefined

  return {
    filter: {
      search: searchQueryValue,
      searchTokenName: searchTokenNameQueryValue,
      status: statusQueryValue,
      statusFilter: statusFilterQueryValue,
      fundStatus: fundStatusQueryValue,
      to: toDateQueryValue,
      from: fromDateQueryValue,
      dso: commitmentDSOQueryValue,
      deploymentStatus: deploymentStatus !== '' ? deploymentStatus : undefined
    }
  }
}
