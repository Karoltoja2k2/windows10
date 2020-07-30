import MouseState from "../models/MouseState";

let mouseState = {
    lmbDown: false,
    rmbDown: false,
    position: {
        top: 0,
        left: 0,
    },
};

const mouseReducer = (state: MouseState = mouseState, action: any) => {
    switch (action.type) {
        case "LMB_DOWN": {
            return {
                ...state,
                lmbDown: true,
            };
        }
        case "LMB_UP": {
            return {
                ...state,
                lmbDown: false,
            };
        }
        case "RMB_DOWN": {
            return {
                ...state,
                rmbDown: true,
            };
        }
        case "RMB_UP": {
            return {
                ...state,
                rmbDown: false,
            };
        }
        case "SET_POSITION": {
            return {
                ...state,
                position: {
                    top: action.payload.top,
                    left: action.payload.left,
                },
            };
        }
        default: {
            return state;
        }
    }
};

export default mouseReducer;
