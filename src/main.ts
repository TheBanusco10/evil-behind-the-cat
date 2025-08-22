import "./assets/app.css";
import * as officeLevel from "./levels/officeLevel";
import { smithHouse } from "./levels/smithHouseLevel";
import { town } from "./levels/townLevel";
import { levelSystem, ALL_LEVELS } from "./services/GameState";

document.addEventListener("DOMContentLoaded", () => {
  levelSystem.changeLevel(ALL_LEVELS.office);
});

document.addEventListener(
  "levelChanged" as any,
  (newLevel: CustomEvent<any>) => {
    switch (newLevel.detail) {
      case ALL_LEVELS.office:
        officeLevel.envelope.addInstance();
        break;
      case ALL_LEVELS.town:
        town.addInstance();
        break;
      case ALL_LEVELS.smithHouse:
        smithHouse.addInstance();
        break;
      default:
        break;
    }
  }
);
