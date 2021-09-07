export const stakingsAdapter = (transactions: any) => {
  return transactions.map((transaction: any) => ({
    ...transaction,
    originalData: transaction?.originalData.map((data: any) => data.toString()),
  }))
}
