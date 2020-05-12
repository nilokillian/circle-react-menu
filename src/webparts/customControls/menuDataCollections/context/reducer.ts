import {
  IMenuDataState,
  Actions,
  IActions,
} from "./IMenuDataCollectionsContextTypes";

export const reducer = (state: IMenuDataState, action: IActions) => {
  switch (action.type) {
    case Actions.REMOVE_DATA_COLLECTION:
      return {
        ...state,
        dataCollections: [...action.payload],
      };

    case Actions.ON_CHANGE_INPUT_VALUE:
      return {
        ...state,
        inputFormValuesCollection: action.payload,
      };

    case Actions.ON_CHANGE_DATA_COLLECTION:
      return {
        ...state,
        dataCollections: [...action.payload],
      };

    case Actions.ADD_TO_DATA_COLLECTIONS:
      return {
        ...state,
        inputFormValuesCollection: action.payload.inputFormValuesCollection,
        dataCollections: action.payload.dataCollections,
      };

    case Actions.NAVIGATE_LEVEL_DOWN:
      return {
        ...state,
        currentLevel: action.payload.currentLevel,
        currentParentUniqueId: action.payload.parentUniqueId,
        currentLevelTitle: action.payload.levelTitle,
        inputFormValuesCollection: action.payload.inputFormValuesCollection,
      };

    case Actions.NAVIGATE_LEVEL_UP:
      return {
        ...state,
        currentLevel: action.payload.level,
        currentParentUniqueId:
          action.payload.level === 1 ? "" : action.payload.parentUniqueId,
        currentLevelTitle: action.payload.levelTitle,
        inputFormValuesCollection: action.payload.inputFormValuesCollection,
      };

    default:
      return state;
  }
};
