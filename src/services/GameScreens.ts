export const gameScreen = {
    addElement(element: string) {
        document.querySelector('#game-screen')!.innerHTML += element;
    }
}

export const gameInventory = {
    addElement(element: string) {
        document.querySelector('#game-inventory')!.innerHTML += element;
    }
}

export const gameInformation = {
    addElement(element: string) {
        document.querySelector('#game-information')!.innerHTML += element;
    }
}
    