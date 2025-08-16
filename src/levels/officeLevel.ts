import { formatASCII } from "../services/ASCIIFormatter";
import { gameInformation, gameScreen } from "../services/GameScreens";
import { ALL_LEVELS, currentLevel } from "../services/GameState";

export const envelope = {
  isOpened: false,
  element: `<button class="ascii interact" id="envelope">
  ${formatASCII(`    _______
    /      /,
   /      //
  /______//
 (______(/
`)}
  </button>`,
  openEnvelope: () => {
    document.getElementById("envelope")!.addEventListener("click", () => {
      if (envelope.isOpened) {
        return;
      }
      gameInformation.addElement(
        "You opened the envelope. <button id='accept-case'>Accept case</button>"
      );

      envelope.acceptCase();
      envelope.isOpened = true;
    });
  },
  acceptCase: () => {
    document.getElementById("accept-case")!.addEventListener("click", () => {
      gameInformation.addElement("You accepted the case.");
      currentLevel.changeLevel(ALL_LEVELS.town);
    });
  },
  addInstance: () => {
    gameScreen.addElement(envelope.element);
    envelope.openEnvelope();
  },
};
