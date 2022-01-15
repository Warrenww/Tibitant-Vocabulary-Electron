import sqlite3 from 'sqlite3';
import { DataType } from './Components/effector';
import {
  Vocabulary,
  EditVocabDto,
  VocabularyInfo,
} from './Utils/interface';

const sqlite = sqlite3.verbose();

export default class Service {
  private database;
  constructor(dbPath: string) {
    this.database = new sqlite.Database(dbPath, (err) => {
      if (err) console.error('Database opening error: ', err);
    });
  }

  getDataById (id: number) {
    return new Promise<DataType>(
      (resolve) => this.database.all( `
        select * from vocabulary
        join vocabulary_info as info on info.vocabulary_id = vocabulary.id
        where vocabulary.id = ${id}
      `,
      (err, rows) => err ? console.log(err) : resolve(rows[0]),
    ));
  }

  search (keyword: string) {
    return new Promise<any[]>((resolve) => {
      this.database.all(`
        select * from vocabulary join vocabulary_info as info
        on info.vocabulary_id = vocabulary.id
        where vocabulary.vocabulary like "${keyword}%"
        order by page
      `, (err, rows) => {
        if (err) console.log(err);
        else resolve(rows);
      });
    });
  }

  getVocabById (id: number) {
    return new Promise<any[]>((resolve) => {
      this.database.all(`
        select * from vocabulary join vocabulary_info as info
        on info.vocabulary_id = vocabulary.id
        where vocabulary.id = ${id}
      `, (err, rows) => {
        if (err) console.log(err);
        else resolve(rows);
      })
    });
  }

  getVocabInfoById (id: number) {
    return new Promise<VocabularyInfo & {
      vocId: number;
    }>((resolve) => {
      this.database.all(`
        select info.*, vocabulary.id as vocId
        from vocabulary_info as info
        join vocabulary
        on info.vocabulary_id = vocabulary.id
        where info.id = ${id}
      `, (err, rows) =>{
        if (err) console.log(err);
        else resolve(rows[0]);
      })
    })
  }

  getVocabFromTibetan (tibetan: string) {
    return new Promise<Vocabulary[]>(
      (resolve) => this.database.all(
        `Select * from vocabulary where vocabulary="${tibetan}"`,
        (err, rows) => {
          if (err) console.log(err);
          else resolve(rows);
        },
    ));
  }

  updateVocab (id: number, page: number) {
    return new Promise<void>(
      (resolve) => this.database.exec(
        `UPDATE vocabulary SET page=${page} WHERE id=${id}`,
        (err) => err ? console.log(err) : resolve(),
    ));
  }

  updateVocabInfo (
    id: number,
    data: Omit<EditVocabDto, 'id' | 'vocabulary_id'>
  ) {
    const sql = `Update vocabulary_info set ${
      Object.keys(data).map((key: keyof(Omit<EditVocabDto, 'id' | 'vocabulary_id'>)) => (
        `${key}=${typeof data[key] === 'string' ? `"${(data[key])}"` : data[key]}`
      )).join(',')
    } where id=${id}`;

    return new Promise<DataType>((resolve) => {
      this.database.exec(sql,
        async (err) => err ? console.log(err) : resolve((await this.getDataById(id)))
      );
    });
  }

  createVocab (tibetan: string, page: number | null) {
    const sql = `INSERT INTO vocabulary (vocabulary${page ? ", page" : ""}) VALUES ("${tibetan}"${page? `, ${page}` : ''})`;

    return new Promise<number>(
    (resolve) => {
      this.database.exec(sql,
        async (err) => err ? console.log(err) : resolve((await this.getVocabFromTibetan(tibetan))[0].id)
      );
    });
  }

  async InsertIntoVocabulary (tibetan: string, page: number) {
    const existingVocab = await this.getVocabFromTibetan(tibetan);
    if (existingVocab.length) {
      if (page) await this.updateVocab(page, existingVocab[0].id);
      return existingVocab[0].id;
    }
    else {
      const insertId = await this.createVocab(tibetan, page);
      return insertId;
    }
  };

  async InsertIntoInfo (vocabId: number, data: Record<string, any>)  {
    const insertData: Record<string, any> = {
      ...data,
      vocabulary_id: vocabId,
    };
    const validKeys = Object.keys(insertData).filter((key) => (insertData[key] !== undefined && insertData[key]  !== null));
    const validValues = validKeys.map((key) => insertData[key]);

    const sql = `
    INSERT INTO vocabulary_info (${validKeys.join(',')}) VALUES
    (${
      validValues
      .map(x => typeof x === 'string' ? `"${x}"` : x)
      .join(',')
    })`;

    return new Promise<void>((resolve) => {
      this.database.all(sql, (err) => err ? console.log(err) : resolve());
    });
  };

  async DeleteVocab (id: number) {
    const exist = await this.getVocabInfoById(id);

    if (!exist) return;
    const { vocId, id: infoId } = exist;

    await (() => new Promise<void>((resolve) => {
      this.database.all(`Delete from vocabulary_info where id=${infoId}`, () => resolve())
    }))();

    const vocabs = await this.getVocabById(vocId);
    if (vocabs.length === 0) {
      this.database.all(`Delete from vocabulary where id=${vocId}`);
    }

    return infoId;
  }

}
