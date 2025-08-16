import "./assets/app.css";
import * as officeLevel from "./levels/officeLevel";
import { town } from "./levels/townLevel";
import { gameInformation } from "./services/GameScreens";
import { currentLevel, ALL_LEVELS } from "./services/GameState";

const levelChangedEvent = new CustomEvent("levelChanged", {
    detail: ALL_LEVELS.office // TODO Create a function to dynamically create this event with param and then dispatch it
});

document.addEventListener("DOMContentLoaded", () => {
    document.dispatchEvent(levelChangedEvent);
});

document.addEventListener("levelChanged" as any, (newLevel: CustomEvent<any>) => {
    console.log(newLevel.detail);
  switch (newLevel.detail) {
    case ALL_LEVELS.office:
      officeLevel.envelope.addInstance();
      break;
    case ALL_LEVELS.town:
      town.addInstance();
      break;
    default:
      break;
  }
});