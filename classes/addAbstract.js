const { SpinalContextApp } = require("spinal-env-viewer-context-menu-service");
const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

import bimobjService from "spinal-env-viewer-plugin-bimobjectservice";

const CONTEXT_TYPE = "geographic";
const BUILDING_TYPE = "geographicBuilding";
const FLOOR_TYPE = "geographicFloor";
const ZONE_TYPE = "geographicZone";
const ROOM_TYPE = "geographicRoom";
const EQUIPMENT_TYPE = "geographicEquipment";


class AddAbstactElement extends SpinalContextApp {
  constructor() {
    super(
      "add Child",
      "This button add an abstract element (building, zone, floor or room)",
      {
        icon: "add",
        icon_type: "in",
        backgroundColor: "#FF0000",
        fontColor: "#00FFFFFF"
      }
    );
  }

  getSelectedType(option) {
    if (option && option.selectedNode) {
      switch (parentType) {
        case CONTEXT_TYPE:
          return BUILDING_TYPE;
        case BUILDING_TYPE:
          return FLOOR_TYPE
        case FLOOR_TYPE:
          return ZONE_TYPE
        case ZONE_TYPE:
          return ROOM_TYPE
        case ROOM_TYPE:
          return EQUIPMENT_TYPE
        default:
          return undefined;
      }
    }
  }

  isShown(option) {
    var type = this.getSelectedType(option);
    this.label = "add " + type;
    option["type"] = type;

    if (type) {
      return Promise.resolve(true);
    }

    return Promise.resolve(-1);
  }

  action(option) {
    var type = option.type;

    if (type !== "equipment") {
      var dialogParams = {
        inputValue: "",
        title: `Add ${type}`,
        label: `Tape ${type} name`,
        type: type,
        selectedNode: option.selectedNode,
        context: option.context
      };
      spinalPanelManagerService.openPanel("createContextDialog", dialogParams);
    } else {
      var bimSelected = window.v.getSelection();

      bimSelected.forEach(element => {
        bimobjService.addBIMObject(
          option.context,
          option.selectedNode,
          element,
          "bimObject_" + element
        );
      });
    }
  }
}

module.exports = AddAbstactElement;
