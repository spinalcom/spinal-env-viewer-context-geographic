import vue from "vue";
import dialogComponent from "./vue/dialog.vue";
import addChildDialogComponent from "./vue/addChildDialog.vue";

const {
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");

const dialogs = [{
  name: "createContextDialog",
  vueMountComponent: vue.extend(dialogComponent),
  parentContainer: document.body
}, {
  name: "addChildDialog",
  vueMountComponent: vue.extend(addChildDialogComponent),
  parentContainer: document.body
}];


for (let index = 0; index < dialogs.length; index++) {
  SpinalMountExtention.mount(dialogs[index]);
}