import ContextGeographicService from "spinal-env-viewer-context-geographic-service";
// import {
//   SpinalGraphService
// } from "spinal-env-viewer-graph-service";

// import bimobjService from 'spinal-env-viewer-plugin-bimobjectservice';
// const bimobjService = window.spinal.BimObjectService;

const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");

// import {
//   toasted
// } from "../toats";

const constants = ContextGeographicService.constants;

const geoRelations = [
  constants.SITE_RELATION,
  constants.BUILDING_RELATION,
  constants.ZONE_RELATION,
  constants.FLOOR_RELATION,
  constants.ROOM_RELATION,
  constants.EQUIPMENT_RELATION,
  constants.REFERENCE_RELATION
];

async function updateBimObjectId(context) {
    const mapModelExternId = new Map();
    function getExternalIdMapping(model) {
      if (mapModelExternId.has(model)) return mapModelExternId.get(model);
      const prom = new Promise((resolve) => {
        model.getExternalIdMapping((map) => {
          resolve(map)
        })
      })
      mapModelExternId.set(model, prom)
      return prom;
    }
    const geoRelations = [
      SITE_RELATION,
      BUILDING_RELATION,
      ZONE_RELATION,
      FLOOR_RELATION,
      ROOM_RELATION,
      EQUIPMENT_RELATION,
      REFERENCE_RELATION
    ]
    const bimObjects = await context.find(geoRelations, (node) => {
      return node.info.type.get() === EQUIPMENT_TYPE
    })
    const updated = [];
    for (const bimObj of bimObjects) {
      const bimFileId = bimObj.info.bimFileId.get();
      const model = spinal.BimObjectService.getModelByBimfile(bimFileId);
      const externalIdMapping = await getExternalIdMapping(model);
      const externalId = bimObj.info.externalId.get()
      if (bimObj.info.dbid.get() !== externalIdMapping[externalId]) {
        updated.push(externalIdMapping[externalId])
        bimObj.info.dbid.set(externalIdMapping[externalId])
      }
    }
    console.log("End");
  }
  

class UpdateDbId extends SpinalContextApp {
  constructor() {
    super("Update Ids Model", "update model dbids by the externalID", {
      icon: "update",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {

    if (option.context.type.get() === constants.CONTEXT_TYPE &&
     option.context.id.get() === option.selectedNode.id.get()) {
      return Promise.resolve(true);
    }

    return Promise.resolve(-1);


  }

  action(option) {
    const node = spinal.spinalGraphService.getRealNode(option.selectedNode.id.get())
    return updateBimObjectId(node)
    // let elementSelected = window.spinal.ForgeViewer.viewer
    //   .getAggregateSelection();

    // if (elementSelected.length == 0) {
    //   // toasted.error("no item selected");
    //   return;
    // }

    // for (let idx = 0; idx < elementSelected.length; idx++) {
    //   const {
    //     model,
    //     selection
    //   } = elementSelected[idx];

    //   model.getBulkProperties(
    //     selection, {
    //       propFilter: ["name"]
    //     },
    //     el => {
    //       el.forEach(element => {
    //         window.spinal.BimObjectService.addReferenceObject(
    //           option.selectedNode.id.get(), element.dbId, element.name, model);
    //       });
    //     }
    //   );
    // }

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

module.exports = UpdateDbId;
