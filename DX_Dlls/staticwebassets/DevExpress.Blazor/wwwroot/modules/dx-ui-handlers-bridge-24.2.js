const DxUIHandlersBridgeTagName = "dxbl-ui-handlers-bridge";
class DxUIHandlersBridgeCommandResult {
    constructor(id, result) {
        this.id = id;
        this.result = result;
    }
    processedBy(pendingCommandId) {
        return this.id === pendingCommandId;
    }
}
class DxUIHandlersBridge extends HTMLElement {
    constructor() {
        super();
        this.pendingCommands = new Map();
        this._value = null;
    }
    disposeComponent() {
        this.pendingCommands.clear();
    }
    get value() {
        return this._value;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    send(handlerId, args, completeCallback = null) {
        try {
            const commandId = this.nextCommandId();
            this.pendingCommands.set(commandId, completeCallback);
            this._value = JSON.stringify([commandId.toString(), handlerId, args]);
            this.dispatchEvent(new Event("change", { bubbles: true }));
            return commandId;
        }
        finally {
            this._value = null;
        }
    }
    static get observedAttributes() {
        return ["command-results"];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case "command-results":
                setTimeout(() => this.processCommandResults(newVal), 0);
                break;
        }
    }
    processCommandResults(jsonText) {
        const commandResults = this.parseCommandResults(jsonText);
        for (const commandResult of commandResults) {
            const commandEndCallback = this.pendingCommands.get(commandResult.id);
            this.pendingCommands.delete(commandResult.id);
            if (commandEndCallback)
                commandEndCallback(commandResult);
        }
    }
    parseCommandResults(jsonText) {
        const result = new Array();
        const json = JSON.parse(jsonText);
        for (const jsonItem of json.CommandResults)
            result.push(new DxUIHandlersBridgeCommandResult(parseInt(jsonItem.Id), jsonItem.Result));
        return result.sort((a, b) => a.id === b.id ? 0 : (a.id > b.id ? 1 : -1));
    }
    nextCommandId() {
        if (this.pendingCommands.size === 0)
            return 0;
        let maxCommandId = 0;
        for (const commandId of this.pendingCommands.keys()) {
            if (commandId > maxCommandId)
                maxCommandId = commandId;
        }
        return maxCommandId + 1;
    }
}
customElements.define(DxUIHandlersBridgeTagName, DxUIHandlersBridge);
function loadModule() { }
const dxUiHandlersBridge = { loadModule };

export { DxUIHandlersBridge, DxUIHandlersBridgeCommandResult, DxUIHandlersBridgeTagName, dxUiHandlersBridge as default };
//# sourceMappingURL=dx-ui-handlers-bridge-24.2.js.map
