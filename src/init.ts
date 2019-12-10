//chrome.runtime.lastError
const connectedSidebars = {}
let firstSidebarInitHandlers = []
let connectPending = []
const Actions = {}


 
export async function initGlobal(name = 'TabUtils'){
  const defaultSettings = {
      showNotification: true,
      autoCloseTab: true,
  }
  const defaultState = {
      initialized: false
  }

  //global.actions = {} //new ActionsRegistry();
  
  window[name] = {
      env: {},
      state: {},
      settings: {},
      extension: {}
  }
  // @ts-ignore
  const global: Global = window[name];
  global.extension = await browser.management.getSelf();
  global.state = defaultState;
  global.settings = defaultSettings;
  global.env = process.env;
  global.debug = false;
  return global;
}
export const initExtension = (name, opts?: Global) => {
  if (typeof window !== 'object'){
      throw new TypeError('Not in browser-like environment.');
  }
  if (!window[name]){
      // @ts-ignore
      window[name] = opts //{...opts};
  } else {
      return window[name]
  }
  return window[name];
};



//TODO: old code

/**
 * Init global message handler
 */
export function initGlobalMessaging() {
  browser.runtime.onMessage.addListener(msg => {
    if (!msg.action || !Actions[msg.action]) return
    if (msg.windowId !== undefined && msg.windowId !== -1) return
    if (msg.instanceType !== undefined && msg.instanceType !== 'bg') return

    // Run action
    if (msg.action && Actions[msg.action]) {
      let result
      if (msg.arg) result = Actions[msg.action](msg.arg)
      else if (msg.args) result = Actions[msg.action](...msg.args)
      else result = Actions[msg.action]()

      if (result instanceof Promise) return result
      else return Promise.resolve(result)
    }
  })
}

const onSidebarMsg = () => {}

export function initSidebar(port: browser.runtime.Port, info?: any){
/*   if (!this.windows[info.windowId]) {
    return
  } */
      connectedSidebars[info.windowId] = port
      port.onMessage.addListener(onSidebarMsg)

      if (firstSidebarInitHandlers) {
        for (let handler of firstSidebarInitHandlers) {
          handler()
        }
        firstSidebarInitHandlers = null
      }

      for (let waiting of connectPending) {
        if (waiting.winId === null) waiting.resolve(true)
        else if (waiting.winId === info.windowId) waiting.resolve(true)
      }
}
/**
 * Handle runtime messages
 */
export function initMessaging() {
  browser.runtime.onConnect.addListener(port => {
    // Setup message handling
    let info = JSON.parse(port.name)

    if (info.instanceType === 'sidebar') {
      initSidebar(port);
    }

    // Handle disconnect
    port.onDisconnect.addListener(port => {
      let info = JSON.parse(port.name)
      let targetPort = connectedSidebars[info.windowId]
      if (info.instanceType === 'sidebar' && targetPort) {
        targetPort.onMessage.removeListener(onSidebarMsg)
        delete connectedSidebars[info.windowId]
      }
    })
  })
}