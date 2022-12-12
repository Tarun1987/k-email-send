export const USE_MOCK_DATA = false;

export const DELAYED = async (data, ms = 500) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, ms);
    });
};
