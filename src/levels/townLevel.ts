import { formatASCII } from "../services/ASCIIFormatter";
import { gameInformation, gameScreen } from "../services/GameScreens";
import { ALL_LEVELS, levelSystem } from "../services/GameState";

export const town = {
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
    gameScreen.addElement(town.element);
  },
};
