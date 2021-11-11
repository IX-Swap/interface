import {
  LibrarySymbolInfo,
  ResolutionString,
  SubscribeBarsCallback
} from 'types/charting_library'
import { GetBarsResult, DataSubscribers } from 'types/tvChart'
import { periodLengthSeconds } from '../utils'
import { getBarsData } from './history-provider'

export class DataPulseProvider {
  private readonly _subscribers: DataSubscribers = {}
  private _requestsPending: number = 0

  public constructor(updateFrequency: number) {
    setInterval(this.updateData.bind(this), updateFrequency)
  }

  public addSubscriber(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    listener: SubscribeBarsCallback,
    listenerGuid: string
  ) {
    if (this._subscribers[listenerGuid] !== undefined) {
      return
    }
    this._subscribers[listenerGuid] = {
      lastBarTime: null,
      listener,
      resolution,
      symbolInfo
    }
  }

  // eslint-disable-next-line accessor-pairs
  public set requestsPending(requestCount: number) {
    this._requestsPending = requestCount
  }

  public get subscribers() {
    return this._subscribers
  }

  public subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    newDataCallback: SubscribeBarsCallback,
    listenerGuid: string
  ): void {
    this.addSubscriber(symbolInfo, resolution, newDataCallback, listenerGuid)
  }

  public unsubscribeBars(listenerGuid: string): void {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this._subscribers[listenerGuid]
  }

  public updateData(): void {
    if (this._requestsPending > 0) {
      return
    }

    this.requestsPending = 0
    for (const listenerGuid in this._subscribers) {
      // tslint:disable-line:forin
      this._requestsPending += 1
      this._updateDataForSubscriber(listenerGuid)
        .then(() => {
          this._requestsPending -= 1
        })
        .catch((reason?: string | Error) => {
          this._requestsPending -= 1
        })
    }
  }

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  private _updateDataForSubscriber(listenerGuid: string): Promise<void> {
    const subscriptionRecord = this._subscribers[listenerGuid]

    const rangeEndTime = parseInt((Date.now() / 1000).toString())

    const rangeStartTime =
      rangeEndTime - periodLengthSeconds(subscriptionRecord.resolution, 10)

    return getBarsData(
      subscriptionRecord.symbolInfo,
      subscriptionRecord.resolution,
      rangeStartTime,
      rangeEndTime
    ).then((result: GetBarsResult) => {
      this._onSubscriberDataReceived(listenerGuid, result)
    })
  }

  private _onSubscriberDataReceived(
    listenerGuid: string,
    result: GetBarsResult
  ): void {
    if (this._subscribers[listenerGuid] === undefined) {
      return
    }

    const bars = result.bars
    if (bars.length === 0) {
      return
    }

    const lastBar = bars[bars.length - 1]
    const subscriptionRecord = this._subscribers[listenerGuid]

    if (
      subscriptionRecord.lastBarTime !== null &&
      lastBar.time < subscriptionRecord.lastBarTime
    ) {
      return
    }

    const isNewBar =
      subscriptionRecord.lastBarTime !== null &&
      lastBar.time > subscriptionRecord.lastBarTime

    if (isNewBar) {
      if (bars.length < 2) {
        throw new Error(
          'Not enough bars in history for proper pulse update. Need at least 2.'
        )
      }

      const previousBar = bars[bars.length - 2]
      subscriptionRecord.listener(previousBar)
    }

    subscriptionRecord.lastBarTime = lastBar.time
    subscriptionRecord.listener(lastBar)
  }
}
