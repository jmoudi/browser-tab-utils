
export enum TabEvents {
    duplicateTab = 'duplicateTab',
    openTab = 'openTab',
    closeTab = 'closeTab'
}

export type DuplicateTab = {
    type: "duplicateTab"
}

export type OpenTab = {
    type: "openTab"
}

export type CloseTab = {
    type: "closeTab"
}