export default class HttpResponse<T> {
  data?: T
  status: boolean
  message?: string

  constructor(mStatus: boolean, mData?: T, mMessage?: string) {
    this.data = mData
    this.status = mStatus
    this.message = mMessage
  }
}
