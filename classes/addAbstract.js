const { SpinalContextApp } = require("spinal-env-viewer-context-menu-service");
const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");



import bimobjService from 'spinal-env-viewer-plugin-bimobjectservice';



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
      switch (option.selectedNode.info.type.get()) {
        case "context":
          return "building";
        case "building":
          return "floor";
        case "floor":
          return "zone";
        case "zone":
          return "room";
        case "room":
          return "equipment";
      }
    }
  }

  isShown(option) {
    var type = this.getSelectedType(option);
    this.label = "add " + type;
    option["type"] = type;

    if(type) {
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
        selectedNode: option.selectedNode
      };
      spinalPanelManagerService.openPanel("createContextDialog", dialogParams);
    } else {
      
      var bimSelected = window.v.getSelection();
      bimSelected.forEach(element => {
        console.log(bimobjService.addBIMObject(option.context,option.selectedNode,element,"bimObject_" + element ));
      });
      
    }
  }
}

module.exports = AddAbstactElement;
