import { useCustomField } from 'hooks/customFields/useCustomField'
import { useUpdateCustomField } from 'hooks/customFields/useUpdateCustomField'
import { AppFeature, AppService } from 'types/app'
import { DigitalSecurityOffering, DSOTableColumn } from 'types/dso'
import { TableColumn } from 'types/util'
import { columns } from 'app/pages/invest/components/DSOTable/columns'

export const getDefaultColumnsObject = () => {
  return columns.reduce(
    (acc, cur) => ({ ...acc, [cur.key]: true }),
    {}
  ) as Record<DSOTableColumn, boolean>
}

export const useDSOTableColumns = () => {
  const args = {
    service: AppService.Invest,
    feature: AppFeature.Offerings
  }
  const { data } = useCustomField(args)
  const [updateCustomField] = useUpdateCustomField(args)

  const getIsColumnSelected = (
    column: TableColumn<DigitalSecurityOffering, DSOTableColumn>
  ) => {
    if (data === undefined) {
      return true
    }

    return data.columns[column.key]
  }

  const columnsArray = columns.filter(getIsColumnSelected)

  const getUpdateColumnPayload = (column: DSOTableColumn, value: boolean) => {
    const columnsObject = data?.columns ?? getDefaultColumnsObject()

    return {
      customFields: {}, // TODO: remove once backend validation is fixed
      columns: {
        ...columnsObject,
        [column]: value
      }
    }
  }

  const selectColumn = async (key: DSOTableColumn) => {
    return await updateCustomField(getUpdateColumnPayload(key, true))
  }

  const deselectColumn = async (key: DSOTableColumn) => {
    return await updateCustomField(getUpdateColumnPayload(key, false))
  }

  return {
    columns: columnsArray,
    selectColumn,
    deselectColumn
  }
}
