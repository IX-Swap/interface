import { useState, useCallback, useEffect } from 'react'
import User from "v2/types/user";
import { useAdminStore } from '../context'

export const useAdminView = (user: User, refresh: Function) => {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<string[]>(user.roles.split(","));
  const { setRoles: requestUpdateRoles } = useAdminStore();

  const updateRoles = useCallback(() => {
    if (!open) {
      setRoles(user.roles.split(","));
    }
  }, [open, user]);

  useEffect(() => {
    updateRoles();
  }, [updateRoles]);

  const handleRoleChange = (value: string[]) => {
    setRoles(value);
  };

  const handleChange = (value: string) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    await requestUpdateRoles(user._id, roles);

    if (refresh) {
      refresh();
    }

    setOpen(false);
  };

  return {
    open, setOpen,
    roles, setRoles,
    handleRoleChange,
    handleChange,
    handleClose,
    handleConfirm
  }
}
