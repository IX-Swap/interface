import { AdminStore } from "./store";
import generateStoreHookAndProvider from "v2/helpers/generateStoreHookAndProvider";

const store = new AdminStore();

export const {
  Provider: AdminStoreProvider,
  useStore: useAdminStore,
} = generateStoreHookAndProvider<AdminStore>(store);
