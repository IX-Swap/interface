//

const statusList = generateStatus()

export default function generateInitialState () {
  return {
    items: [],
    page: 0,
    limit: 5,
    total: null,
    error: null,
    statusCode: null,
    errorCode: null,
    status: statusList.INIT
  }
}
