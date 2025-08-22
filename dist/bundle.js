"use strict";
(() => {
  // src/ascii/books.ts
  var BOOKS_ASCII = {
    envelope: `
  ____  
()____)
 \\ ~~~\\
  \\____\\
   ()___)`,
    openedEnvelope: `   ______________________________
 / \\                             \\.
|   |                            |.
 \\_ |                            |.
    |                            |.
    |                            |.
    |                            |.
    |                            |.
    |                            |.
    |                            |.
    |                            |.
    |                            |.
    |                            |.
    |                            |.
    |                            |.
    |   _________________________|___
    |  /                            /.
    \\_/dc__________________________/.`,
    bookshelf: {
      normal: `       .--.                   .---.
   .---|__|           .-.     |~~~|
.--|===|--|_          |_|     |~~~|--.
|  |===|  |'\\     .---!~|  .--|   |--|
|%%|   |  |.'\\    |===| |--|%%|   |  |
|%%|   |  |\\.'\\   |   | |__|  |   |  |
|  |   |  | \\  \\  |===| |==|  |   |  |
|  |   |__|  \\.'\\ |   |_|__|  |~~~|__|
|  |===|--|   \\.'\\|===|~|--|%%|~~~|--|
^--^---'--^    \`-'\`---^-^--^--^---'--' hjw`,
      inventory: `  ,  ,
 ////|
|~~| |
|  | |
|==|/ 
'--'  `
    }
  };

  // src/ascii/tables.ts
  var TABLES_ASCII = {
    desk: `     ------------------    
    \u2502                  \u2502   
   \u2502                    \u2502   
  \u2502                      \u2502  
 \u2502                        \u2502 
 -------------------------- 
 |    \u2502 o \u2502       \u2502 o \u2502   | 
 -------------------------- 
 ||  ||              ||  || 
 ||  ||              ||  || 
 ||  ||              ||  || 
 || (__)            (__) || 
 ||                      || 
(__)                    (__)`
  };

  // src/services/ASCIIFormatter.ts
  var formatASCII = (ascii) => {
    return `<pre>${ascii}</pre>`;
  };

  // src/ascii/signs.ts
  var SIGNS_ASCII = {
    sign(text) {
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
    }
  };

  // src/services/GameScreens.ts
  var gameScreen = {
    addElement(element) {
      document.querySelector("#game-screen").innerHTML += element;
    },
    cleanGameScreen() {
      document.querySelector("#game-screen").innerHTML = "";
    }
  };
  var gameInformation = {
    addElement(element) {
      document.querySelector("#game-information").innerHTML += element;
    },
    cleanInformation() {
      document.querySelector("#game-information").innerHTML = "";
    }
  };
  var gameLocation = {
    updateLocationText(text) {
      this.cleanLocation();
      document.querySelector("#game-location").innerHTML += SIGNS_ASCII.sign(text);
    },
    cleanLocation() {
      document.querySelector("#game-location").innerHTML = "";
    }
  };

  // src/services/GameState.ts
  var ALL_LEVELS = {
    office: "office",
    town: "town",
    smithHouse: "smith-house"
  };
  var levelSystem = {
    level: ALL_LEVELS.office,
    // TODO Add localStorage system
    changeLevel(level) {
      this.level = level;
      gameScreen.cleanGameScreen();
      gameLocation.updateLocationText(level);
      document.dispatchEvent(
        new CustomEvent("levelChanged", {
          detail: level
        })
      );
    }
  };

  // src/levels/officeLevel.ts
  var envelope = {
    isOpened: false,
    element: `<div class="ascii interact" id="envelope" style="position: absolute; top: 95px;" title="Envelope">
  ${formatASCII(BOOKS_ASCII.envelope)}
  </div>`,
    openEnvelope: () => {
      document.getElementById("envelope").addEventListener("click", () => {
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
      document.getElementById("accept-case").addEventListener("click", () => {
        gameScreen.cleanGameScreen();
        gameInformation.cleanInformation();
        levelSystem.changeLevel(ALL_LEVELS.town);
      });
    },
    closeEnvelope: () => {
      document.getElementById("close-envelope").addEventListener("click", () => {
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
    }
  };

  // src/levels/smithHouseLevel.ts
  var smithHouse = {
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
      gameScreen.addElement(`Smith's house`);
    }
  };

  // src/ascii/houses.ts
  var HOUSES_ASCII = {
    smithHouse: {
      normal: `       _
     _|=|__________
    /              \\
   /                \\
  /__________________\\
   ||  || /--\\ ||  ||
   ||[]|| | .| ||[]||
 ()||__||_|__|_||__||()
( )|-|-|-|====|-|-|-|( ) 
^^^^^^^^^^====^^^^^^^^^^^`
    }
  };

  // src/levels/townLevel.ts
  var town = {
    element: formatASCII(`
    <div id="smith-house" class="ascii interact" title="Smith's house">
      ${formatASCII(HOUSES_ASCII.smithHouse.normal)}
    </div>  
  `),
    goToSmithHouse: () => {
      document.getElementById("smith-house").addEventListener("click", () => {
        gameScreen.cleanGameScreen();
        gameInformation.cleanInformation();
        levelSystem.changeLevel(ALL_LEVELS.smithHouse);
      });
    },
    addInstance: () => {
      gameScreen.addElement(town.element);
      town.goToSmithHouse();
    }
  };

  // src/main.ts
  document.addEventListener("DOMContentLoaded", () => {
    levelSystem.changeLevel(ALL_LEVELS.office);
  });
  document.addEventListener(
    "levelChanged",
    (newLevel) => {
      switch (newLevel.detail) {
        case ALL_LEVELS.office:
          envelope.addInstance();
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
})();
//# sourceMappingURL=bundle.js.map
