function getReference(reference) {
    if (!reference)
        throw new Error("failed");
    return reference;
}

function waitForCondition(condition, interval = 100, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const checkCondition = () => {
            const result = condition();
            if (result) {
                resolve(result);
                clearInterval(intervalId);
            }
            else if (Date.now() - startTime > timeout) {
                reject(new Error("Timeout waiting for condition"));
                clearInterval(intervalId);
            }
        };
        const intervalId = setInterval(checkCondition, interval);
    });
}
const utils = {
    getReference
};

export { utils as default, waitForCondition };
//# sourceMappingURL=utils-24.2.js.map
