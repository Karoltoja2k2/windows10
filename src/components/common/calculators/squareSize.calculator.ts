export default function CalculateSquareSize(
    width: number,
    height: number,
    columns: number,
    rows: number,
    maxWidth: number = 0,
    maxHeight: number = 0
): number {
    if (maxWidth !== 0) {
        width = width - 4 > maxWidth ? maxWidth : width - 4;
    }
    if (maxHeight !== 0) {
        height = height - 32 > maxHeight ? maxHeight : height - 32;
    }

    let squareSize;
    if (columns >= rows) {
        squareSize = width / columns;
        if (squareSize * rows > height) {
            squareSize = height / rows;
        }
    } else {
        squareSize = height / rows;
        if (squareSize * columns > width) {
            squareSize = width / columns;
        }
    }

    return Math.floor(squareSize);
}
