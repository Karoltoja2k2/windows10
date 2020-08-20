import Tool from "./models/Tool";

function COLORS(): string[] {
    return [
        "#000000",
        "#7f7f7f",
        "#880015",
        "#ed1c24",
        "#ff7f27",
        "#fff200",
        "#22b14c",
        "#00a2e8",
        "#3f48cc",
        "#a349a4",
        "#ffffff",
        "#c3c3c3",
        "#b97a57",
        "#ffaec9",
        "#ffc90e",
        "#efe4b0",
        "#b5e61d",
        "#99d9ea",
        "#7092be",
        "#c8bfe7",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ];
}

function TOOLS(): Tool[] {
    return [
        {
            name: "RUBBER",
            strokeStyle: "#ffffff",
            lineWidth: 2,
            lineStyle: "round",
        },
        {
            name: "PENCIL",
            strokeStyle: "#000000",
            lineWidth: 2,
            lineStyle: "round",
        },
    ];
}

export { COLORS, TOOLS };
