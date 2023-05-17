/**
 * worker job type
 */
export interface WorkerJobType {
    action: string;
    param?: Array<any>;
    transferable?: Transferable[];
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
/**
 * @param job {
 *  action: '',
 *  param: [],
 * }
 */
declare const _default: (job: WorkerJobType) => Promise<unknown>;
export default _default;
