import {
    contextBridge,
    ipcRenderer,
} from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
      send: (channel: string, data: any) => {
        ipcRenderer.send(channel, data);
      },
      on: (channel: string) => new Promise((resolve) => {
        ipcRenderer.on(channel, (_event, args) => resolve(args));
      }),
    }
);
