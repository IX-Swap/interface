import { action, observable } from 'mobx'
import {
  IndividualIdentity,
  CorporateIdentity
} from '../../../../types/identity'

export class IdentityPageStore {
  @observable activeIndividualIdentity?: IndividualIdentity;
  @observable activeCorporateIdentity?: CorporateIdentity;

  @action
  setIndividualIdentity = (identity: IndividualIdentity) => {
    this.activeIndividualIdentity = identity
  };

  @action
  setCorporateIdentity = (identity: CorporateIdentity) => {
    this.activeCorporateIdentity = identity
  };
}
