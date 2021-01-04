/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

const HeaderBarName = "GraphManagerTopBar";
const sidebarName = "GraphManagerSideBar";

import "./registerDialogs";
import {spinalContextMenuService} from "spinal-env-viewer-context-menu-service";

import CreateContextBtn from './classes/createContext';
import AddAbstactElement from "./classes/addAbstract";
import AddReferenceBtn from "./classes/addReference";
import AddToReference from "./classes/addToReferenceContext";
import AddBimObjects from "./classes/addBimObject";
import {UpdateBimObjectIdBtn,SpatialContextUpdateBimObjectIdBtn } from './classes/updateDbId';

spinalContextMenuService.registerApp(HeaderBarName, new CreateContextBtn(), [
  3
]);

spinalContextMenuService.registerApp(sidebarName, new AddAbstactElement(), [3]);
spinalContextMenuService.registerApp(sidebarName, new AddReferenceBtn(), [3]);
spinalContextMenuService.registerApp(sidebarName, new AddToReference(), [3]);
spinalContextMenuService.registerApp(sidebarName, new AddBimObjects(), [3]);
spinalContextMenuService.registerApp(sidebarName, new UpdateBimObjectIdBtn(), [3]);
spinalContextMenuService.registerApp(sidebarName, new SpatialContextUpdateBimObjectIdBtn(), [3]);
