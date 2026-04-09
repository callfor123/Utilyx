// Custom FFmpeg worker - loads core via importScripts, handles all commands
let ffmpeg = null;

self.onmessage = async ({ data: { id, type, data } }) => {
  try {
    switch (type) {
      case 'LOAD': {
        const { coreURL, wasmURL } = data;
        self.postMessage({ type: 'LOG', data: { message: 'Loading FFmpeg core...' } });
        
        // Load the core script into worker global scope
        importScripts(coreURL);
        
        if (typeof createFFmpegCore !== 'function') {
          throw new Error('createFFmpegCore not found after importScripts');
        }
        
        self.postMessage({ type: 'LOG', data: { message: 'Initializing WASM...' } });
        
        // Use Emscripten's locateFile to resolve .wasm path correctly
        ffmpeg = await createFFmpegCore({
          locateFile: (path) => {
            if (path.endsWith('.wasm')) return wasmURL || '/ffmpeg/ffmpeg-core.wasm';
            return '/ffmpeg/' + path;
          }
        });
        
        ffmpeg.setLogger((msg) => self.postMessage({ type: 'LOG', data: msg }));
        ffmpeg.setProgress((p) => self.postMessage({ type: 'PROGRESS', data: p }));
        self.postMessage({ type: 'LOG', data: { message: 'FFmpeg ready!' } });
        self.postMessage({ id, type: 'LOAD', data: true });
        break;
      }
      case 'EXEC': {
        if (!ffmpeg) throw new Error('FFmpeg not loaded');
        const { args, timeout = -1 } = data;
        ffmpeg.setTimeout(timeout);
        ffmpeg.exec(...args);
        const ret = ffmpeg.ret;
        ffmpeg.reset();
        self.postMessage({ id, type: 'EXEC', data: ret });
        break;
      }
      case 'WRITE_FILE': {
        if (!ffmpeg) throw new Error('FFmpeg not loaded');
        const { path, fileData } = data;
        ffmpeg.FS.writeFile(path, fileData);
        self.postMessage({ id, type: 'WRITE_FILE', data: true });
        break;
      }
      case 'READ_FILE': {
        if (!ffmpeg) throw new Error('FFmpeg not loaded');
        const { path } = data;
        const result = ffmpeg.FS.readFile(path, { encoding: 'binary' });
        self.postMessage({ id, type: 'READ_FILE', data: result }, [result.buffer]);
        break;
      }
      case 'DELETE_FILE': {
        if (!ffmpeg) throw new Error('FFmpeg not loaded');
        ffmpeg.FS.unlink(data.path);
        self.postMessage({ id, type: 'DELETE_FILE', data: true });
        break;
      }
      default:
        throw new Error('Unknown message type: ' + type);
    }
  } catch (err) {
    self.postMessage({ id, type: 'ERROR', data: err.toString() });
  }
};
