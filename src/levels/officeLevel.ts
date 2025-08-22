import { BOOKS_ASCII } from "../ascii/books";
import { TABLES_ASCII } from "../ascii/tables";
import { formatASCII } from "../services/ASCIIFormatter";
import { gameInformation, gameScreen } from "../services/GameScreens";
import { ALL_LEVELS, levelSystem } from "../services/GameState";

export const envelope = {
  isOpened: false,
  element: `<div class="ascii interact" id="envelope" style="position: absolute; top: 95px;" title="Envelope">
  ${formatASCII(BOOKS_ASCII.envelope)}
  </div>`,
  openEnvelope: () => {
    document.getElementById("envelope")!.addEventListener("click", () => {
      if (envelope.isOpened) {
        return;
      }

      gameScreen.cleanGameScreen();
      gameInformation.cleanInformation();

      gameScreen.addElement(`
        <div style="position: relative;">
          ${formatASCII(BOOKS_ASCII.openedEnvelope)}
          <p style="position: absolute; top: 6px; width: 180px; left: 46px; font-size: 13px;">
            Dear Mrs. Johnson, <br />
            <br />
            I am writing to you because I have a case for you. <br />
            <br />
            Sincerely, <br />
            John Doe
          </p>
        </div>
      `);

      gameInformation.addElement(`
        <button id="close-envelope">Close envelope</button>
        <button id="accept-case">Accept case</button>  
      `);

      envelope.acceptCase();
      envelope.closeEnvelope();
      envelope.isOpened = true;
    });
  },
  acceptCase: () => {
    document.getElementById("accept-case")!.addEventListener("click", () => {
      gameScreen.cleanGameScreen();
      gameInformation.cleanInformation();
      levelSystem.changeLevel(ALL_LEVELS.town);
    });
  },
  closeEnvelope: () => {
    document.getElementById("close-envelope")!.addEventListener("click", () => {
      envelope.isOpened = false;
      gameScreen.cleanGameScreen();
      gameInformation.cleanInformation();
      levelSystem.changeLevel(ALL_LEVELS.office);
    });
  },
  addInstance: () => {
    gameScreen.addElement(`
      <div style="position: relative; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
        ${envelope.element}
        ${formatASCII(TABLES_ASCII.desk)}
      </div>  
    `);
    envelope.openEnvelope();
  },
};
