export interface ChartProps {
  data: any[] | [] | undefined
  isLoading: boolean
}

export type InvestmentGrowthData = Array<[Date, number]> | undefined
