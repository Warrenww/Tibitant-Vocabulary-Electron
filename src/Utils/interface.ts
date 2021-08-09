export interface Vocabulary {
  id: number;
  page: number | null;
  vocabulary: string;
}

export interface VocabularyInfo {
  id: number;
  vocabulary_id: number;
  part_of_speech_id: number | null;
  transitive: boolean | null;
  past: number | null;
  future: number | null;
  imperative: number | null;
  link: number | null;
  translation: string;
}

interface VocabWithPage {
  vocabulary?: string;
  page?: number;
}

export interface CreateVocabDto {
  tibetan: string;
  translation: string;
  page?: number;
  part_of_speech_id?: number;
  transitive?: boolean;
  past?: VocabWithPage;
  future?: VocabWithPage;
  imperative?: VocabWithPage;
}

export interface EditVocabDto extends Pick<CreateVocabDto, 'translation' | 'page' | 'part_of_speech_id'> {
  id: number;
  vocabulary_id: number;
}

export type SystemCommand = 'close' | 'maximize' | 'minimize';
