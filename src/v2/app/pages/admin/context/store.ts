import { action } from "mobx";
import { snackbarService, MessageType } from "uno-material-ui";
import adminService from "../service";

export class AdminStore {
  @action
  public setRoles = async (userId: string, roles: string[]): Promise<void> => {
    const { success, message } = await adminService.setUserRole({ userId, roles: roles.join(',') })
    const snackbarOptions: [string, MessageType?] = [message];

    if (!success) snackbarOptions.push("error");
    // eslint-disable-next-line no-void
    void snackbarService.showSnackbar(...snackbarOptions);
  };
}
