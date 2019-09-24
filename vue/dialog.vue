<template>
  <div>
    <md-dialog :md-active.sync="showDialog"
               @md-closed="closeDialog(false)">
      <md-dialog-title>{{title}}</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label>{{label}}</label>
          <md-input v-model="inputValue"></md-input>
        </md-field>

      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary"
                   @click="closeDialog(false)">Close</md-button>
        <md-button class="md-primary"
                   @click="closeDialog(true)"
                   :disabled="!(inputValue.trim().length > 0)">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import utilities from "spinal-env-viewer-context-geographic-service";
//import { toasted } from "../toats";

export default {
  name: "dialogComponent",
  props: ["onFinised"],
  data() {
    return {
      showDialog: true,
      inputValue: "",
      title: "",
      label: "",
      type: "",
      selectedNode: null,
      context: null
    };
  },
  methods: {
    opened(option) {
      this.title = option.title;
      this.label = option.label;
      this.type = option.type;
      this.selectedNode = option.selectedNode;
      this.context = option.context;
    },

    async removed(option) {
      // eslint-disable-next-line no-unused-vars
      var success;

      if (option.closeResult && option.inputValue.trim().length > 0) {
        if (typeof this.selectedNode === "undefined") {
          success = await utilities.createContext(option.inputValue.trim());
        }

        // else {
        // success = utilities.addAbstractElement(
        // this.context,
        // this.selectedNode,
        // option.inputValue
        // );
        // }

        // // if (success) {
        // //   toasted.success("Creation successful");
        // // } else {
        // //   toasted.error("An error occurred, try again later");
        // // }
      }

      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") {
        this.onFinised({ closeResult, inputValue: this.inputValue });
      }
    }
  }
};
</script>
