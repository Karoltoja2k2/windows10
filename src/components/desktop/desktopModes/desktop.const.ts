import File from "../../../models/File";
import { Point, Point0 } from "../../common/Point";
import RigidBody from "./models/RigidBody";

export const Dims = {
    boundryFrom: Point0,
    boundryTo: Point(window.innerWidth, window.innerHeight),
    iconWidth: 75,
    iconHeight: 85,
}

export function MapFilesToRbs(files: File[]): RigidBody[] {
    let row = 0;
    let col = 0;
    let gridFrom = Point(50, 100);
    let gridTo = Point(
        window.innerWidth < 700 ? window.innerWidth * 0.8 : 700,
        1000
    );
    let gridGap = 10;

    let rigidBodies: RigidBody[] = files.map(
        (file: File, index: number) => {
            let pos = Point(
                gridFrom.X +
                    col * Dims.iconWidth +
                    Dims.iconWidth / 2 +
                    col * gridGap,
                gridFrom.Y +
                    row * Dims.iconHeight +
                    Dims.iconHeight / 2 +
                    row * gridGap
            );

            let result: RigidBody = {
                id: index,
                file: file,
                pos: pos,
                vel: Point0,
                acc: Point0,
            };

            col++;
            if (col * Dims.iconWidth > gridTo.X) {
                col = 0;
                row++;
            }

            return result;
        }
    );

    return rigidBodies;
}