import { AppStateInterface } from "src/app/shared/types/appState.interface";
import { PopularTagsStateInterface } from "../types/popularTagsState.interface";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const popularTagsFeatureSelector = createFeatureSelector<
  AppStateInterface,
  PopularTagsStateInterface
>("popularTags");

export const populartagsSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.data
);

export const isLoadingSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.isLoading
);

export const errorSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.error
);
