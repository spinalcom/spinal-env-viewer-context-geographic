import ContextGeographicService from "spinal-env-viewer-context-geographic-service";
import {
  SPINAL_RELATION_TYPE,
  SpinalGraphService
} from "spinal-env-viewer-graph-service";

import bimobjService from 'spinal-env-viewer-plugin-bimobjectservice';

const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");


const constants = ContextGeographicService.constants;


class AddReferenceBtn extends SpinalContextApp {
  constructor() {
    super("Add reference", "add reference to a geaographic element", {
      icon: "add_circle_outline",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {

    if (option.context.type.get() === constants.CONTEXT_TYPE && option.context
      .id.get() !== option.selectedNode.id.get()) {
      console.log("visible");
      return Promise.resolve(true);
    }
    console.log("not visible");

    return Promise.resolve(-1);


  }

  action(option) {
    let elementSelected = window.v.getSelection();

    if (elementSelected.length == 0) {
      alert("no item selected");
    }

    elementSelected.forEach(async element => {
      let node = await bimobjService.createBIMObject(element,
        "bimObject_" +
        element);

      console.log("node", node);

      SpinalGraphService.addChildAndCreateNode(option.selectedNode.id.get(),
        node,
        constants.REFERENCE_RELATION,
        SPINAL_RELATION_TYPE).then(el => {
        if (el) console.log("yes");
        else console.log("no");

      })




    });



  }

}

module.exports = AddReferenceBtn;