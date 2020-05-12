import { IInputsCollection } from "../interfaces/IInputsCollection";
import { IDataCollections } from "../interfaces/IDataCollections";
import { IPropertyMenuDataCollectionsFields } from "../interfaces/IPropertyMenuDataCollectionsFields";

export interface IMenuDataCollectionsContext {
  level: number;
  levelTitle: string;
  parentUniqueId: string;
  fields: IPropertyMenuDataCollectionsFields[];
  inputFormValuesCollection: IInputsCollection;
  dataCollections: IDataCollections[];
  onChangeInputFieldValue: (inputData: IInputsCollection) => void;
  onChangeDataCollection: (
    dataCollectionId: string,
    fieldId: string,
    newValue: string | boolean
  ) => void;
  addToDataCollections: (level: number, parentUniqueId?: string) => void;
  navigateLevelDown: (uniqueId: string, levelTitle: string) => void;
  navigateLevelUp: () => void;
  removeDataCollection: (dataCollectionId: string) => void;
  webPartPropertyBtnLabel: string;
  onWebPartPropsChanged: (dataCollections: IDataCollections[]) => void;
}

export enum Actions {
  ON_CHANGE_INPUT_VALUE = "ON_CHANGE_INPUT_VALUE",
  ON_CHANGE_DATA_COLLECTION = "ON_CHANGE_DATA_COLLECTION",
  ADD_TO_DATA_COLLECTIONS = "ADD_TO_DATA_COLLECTIONS",
  REMOVE_DATA_COLLECTION = "REMOVE_DATA_COLLECTION",
  NAVIGATE_LEVEL_DOWN = "NAVIGATE_LEVEL_DOWN",
  NAVIGATE_LEVEL_UP = "NAVIGATE_LEVEL_UP",
}

type RemoveDataCollection = {
  type: Actions.REMOVE_DATA_COLLECTION;
  payload: IDataCollections[];
};

type NavigateLevelDownAction = {
  type: Actions.NAVIGATE_LEVEL_DOWN;
  payload: {
    currentLevel: number;
    parentUniqueId: string;
    levelTitle: string;
    inputFormValuesCollection: IInputsCollection;
  };
};

type NavigateLevelUpAction = {
  type: Actions.NAVIGATE_LEVEL_UP;
  payload: {
    level: number;
    parentUniqueId: string;
    levelTitle: string;
    inputFormValuesCollection: IInputsCollection;
  };
};

type OnChangeInputValueAction = {
  type: Actions.ON_CHANGE_INPUT_VALUE;
  payload: IInputsCollection;
};

type AddToDataCollections = {
  type: Actions.ADD_TO_DATA_COLLECTIONS;
  payload: {
    inputFormValuesCollection: IInputsCollection;
    dataCollections: IDataCollections[];
  };
};

type OnChangeDataCollection = {
  type: Actions.ON_CHANGE_DATA_COLLECTION;
  payload: IDataCollections[];
};

export type IActions =
  | RemoveDataCollection
  | OnChangeInputValueAction
  | AddToDataCollections
  | OnChangeDataCollection
  | NavigateLevelDownAction
  | NavigateLevelUpAction;

export interface IMenuDataState {
  currentLevel: number;
  currentLevelTitle: string;
  currentParentUniqueId: string;
  inputFormValuesCollection: IInputsCollection;
  dataCollections: IDataCollections[];
}
