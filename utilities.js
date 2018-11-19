var graphLib = require("spinalgraph");

const { AbstractElement } = require("spinal-models-building-elements");


export default class ContextGeographic {

  constructor() {}


  formatRelationName (type){
    return "has" + (type.charAt(0).toUpperCase()) + (type.slice(1).toLowerCase());
  }

  async createContext(contextName){

    var _graph = spinal.ForgeViewer.forgeFile.graph;

    var context = await _graph.getContext(contextName);

    if (typeof context !== "undefined") return false;

    var contextGeo = new graphLib.SpinalContext(
      contextName,
      "context",
      new AbstractElement(contextName)
    );

    _graph.addContext(contextGeo);
    return true;
  }

  addAbstractElement(parentNode, childName, type){
    // if (
    //   !(parentNode instanceof graphLib.SpinalNode) ||
    //   typeof buildingName !== "string"
    // ) {
    //   throw "first params must be a SpinalNode and the second must be a string";
    // }

    var childNode = new graphLib.SpinalNode(childName,type,new AbstractElement(childName));
  
    parentNode.addChild(childNode, this.formatRelationName(type), "Ref");
  }


  addBuilding (parentNode, buildingName){
    this.addAbstractElement(parentNode,buildingName,"hasBuilding");
  }


  addFloor (parentNode, floorName){
    this.addAbstractElement(parentNode,floorName,"hasFloor");

  }


  addZone (parentNode, zoneName){
    this.addAbstractElement(parentNode,zoneName,"hasZone");

  }


  addRoom (parentNode, roomName){
    this.addAbstractElement(parentNode,roomName,"hasRoom");

  }


  addBimElement (parentNode, childName, relationName){
    

  }

}
  

var contextGeographic = new ContextGeographic();

module.exports = contextGeographic;