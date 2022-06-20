export enum AppContextActionTypes {
  INCREASE_SOURCES_COUNT = 'INCREASE_SOURCES_COUNT',
  CLEAR_SOURCES_COUNT = 'CLEAR_SOURCES_COUNT',
}

export type TypeAppContextState = {
  sourcesCount: number;
};

export type TypeAppContextAction = { type: AppContextActionTypes };

export type TypeAppContext = {
  sourcesCount: number;
  addSourcesCount: () => void;
  clearSourcesCount: () => void;
};
