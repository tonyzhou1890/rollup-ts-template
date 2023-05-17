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

export { sub as default };
