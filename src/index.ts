import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import sqlite3 from 'sqlite3';
import {
  CreateVocabDto,
  EditVocabDto,
  SystemCommand,
} from './Utils/interface';
import { DataType } from './Components/effector';
import Service from './database';
// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): BrowserWindow => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.maximize();
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  return mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  const mainWindow = createWindow();
  ipcMain.on('SystemCommand', (_event, command: SystemCommand) => {
    switch (command) {
      case 'close':
        mainWindow.destroy();
        break;
      case 'maximize':
          if (!mainWindow.isMaximized()) {
             mainWindow.maximize();
         } else {
             mainWindow.unmaximize();
         }
        break;
      case 'minimize':
        mainWindow.minimize();
        break
      default:
        break;
    }
  })

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const sqlite = sqlite3.verbose();
const dbPath = path.join(app.getPath("documents"), 'voc.db');
const database = new sqlite.Database(dbPath, (err) => {
  if (err) console.error('Database opening error: ', err);
});

const DBService = new Service(dbPath);

const PAGE_SIZE = 10;

const getData = async (page: number) => {
  return new Promise((resolve, reject) => {
    database.all(`
      select * from vocabulary join vocabulary_info as info
      on info.vocabulary_id = vocabulary.id order by page LIMIT ${PAGE_SIZE} offset ${PAGE_SIZE * page}
    `, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

ipcMain.on('getData', async (event, arg) => {
  const page = arg?.page ?? 0;
  const data = await getData(page);
  event.reply('getData', data);
});

ipcMain.on('search', async (event, arg) => {
  const keyword = arg?.keyword ?? '';
  const id = arg?.id;
  const data = (id ? await DBService.getVocabById(id) : await DBService.search(keyword)) as DataType[];
  const results = [...data];
  await Promise.all(data.map(async (x) => {
    if (x.past) results.push({ ...(await DBService.getDataById(x.past)), hidden: true });
    if (x.future) results.push({ ...(await DBService.getDataById(x.future)), hidden: true });
    if (x.imperative) results.push({ ...(await DBService.getDataById(x.imperative)), hidden: true });
    if (x.link) results.push({ ...(await DBService.getDataById(x.link)), hidden: true });
  }));
  event.reply('searchResult', results);
});

ipcMain.on('create', async (event, arg) => {
  const { tibetan, past, future, imperative, page, ...rest } = (arg.data as CreateVocabDto);
  try {
    const vocabId = await DBService.InsertIntoVocabulary(tibetan, page);
    const parseKeys = ['past', 'future', 'imperative'];
    const postfix = ['(過去)', '(未來)', '(命令)'];
    const { translation } = rest;
    const temp = await (
      [past, future, imperative]
      .reduce(async (p, item, i) => p.then((prev) => new Promise(async (resolve) => {
        if (item?.vocabulary) {
          const id = await DBService.InsertIntoVocabulary(item.vocabulary, item.page);
          const data = {
            link: vocabId,
            translation: translation + ` ${postfix[i]} `,
            part_of_speech_id: 1,
          };
          await DBService.InsertIntoInfo(id, data);
          resolve([...prev, id]);
        }
        return resolve([...prev, null]);
    })), Promise.resolve<number[]>([])));

    const indices = temp.reduce((acc, curr, i) => ({
        ...acc,
        [parseKeys[i]]: curr ?? null,
    }), {});

    await DBService.InsertIntoInfo(vocabId, {
      ...rest,
      ...indices,
    });

    const data = await DBService.getDataById(vocabId);
    const result = [data];
    if (data.past) result.push({ ...(await DBService.getDataById(data.past)), hidden: true });
    if (data.future) result.push({ ...(await DBService.getDataById(data.future)), hidden: true });
    if (data.imperative) result.push({ ...(await DBService.getDataById(data.imperative)), hidden: true });
    if (data.link) result.push({ ...(await DBService.getDataById(data.link)), hidden: true });

    event.reply('insertResult', result);
  } catch(err) {
    console.log(err);
  }
});

ipcMain.on('edit', async (event, arg: { data: EditVocabDto; }) => {
  const { page, vocabulary_id, id, ...rest } = arg.data;
  await DBService.updateVocab(vocabulary_id, page);
  await DBService.updateVocabInfo(id, rest);
  const data = await DBService.getDataById(vocabulary_id);

  const result = [data];
  if (data.past) result.push({ ...(await DBService.getDataById(data.past)), hidden: true });
  if (data.future) result.push({ ...(await DBService.getDataById(data.future)), hidden: true });
  if (data.imperative) result.push({ ...(await DBService.getDataById(data.imperative)), hidden: true });
  if (data.link) result.push({ ...(await DBService.getDataById(data.link)), hidden: true });

  event.reply('insertResult', result);
});

ipcMain.on('delete', async (event, vocabInfoId: number) => {
  const result = await DBService.DeleteVocab(vocabInfoId);
  event.reply('deleteResult', result);
});
