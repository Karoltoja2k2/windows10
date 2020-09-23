import IPoint from "../Point";

export default function MapPositionsForElements<T>(
    array: T[],
    boundryFrom: IPoint,
    boundryTo: IPoint,
    elemWidth: number,
    elemHeight: number,
    originOffset: IPoint,
    gap: IPoint
): { id: number, elem: T; top: number; left: number }[] {
    let row = 0;
    let col = 0;
    return array.map((elem: T, index: number) => {
        let result = {
            id: index,
            elem: elem,
            top: boundryFrom.Y + (row * elemHeight) + originOffset.Y + row * gap.Y,
            left: boundryFrom.X + (col * elemWidth) + originOffset.X + col * gap.X
        };

        col++;
        if (col * elemWidth > boundryTo.X){
            col = 0;
            row++;
        }
        
        return result;
    });
}
