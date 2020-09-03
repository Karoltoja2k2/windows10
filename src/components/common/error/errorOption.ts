export interface ErrorOption {
    action: any;
    text: string;
}

export default function NewErrorOption(action: any, text: string): ErrorOption {
    return { action, text };
}
