import { SIGNS_ASCII } from "../ascii/signs";

export const gameScreen = {
  addElement(element: string) {
    document.querySelector("#game-screen")!.innerHTML += element;
  },
  cleanGameScreen() {
    document.querySelector("#game-screen")!.innerHTML = "";
  },
};

export const gameInventory = {
  addElement(element: string) {
    document.querySelector("#game-inventory")!.innerHTML += element;
  },
};

export const gameInformation = {
  addElement(element: string) {
    document.querySelector("#game-information")!.innerHTML += element;
  },
  cleanInformation() {
    document.querySelector("#game-information")!.innerHTML = "";
  },
};

export const gameLocation = {
  updateLocationText(text: string) {
    this.cleanLocation();

    document.querySelector("#game-location")!.innerHTML += SIGNS_ASCII.sign(text);
  },
  cleanLocation() {
    document.querySelector("#game-location")!.innerHTML = "";
  },
};
