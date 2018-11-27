const HeaderBarName = "GraphManagerGlobalBar";
const sidebarName = "GraphManagerSideBar";

import "./registerDialogs";
const {
  spinalContextMenuService
} = require("spinal-env-viewer-context-menu-service");


import CreateContextBtn from './classes/createContext';
import AddAbstactElement from "./classes/addAbstract";
import LinkWithDashBoard from "./classes/linkWithDashBoard";



spinalContextMenuService.registerApp(HeaderBarName, new CreateContextBtn());
spinalContextMenuService.registerApp(sidebarName, new AddAbstactElement());
spinalContextMenuService.registerApp(sidebarName, new LinkWithDashBoard());