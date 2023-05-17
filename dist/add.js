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

export { add as default };
