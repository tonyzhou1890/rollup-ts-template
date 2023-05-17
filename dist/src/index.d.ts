import add from './add';
import sub from './sub';
declare const utils: {
    add: typeof add;
    sub: typeof sub;
    worker: import("./promiseWorker").WorkerUtils;
};
export default utils;
