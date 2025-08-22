import { formatASCII } from "./ASCIIFormatter";
import { gameInventory } from "./GameScreens";

interface InventoryItem {
  id: string;
  ascii: string;
  label: string;
}

export const inventoryManager = {
  inventory: [] as InventoryItem[],
  addItem(item: InventoryItem) {
    this.inventory.push(item);

    gameInventory.addElement(`
      <div class="ascii interact" id="${item.id}" title="${item.label}">${formatASCII(item.ascii)}</div>
    `);
  },
};
