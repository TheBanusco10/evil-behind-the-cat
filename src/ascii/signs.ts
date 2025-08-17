import { formatASCII } from "../services/ASCIIFormatter";

export const SIGNS_ASCII = {
  sign(text: string) {
    return `
            <div style="position: relative;">
                <p style="position: absolute; top: 5px; left: 50%; transform: translateX(-50%);">${text.toUpperCase()}</p>
                ${formatASCII(`
       __________________
______|                 |_____
\\     |_________________|    /
/_______)             (______\\ 
                `)}
            </div>
        `;
  },
};
