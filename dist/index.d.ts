/**
 * example function: add
 */
/**
 * add numbers
 * @param rest
 */
declare function add(...rest: number[]): number;
declare type Add = typeof add;

/**
 * example function: sub
 */
/**
 * sub numbers
 * @param rest
 */
declare function sub(...rest: number[]): number;
declare type Sub = typeof sub;

declare type WorkerCallPromisify<T extends (...args: any) => any> = (...rest: Parameters<T>) => Promise<ReturnType<T>>;

interface WorkerUtils {
    add: WorkerCallPromisify<Add>;
    sub: WorkerCallPromisify<Sub>;
}

declare const utils: {
    add: typeof add;
    sub: typeof sub;
    worker: WorkerUtils;
};

export { utils as default };
