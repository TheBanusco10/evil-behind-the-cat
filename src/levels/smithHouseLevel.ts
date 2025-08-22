import { formatASCII } from "../services/ASCIIFormatter";
import { gameInformation, gameScreen } from "../services/GameScreens";
import { ALL_LEVELS, levelSystem } from "../services/GameState";
import { HOUSES_ASCII } from "../ascii/houses";

export const smithHouse = {
  element: formatASCII(`~         ~~          __
       _T      .,,.    ~--~ ^^
 ^^   // \                    ~
      ][O]    ^^      ,-~ ~
   /''-I_I         _II____
__/_  /   \ ______/ ''   /'\_,__
  | II--'''' \,--:--..,_/,.-{ },
; '/__\,.--';|   |[] .-.| O{ _ }
:' |  | []  -|   ''--:.;[,.'\,/
'  |[]|,.--'' '',   ''-,.    |
  ..    ..-''    ;       ''. '`),
  
  addInstance: () => {
    gameScreen.addElement(`Smith's house`);
  },
};
