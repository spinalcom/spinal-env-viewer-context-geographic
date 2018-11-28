const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");
const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

const CONTEXT_TYPE = "geographicContext";


class LinkWithDashBoard extends SpinalContextApp {
  constructor() {
    super("Link to a Dashboard", "Link to a Dashboard", {
      icon: "link",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#00FFFFFF"
    });
  }

  isShown(option) {
    if (option.context.info.type.get() === CONTEXT_TYPE && option.selectedNode
      .info
      .type
      .get() !== CONTEXT_TYPE)
      return Promise.resolve(true);
    return Promise.resolve(-1);
  }

  action(option) {
    let dialogParams = {
      context: option.context,
      selectedNode: option.selectedNode
    }
    spinalPanelManagerService.openPanel('linkToDashBoardDialog', dialogParams)
  }
}

module.exports = LinkWithDashBoard;