export const LmbDown = () => {
    console.log('lmb down')
    return {
        type: "LMB_DOWN",
    };
};

export const LmbUp = () => {
    return {
        type: "LMB_UP",
    };
};

export const RmbDown = () => {
    return {
        type: "RMB_DOWN",
    };
};

export const RmbUp = () => {
    return {
        type: "RMB_UP",
    };
};

export const SetPosition = (top: number, left: number) => {
    return {
        type: "SET_POSITION",
        payload: {
            top: top,
            left: left,
        },
    };
};
