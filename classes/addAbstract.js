import {
  SpinalContextApp
} from "spinal-env-viewer-context-menu-service";
import {
  spinalPanelManagerService
} from "spinal-env-viewer-panel-manager-service";

import ContextGeographicService from "spinal-env-viewer-context-geographic-service";

const constants = ContextGeographicService.constants;



class AddAbstactElement extends SpinalContextApp {
  constructor() {
    super(
      "add Child",
      "This button adds an abstract element (building, zone, floor or room)", {
        icon: "add_location",
        icon_type: "in",
        backgroundColor: "#FF0000",
        fontColor: "#FFFFFF"
      }
    );
  }

  isShown(option) {

    let typeSelected = option.selectedNode.type.get();

    if (constants.GEOGRAPHIC_TYPES_ORDER.indexOf(typeSelected) !== -1) {
      return Promise.resolve(true);
    }

    return Promise.resolve(-1);
  }

  action(option) {
    spinalPanelManagerService.openPanel("addChildDialog", option);
  }

}

export default AddAbstactElement;