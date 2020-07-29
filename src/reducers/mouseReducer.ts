interface mouseState {}

let mouseState = {
    lmbDown: false,
    rmbDown: false,
    position: {
        top: 0,
        left: 0,
    },
    movingWinId: 0,
};

const mouseReducer = (state = mouseState, action: any) => {};

export default mouseReducer;
