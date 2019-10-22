import {
  SpinalContextApp
} from "spinal-env-viewer-context-menu-service";
import ContextGeographicService from "spinal-env-viewer-context-geographic-service";

const constants = ContextGeographicService.constants;


class AddBimObjects extends SpinalContextApp {
  constructor() {
    super(
      "add BimObject",
      "This button adds all elements selected", {
        icon: "post_add",
        icon_type: "in",
        backgroundColor: "#FF0000",
        fontColor: "#FFFFFF"
      }
    );
  }

  isShown(option) {
    let contextType = option.context.type.get();
    let typeSelected = option.selectedNode.type.get();

    if (contextType === constants.CONTEXT_TYPE && typeSelected !== constants
      .EQUIPMENT_TYPE) {
      return Promise.resolve(true)
    }

    // let index = constants.GEOGRAPHIC_TYPES_ORDER.indexOf(typeSelected);

    return Promise.resolve(-1);

  }

  action(option) {
    const viewer = window.spinal.ForgeViewer.viewer;
    var bimSelected = viewer.getAggregateSelection();

    if (bimSelected.length === 0) {
      alert("select an object");
      return;
    }


    for (let idx = 0; idx < bimSelected.length; idx++) {
      const {
        model,
        selection
      } = bimSelected[idx];


      model.getBulkProperties(selection, {
        propFilter: ['name']
      }, (el) => {

        el.forEach(element => {
          ContextGeographicService.addBimElement(
            option.context,
            option.selectedNode,
            element,
            model
          );
        });
      });
    }

  }

}


export default AddBimObjects;