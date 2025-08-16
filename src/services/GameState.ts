export const ALL_LEVELS = {
    office: 'office',
    town: 'town'
}

export const currentLevel = {
    level: ALL_LEVELS.office, // TODO Add localStorage system
    changeLevel(level: string) {
        this.level = level;

        this.cleanScreen();

        document.dispatchEvent(new CustomEvent("levelChanged", {
            detail: level
        }));
        // TODO Implement
    },
    cleanScreen() {
        document.querySelector('#game-screen')!.innerHTML = '';
    }
}