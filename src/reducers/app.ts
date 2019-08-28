import { handleActions, createAction } from "redux-actions";

const TOGGLE_MENU_COLLAPSED = "TOGGLE_MENU_COLLAPSED";

export declare interface IAPPState {
  isMenuCollapsed?: boolean; // 是否收起侧边栏
}

const defaultState: IAPPState = {
  isMenuCollapsed: false
};

export const toggleCollapsedAction = createAction(
  TOGGLE_MENU_COLLAPSED,
  (isMenuCollapsed: boolean) => ({ isMenuCollapsed: isMenuCollapsed })
);

const reducers = handleActions(
    {
        [TOGGLE_MENU_COLLAPSED]: (state: IAPPState, action) => {
            return {
              ...state,
              isMenuCollapsed: action.payload.isMenuCollapsed
            }
          }
    },
    defaultState
);

export default reducers;
