import { gameLocation, gameScreen } from "./GameScreens";

export const ALL_LEVELS = {
  office: "office",
  town: "town",
};

export const levelSystem = {
  level: ALL_LEVELS.office, // TODO Add localStorage system
  changeLevel(level: string) {
    this.level = level;

    gameScreen.cleanGameScreen();
    gameLocation.updateLocationText(level);

    document.dispatchEvent(
      new CustomEvent("levelChanged", {
        detail: level,
      })
    );
  },
};
