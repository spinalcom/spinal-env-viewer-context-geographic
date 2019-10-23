const HeaderBarName = "GraphManagerTopBar";
const sidebarName = "GraphManagerSideBar";

import "./registerDialogs";
import {spinalContextMenuService} from "spinal-env-viewer-context-menu-service";

import CreateContextBtn from './classes/createContext';
import AddAbstactElement from "./classes/addAbstract";
import AddReferenceBtn from "./classes/addReference";
import AddToReference from "./classes/addToReferenceContext";
import AddBimObjects from "./classes/addBimObject";
import UpdateDbId from './classes/updateDbId';

spinalContextMenuService.registerApp(HeaderBarName, new CreateContextBtn(), [
  3
]);

spinalContextMenuService.registerApp(sidebarName, new AddAbstactElement(), [3]);
spinalContextMenuService.registerApp(sidebarName, new AddReferenceBtn(), [3]);
spinalContextMenuService.registerApp(sidebarName, new AddToReference(), [3]);
spinalContextMenuService.registerApp(sidebarName, new AddBimObjects(), [3]);
spinalContextMenuService.registerApp(sidebarName, new UpdateDbId(), [3]);
