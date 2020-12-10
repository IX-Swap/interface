export interface ChartProps {
  data: any[] | [] | undefined
  isLoading: boolean
}

export type investmentGrowthData =
  | Array<[Date, number] | Array<{ type: string; label: string }>>
  | undefined
