import {
  SpinalContextApp
} from "spinal-env-viewer-context-menu-service";
import {
  spinalPanelManagerService
} from "spinal-env-viewer-panel-manager-service";

import ContextGeographicService from "spinal-env-viewer-context-geographic-service";
import {
  toasted
} from "../toats";

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

  getSelectedType(option) {
    if (!option || !option.selectedNode) {
      return undefined;
    }
    const type = option.selectedNode.type.get();
    const typeIndex = constants.GEOGRAPHIC_TYPES_ORDER.indexOf(type);

    return constants.GEOGRAPHIC_TYPES_ORDER[typeIndex + 1];
  }

  isShown(option) {
    var type = this.getSelectedType(option);
    this.label = "add " + type;
    option["type"] = type;

    if (option.context.type.get() == constants.CONTEXT_TYPE && type) {
      return Promise.resolve(true);
    }

    return Promise.resolve(-1);
  }

  action(option) {
    console.log("option", option);

    var type = option.type;
    if (type !== constants.EQUIPMENT_TYPE) {
      var dialogParams = {
        inputValue: "",
        title: `Add ${type}`,
        label: `Enter ${type} name`,
        type: type,
        selectedNode: option.selectedNode,
        context: option.context
      };
      spinalPanelManagerService.openPanel("createContextDialog", dialogParams);
    } else {
      var bimSelected = window.v.getSelection();

      if (bimSelected.length === 0) {
        toasted.error("no element has been selected, please select one ");
        return;
      }

      bimSelected.forEach(element => {
        ContextGeographicService.addBimElement(
          option.context,
          option.selectedNode,
          element
        );
      });

      toasted.success("success");
    }
  }
}

export default AddAbstactElement;