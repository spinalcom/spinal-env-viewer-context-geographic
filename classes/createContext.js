const { SpinalContextApp } = require("spinal-env-viewer-context-menu-service");
const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

class CreateContextBtn extends SpinalContextApp {
  constructor() {
    super("Create Context", "This button create a geographic context", {
      icon: "add",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#00FFFFFF"
    });
  }

  isShown(option) {
    return Promise.resolve(true);
  }

  action(option) {
    
    // option.paramSent = "Create context";

    var dialogParams = {
      inputValue : "", 
      title: "Create context",
      label: "Enter context name"
    }

    spinalPanelManagerService.openPanel('createContextDialog',dialogParams)
  }
}

module.exports = CreateContextBtn;
