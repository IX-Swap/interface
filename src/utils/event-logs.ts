import * as Sentry from '@sentry/react'

export const WITHDRAW_FLOW_EVENT = {
  WITHDRAW_FEE_PAID: 'WITHDRAW:WITHDRAW_FEE_PAID',
  CREATE_BURN_TX: 'WITHDRAW:CREATE_BURN_TX',
}

export const INVEST_FLOW_EVENTS = {
  INVEST: (stage: string) => `INVEST:${stage}`,
}

export class WalletEvent {
  private eventType: string
  private _data: Record<string, any> = {}
  private _walletAddress: string

  constructor(eventType: string) {
    this.eventType = eventType
  }

  walletAddress(walletAddress: string) {
    Sentry.setUser({
      id: walletAddress,
    })
    this._walletAddress = walletAddress
    return this
  }

  data(data: Record<string, any>) {
    try {
      this._data = data
    } catch (e) {
      console.error(e)
    }
    return this
  }

  info(message: string) {
    try {
      Sentry.addBreadcrumb({
        category: 'blockchain',
        level: 'info',
        data: this._data,
      })
      Sentry.captureMessage(`[Wallet Event FE] ${this.eventType.toUpperCase()} ${message} ${this._walletAddress}`)
    } catch (e) {
      console.error(e)
    }
  }

  error(message: string) {
    Sentry.addBreadcrumb({
      category: 'blockchain',
      level: 'error',
      data: this._data,
    })
    Sentry.captureMessage(`[Wallet Event FE] ${this.eventType.toUpperCase()} ${message} ${this._walletAddress}`)
  }
}
