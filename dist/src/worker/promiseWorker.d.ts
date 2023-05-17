import type { Add } from '../add';
import type { Sub } from '../sub';
import type { WorkerCallPromisify } from '../types';
/**
 * worker job type
 */
export interface WorkerJobType {
    action: string;
    param?: Array<any>;
}
/**
 * worker job wrap type
 */
export interface WorkerJobWrapType {
    _sign: number;
    job: WorkerJobType;
    p: {
        resolve: (value: unknown) => void;
        reject: (value: unknown) => void;
    };
}
export interface WorkerUtils {
    add: WorkerCallPromisify<Add>;
    sub: WorkerCallPromisify<Sub>;
}
declare const run: WorkerUtils;
export default run;
