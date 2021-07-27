import {
  createStore,
  createEvent,
  createEffect,
} from 'effector';
import {
  search,
  createVocab,
  getVocabById,
} from './API';
import uniqueObject from '../Utils/uniqueObject';

export interface DataType extends Record<string, unknown> {
  id: number;
  future: number | null;
  imperative: number | null;
  link: number | null;
  page: number | null;
  part_of_speech_id: number;
  past: number | null;
  transitive: boolean | null;
  translation: string;
  vocabulary: string;
  vocabulary_id: string;
  hidden?: boolean;
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
  searchResults: uniqueObject(result, 'id'),
}));

export const createFx = createEffect(createVocab);
$store.on(createFx.doneData, (state, results) => ({
  ...state,
  searchResults: uniqueObject(results, 'id'),
}));

export const loadLinkVocabFx = createEffect(getVocabById);
$store.on(loadLinkVocabFx.doneData, (state, results) => ({
  ...state,
  searchResults: uniqueObject([...results, ...state.searchResults], 'id'),
}));
