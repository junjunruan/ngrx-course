import { INITIAL_UI_STATE, UiState } from "./ui-state";
import { INITIAL_STORE_DATA, StoreData } from "./store-data";
/**
 * Created by jruan on 11/29/17.
 */

export interface ApplicationState {
	uiState: UiState,
	storeData: StoreData
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
	uiState: INITIAL_UI_STATE,
	storeData: INITIAL_STORE_DATA
};

