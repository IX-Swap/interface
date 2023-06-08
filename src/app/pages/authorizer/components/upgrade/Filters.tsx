import React from 'react'
import { SidebarSection } from 'ui/Sidebar/SidebarSection'
import { StatusFilter } from './StatusFilter'
import { SearchAndDateFilter } from './SearchAndDateFilter'
import { Form } from 'components/form/Form'

export const Filters = () => {
  return (
    <>
      <SidebarSection>
        <StatusFilter />
      </SidebarSection>

      <SidebarSection padded>
        <Form>
          <SearchAndDateFilter />
        </Form>
      </SidebarSection>
    </>
  )
}
