import apiService from "../../../../services/api";
import { UpdateUserRoleArgs } from './types';

const adminService = {
  _baseURL: "/auth",

  _buildURL(path: string) {
    return `${this._baseURL}${path}`;
  },

  async setUserRole (args: UpdateUserRoleArgs) {
    const { userId, ...payload } = args;
    const url = this._buildURL(`/users/${userId}/roles`);
    return await apiService.put(url, payload);
  }
};

export default adminService;
