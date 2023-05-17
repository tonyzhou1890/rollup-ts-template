/**
 * example function: add
 */
/**
 * add numbers
 * @param rest
 */
function add(...rest) {
    let res = 0;
    for (let i = 0, len = rest.length; i < len; i++) {
        res += rest[i];
    }
    return res;
}

/**
 * example function: sub
 */
/**
 * sub numbers
 * @param rest
 */
function sub(...rest) {
    let res = rest[0];
    for (let i = 1, len = rest.length; i < len; i++) {
        res -= rest[i];
    }
    return res;
}

var WorkerClass = null;

try {
    var WorkerThreads =
        typeof module !== 'undefined' && typeof module.require === 'function' && module.require('worker_threads') ||
        typeof __non_webpack_require__ === 'function' && __non_webpack_require__('worker_threads') ||
        typeof require === 'function' && require('worker_threads');
    WorkerClass = WorkerThreads.Worker;
} catch(e) {} // eslint-disable-line

function decodeBase64$1(base64, enableUnicode) {
    return Buffer.from(base64, 'base64').toString(enableUnicode ? 'utf16' : 'utf8');
}

function createBase64WorkerFactory$2(base64, sourcemapArg, enableUnicodeArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
    var source = decodeBase64$1(base64, enableUnicode);
    var start = source.indexOf('\n', 10) + 1;
    var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
    return function WorkerFactory(options) {
        return new WorkerClass(body, Object.assign({}, options, { eval: true }));
    };
}

function decodeBase64(base64, enableUnicode) {
    var binaryString = atob(base64);
    if (enableUnicode) {
        var binaryView = new Uint8Array(binaryString.length);
        for (var i = 0, n = binaryString.length; i < n; ++i) {
            binaryView[i] = binaryString.charCodeAt(i);
        }
        return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
    }
    return binaryString;
}

function createURL(base64, sourcemapArg, enableUnicodeArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
    var source = decodeBase64(base64, enableUnicode);
    var start = source.indexOf('\n', 10) + 1;
    var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
    var blob = new Blob([body], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
}

function createBase64WorkerFactory$1(base64, sourcemapArg, enableUnicodeArg) {
    var url;
    return function WorkerFactory(options) {
        url = url || createURL(base64, sourcemapArg, enableUnicodeArg);
        return new Worker(url, options);
    };
}

var kIsNodeJS = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

function isNodeJS() {
    return kIsNodeJS;
}

function createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg) {
    if (isNodeJS()) {
        return createBase64WorkerFactory$2(base64, sourcemapArg, enableUnicodeArg);
    }
    return createBase64WorkerFactory$1(base64, sourcemapArg, enableUnicodeArg);
}

var WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICAgJ3VzZSBzdHJpY3QnOwoKICAgIC8qKgogICAgICogZXhhbXBsZSBmdW5jdGlvbjogYWRkCiAgICAgKi8KICAgIC8qKgogICAgICogYWRkIG51bWJlcnMKICAgICAqIEBwYXJhbSByZXN0CiAgICAgKi8KICAgIGZ1bmN0aW9uIGFkZCguLi5yZXN0KSB7CiAgICAgICAgbGV0IHJlcyA9IDA7CiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHJlc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHsKICAgICAgICAgICAgcmVzICs9IHJlc3RbaV07CiAgICAgICAgfQogICAgICAgIHJldHVybiByZXM7CiAgICB9CgogICAgLyoqCiAgICAgKiBleGFtcGxlIGZ1bmN0aW9uOiBzdWIKICAgICAqLwogICAgLyoqCiAgICAgKiBzdWIgbnVtYmVycwogICAgICogQHBhcmFtIHJlc3QKICAgICAqLwogICAgZnVuY3Rpb24gc3ViKC4uLnJlc3QpIHsKICAgICAgICBsZXQgcmVzID0gcmVzdFswXTsKICAgICAgICBmb3IgKGxldCBpID0gMSwgbGVuID0gcmVzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykgewogICAgICAgICAgICByZXMgLT0gcmVzdFtpXTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHJlczsKICAgIH0KCiAgICBjb25zdCB1dGlscyA9IHsKICAgICAgICBhZGQsCiAgICAgICAgc3ViLAogICAgfTsKICAgIG9ubWVzc2FnZSA9IGUgPT4gewogICAgICAgIGNvbnN0IHsgYWN0aW9uLCBwYXJhbSwgX3NpZ24gfSA9IGUuZGF0YTsKICAgICAgICBpZiAodHlwZW9mIHV0aWxzW2FjdGlvbl0gPT09ICdmdW5jdGlvbicpIHsKICAgICAgICAgICAgY29uc3QgcmVzID0gewogICAgICAgICAgICAgICAgYWN0aW9uLAogICAgICAgICAgICAgICAgcmVzdWx0OiB1dGlsc1thY3Rpb25dKC4uLihwYXJhbSAhPT0gbnVsbCAmJiBwYXJhbSAhPT0gdm9pZCAwID8gcGFyYW0gOiBbXSkpLAogICAgICAgICAgICAgICAgX3NpZ24sCiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHBvc3RNZXNzYWdlKHJlcyk7CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICBjb25zb2xlLmxvZyhgYWN0aW9uICR7YWN0aW9ufSBub3QgZm91bmRgKTsKICAgICAgICB9CiAgICB9OwoKfSkoKTsKLy8jIHNvdXJjZU1hcHBpbmdVUkw9d29ya2VyVXRpbHMuanMubWFwCgo=', null, false);
/* eslint-enable */

const workerNum = Math.max(window.navigator.hardwareConcurrency - 1, 1); // 线程数量
const quene = new Map();
const waiting = [];
const workers = new Array(workerNum).fill(null).map((_, index) => {
    return {
        index,
        worker: new WorkerFactory(),
        idle: true, // 是否空闲
    };
});
workers.map(item => {
    item.worker.addEventListener('message', e => {
        if (!e.data || !e.data._sign) {
            console.error('worker 返回数据错误');
            quene.get(e.data._sign).reject('worker 返回数据错误');
        }
        else {
            quene.get(e.data._sign).resolve(e.data.result);
            quene.delete(e.data._sign);
            item.idle = true;
            // 尝试接受新任务
            assignJob();
        }
    });
});
/**
 * 将等待队列中的任务加入空闲线程
 */
function assignJob() {
    let idleWorker = null;
    let waitingJob = null;
    if (waiting.length) {
        idleWorker = workers.find(item => item.idle);
        if (idleWorker) {
            idleWorker.idle = false;
            waitingJob = waiting.shift();
            quene.set(waitingJob._sign, waitingJob.p);
            idleWorker.worker.postMessage(Object.assign(Object.assign({}, waitingJob.job), { _sign: waitingJob._sign }));
        }
    }
}
const run = new Proxy({}, {
    get(target, prop) {
        return function (...rest) {
            return new Promise((resolve, reject) => {
                const _sign = Date.now() * Math.random();
                waiting.push({
                    _sign,
                    job: {
                        action: prop,
                        param: rest,
                    },
                    p: { resolve, reject },
                });
                // 分配线程
                assignJob();
            });
        };
    },
});

const utils = {
    add,
    sub,
    worker: run,
};

export { utils as default };
