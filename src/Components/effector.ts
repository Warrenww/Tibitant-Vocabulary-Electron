import {
  createStore,
  createEvent,
  createEffect,
} from 'effector';
import {
  search,
  createVocab,
} from './API';

export interface DataType {
  future: number | null;
  id: number;
  imperative: boolean | null;
  link: number | null;
  page: number | null;
  part_of_speech_id: number;
  past: number | null;
  transitive: boolean | null;
  translation: string;
  vocabulary: string;
  vocabulary_id: string;
}

interface StoreType {
  searching: string,
  searchResults: DataType[],
}

export const $store = createStore<StoreType>({
  searching: '',
  searchResults: [],
});

export const setSearching = createEvent<string>();
$store.on(setSearching, (state, keyword: string) => {
  if (keyword === '') return ({
    ...state,
    searching: '',
    searchResults: [],
  });
  else return ({
    ...state,
    searching: keyword,
  });
});

export const searchFx = createEffect(search);
$store.on(searchFx.doneData, (state, result) => ({
  ...state,
  searchResults: result,
}));

export const createFx = createEffect(createVocab);
$store.on(createFx.doneData, (state, results) => ({
  ...state,
  searchResults: results,
}));
