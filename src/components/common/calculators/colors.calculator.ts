export function RGBToHex(rgb: RGB): string {
    return (
        "#" +
        ((1 << 24) + (rgb.R << 16) + (rgb.G << 8) + rgb.B).toString(16).slice(1)
    );
}

export function HexToRGB(hex: string): RGB | null {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
    return result
        ? {
              R: parseInt(result[1], 16),
              G: parseInt(result[2], 16),
              B: parseInt(result[3], 16),
          }
        : null;
}

export function RGBValidator(rgb: RGB) : boolean {
    if (Validate(rgb.R) && Validate(rgb.G) && Validate(rgb.B)){
        if (RGBToHex(rgb) !== null){
            return true;
        }
    }
    return false;
}

function Validate(part: number) : boolean{
    if (part >= 0 && part < 255 ){
        return true;
    } 
    return false;
}

export interface RGB {
    R: number;
    G: number;
    B: number;
}
