export interface ChartProps {
  data: any[] | [] | undefined
  isLoading: boolean
}

export type investmentGrowthData = Array<[Date, number]> | undefined
