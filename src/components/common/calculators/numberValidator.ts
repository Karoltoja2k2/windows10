export function IsNatural(number: string): boolean {
    var n = parseInt(number, 10);

    return n >= 0 && n.toString() === number;
}
