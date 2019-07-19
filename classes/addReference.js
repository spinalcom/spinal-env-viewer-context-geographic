import ContextGeographicService from "spinal-env-viewer-context-geographic-service";
// import {
//   SpinalGraphService
// } from "spinal-env-viewer-graph-service";

// import bimobjService from 'spinal-env-viewer-plugin-bimobjectservice';
const bimobjService = window.spinal.BimObjectService;

const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");

// import {
//   toasted
// } from "../toats";

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
      return Promise.resolve(true);
    }

    return Promise.resolve(-1);


  }

  action(option) {
    let elementSelected = window.spinal.ForgeViewer.viewer
      .getAggregateSelection();

    if (elementSelected.length == 0) {
      // toasted.error("no item selected");
      return;
    }

    for (let idx = 0; idx < elementSelected.length; idx++) {
      const {
        model,
        selection
      } = elementSelected[idx];

      model.getBulkProperties(
        selection, {
          propFilter: ["name"]
        },
        el => {
          el.forEach(element => {
            window.spinal.BimObjectService.addReferenceObject(option
              .selectedNode.id
              .get(), element.dbId, element.name, model);
          });
        }
      );
    }

    // elementSelected.forEach(element => {

    // let node = SpinalGraphService.getRealNode(option.selectedNode.id
    //   .get());

    // bimobjService.addReferenceObject(node, element, "bimObject_" +
    //   element).then(el => {
    //   if (el) {
    //     // toasted.success("Reference added with success !");
    //     return;
    //   }
    //   // toasted.error("Reference is not added !");
    // })




    // });



  }

}

module.exports = AddReferenceBtn;