import vue from "vue";
import dialogComponent from "./dialog.vue";
import linkToDashBoardDialog from './linkToDashBoardDialog.vue';
const {
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");

var dialogs = [{
  name: "createContextDialog",
  vueMountComponent: vue.extend(dialogComponent),
  parentContainer: document.body
}, {
  name: "linkToDashBoardDialog",
  vueMountComponent: vue.extend(linkToDashBoardDialog),
  parentContainer: document.body
}];


for (let index = 0; index < dialogs.length; index++) {
  SpinalMountExtention.mount(dialogs[index]);
}