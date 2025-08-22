import { formatASCII } from "../services/ASCIIFormatter";
import { gameInformation, gameScreen } from "../services/GameScreens";
import { ALL_LEVELS, levelSystem } from "../services/GameState";
import { HOUSES_ASCII } from "../ascii/houses";

export const town = {
  element: formatASCII(`
    <div id="smith-house" class="ascii interact" title="Smith's house">
      ${formatASCII(HOUSES_ASCII.smithHouse.normal)}
    </div>  
  `),
  goToSmithHouse: () => {
    document.getElementById("smith-house")!.addEventListener("click", () => {
      gameScreen.cleanGameScreen();
      gameInformation.cleanInformation();
      levelSystem.changeLevel(ALL_LEVELS.smithHouse);
    });
  },

  addInstance: () => {
    gameScreen.addElement(town.element);

    town.goToSmithHouse();
  },
};
