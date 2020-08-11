//
import actionGenerator from 'context/base/withPagination/actions'

export const init = id => {
  // Dso List
  const { getter: getDsoList, ...dsoListPageMethods } = actionGenerator(
    'dsoList',
    `/issuance/dso/list/${id}`,
    {}
  )

  return {
    getDsoList,
    ...dsoListPageMethods
  }
}
