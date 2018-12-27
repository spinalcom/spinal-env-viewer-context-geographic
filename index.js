const HeaderBarName = "GraphManagerTopBar";
const sidebarName = "GraphManagerSideBar";

import "./registerDialogs";
import {
  spinalContextMenuService
} from "spinal-env-viewer-context-menu-service";

import CreateContextBtn from './classes/createContext';
import AddAbstactElement from "./classes/addAbstract";
import AddReferenceBtn from "./classes/addReference";

spinalContextMenuService.registerApp(HeaderBarName, new CreateContextBtn());
spinalContextMenuService.registerApp(sidebarName, new AddAbstactElement());
spinalContextMenuService.registerApp(sidebarName, new AddReferenceBtn());