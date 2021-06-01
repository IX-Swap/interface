export const orderData = [
  {
    price: 123.14,
    amount: 1500.14,
    total: 3000.14
  },
  {
    price: 456.14,
    amount: 1200.14,
    total: 3000.14
  },
  {
    price: 123.14,
    amount: 1500.14,
    total: 3000.14
  },
  {
    price: 789.14,
    amount: 2500.14,
    total: 3000.14
  },
  {
    price: 789.14,
    amount: 2900.14,
    total: 3000.14
  },
  {
    price: 789.14,
    amount: 2500.14,
    total: 3000.14
  },
  {
    price: 123.14,
    amount: 1500.14,
    total: 3000.14
  },
  {
    price: 456.14,
    amount: 1200.14,
    total: 3000.14
  }
]

export const orderBookData = {
  asks: orderData,
  bids: orderData.reverse()
}

export const marketTradesData = [
  {
    price: 24.5,
    amount: 300,
    time: new Date().toLocaleDateString(),
    transaction: 'buy'
  },
  {
    price: 300,
    amount: 15000,
    time: new Date().toLocaleDateString(),
    transaction: 'sell'
  },
  {
    price: 78.9,
    amount: 14500,
    time: new Date().toLocaleDateString(),
    transaction: 'sell'
  }
]
