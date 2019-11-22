


declare const global: Global;

export const initializeOptions = async () => {
    const defautSettings: Settings = {
        autoCloseTab: true
    }
    global.settings = defautSettings
}

