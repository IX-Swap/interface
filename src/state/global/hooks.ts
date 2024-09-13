import { useSelector } from "react-redux";
import { AppState } from "state";

export const useGlobalState = () => {
  const state = useSelector((state: AppState) => state.global);

  return state;
};
