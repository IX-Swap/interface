import * as FullStory from '@fullstory/browser'
import { FULLSTORY } from 'v2/config'

export const setupFullStory = () => {
  if (FULLSTORY === 'true') {
    FullStory.init({ orgId: 'Z65H6' })
  }
}
