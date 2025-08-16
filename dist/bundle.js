"use strict";
(() => {
  // src/services/ASCIIFormatter.ts
  var formatASCII = (ascii) => {
    return `<pre>${ascii}</pre>`;
  };

  // src/services/GameScreens.ts
  var gameScreen = {
    addElement(element) {
      document.querySelector("#game-screen").innerHTML += element;
    }
  };
  var gameInformation = {
    addElement(element) {
      document.querySelector("#game-information").innerHTML += element;
    }
  };

  // src/services/GameState.ts
  var ALL_LEVELS = {
    office: "office",
    town: "town"
  };
  var currentLevel = {
    level: ALL_LEVELS.office,
    // TODO Add localStorage system
    changeLevel(level) {
      this.level = level;
      this.cleanScreen();
      document.dispatchEvent(new CustomEvent("levelChanged", {
        detail: level
      }));
    },
    cleanScreen() {
      document.querySelector("#game-screen").innerHTML = "";
    }
  };

  // src/levels/officeLevel.ts
  var envelope = {
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
      document.getElementById("envelope").addEventListener("click", () => {
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
      document.getElementById("accept-case").addEventListener("click", () => {
        gameInformation.addElement("You accepted the case.");
        currentLevel.changeLevel(ALL_LEVELS.town);
      });
    },
    addInstance: () => {
      gameScreen.addElement(envelope.element);
      envelope.openEnvelope();
    }
  };

  // src/levels/townLevel.ts
  var town = {
    element: formatASCII(`~         ~~          __
       _T      .,,.    ~--~ ^^
 ^^   //                     ~
      ][O]    ^^      ,-~ ~
   /''-I_I         _II____
__/_  /    ______/ ''   /'_,__
  | II--'''' ,--:--..,_/,.-{ },
; '/__,.--';|   |[] .-.| O{ _ }
:' |  | []  -|   ''--:.;[,.',/
'  |[]|,.--'' '',   ''-,.    |
  ..    ..-''    ;       ''. '`),
    addInstance: () => {
      gameScreen.addElement(town.element);
    }
  };

  // src/main.ts
  var levelChangedEvent = new CustomEvent("levelChanged", {
    detail: ALL_LEVELS.office
    // TODO Create a function to dynamically create this event with param and then dispatch it
  });
  document.addEventListener("DOMContentLoaded", () => {
    document.dispatchEvent(levelChangedEvent);
  });
  document.addEventListener("levelChanged", (newLevel) => {
    console.log(newLevel.detail);
    switch (newLevel.detail) {
      case ALL_LEVELS.office:
        envelope.addInstance();
        break;
      case ALL_LEVELS.town:
        town.addInstance();
        break;
      default:
        break;
    }
  });
})();
//# sourceMappingURL=bundle.js.map
