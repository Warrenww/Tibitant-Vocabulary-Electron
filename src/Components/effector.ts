import {
  createStore,
  createEvent,
  createEffect,
} from 'effector';
import {
  search,
  createVocab,
  editVocab,
  getVocabById,
  deleteVocab,
  onlineSearching,
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
  bookmarks: DataType[],
  onlineSearching: {
    searchWord: string;
    visible: boolean;
    results: Record<string, string>;
  }
}

export const $store = createStore<StoreType>({
  searching: '',
  searchResults: [],
  bookmarks: [],
  onlineSearching: {
    visible: false,
    results: {},
    searchWord: '',
  }
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

export const editFx = createEffect(editVocab);
$store.on(editFx.doneData, (state, results) => {
  const tmp = state.searchResults.filter((x) => !results.find((y) => y.id === x.id));
  return ({
    ...state,
    searchResults: uniqueObject([...tmp, ...results], 'id'),
  })
});

export const deleteFx = createEffect(deleteVocab);
$store.on(deleteFx.doneData, (state, result) => {
  return ({
    ...state,
    searchResults: state.searchResults.filter((x) => x.id !== result),
  });
});

export const loadLinkVocabFx = createEffect(getVocabById);
$store.on(loadLinkVocabFx.doneData, (state, results) => ({
  ...state,
  searchResults: uniqueObject([...results, ...state.searchResults], 'id'),
}));

export const addToBookMark = createEvent<DataType>();
$store.on(addToBookMark, (state, vocab) => ({
  ...state,
  bookmarks: [...state.bookmarks, vocab],
}));

export const removeFromBookMark = createEvent<string>();
$store.on(removeFromBookMark, (state, vocabId) => ({
  ...state,
  bookmarks: state.bookmarks.filter((x) => x.vocabulary_id !== vocabId),
}));

export const clearBookMark = createEvent();
$store.on(clearBookMark, (state) => ({ ...state, bookmarks: [] }));

export const hideOnlineSearchingModal = createEvent();
$store.on(hideOnlineSearchingModal, ({ onlineSearching, ...rest }) => ({
  ...rest,
  onlineSearching: {
    ...onlineSearching,
    visible: false,
  },
}));

export const onlineSearchFx  = createEffect({ handler: onlineSearching });
$store.on(onlineSearchFx.done, ({ onlineSearching, ...rest }, { params, result }) => ({
  ...rest,
  onlineSearching: {
    visible: true,
    results: result,
    searchWord: params,
  },
}));
