
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
                   @click="closeDialog(true)">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import utilities from "spinal-env-viewer-context-geographic-service";

export default {
  name: "createContextDialog",
  props: ["onFinised"],
  data() {
    return {
      showDialog: true,
      inputValue: "",
      title: "",
      label: "",
      type: "",
      selectedNode: null
    };
  },
  methods: {
    
    opened(option) {
      this.inputValue = option.inputValue;
      this.title = option.title;
      this.label = option.label;
      this.type = option.type;
      this.selectedNode = option.selectedNode;
    },
    async removed(option) {
      if (option.closeResult && option.inputValue.trim().length > 0) {
        if (typeof this.selectedNode === "undefined") {
          var contextIsCreated = await utilities.createContext(
            option.inputValue.trim()
          );
        } else {
          utilities.addAbstractElement(this.selectedNode,option.inputValue,this.type);
        }
      }

      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function")
        this.onFinised({ closeResult, inputValue: this.inputValue });
    }
  }
};
</script>
