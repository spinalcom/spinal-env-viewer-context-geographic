
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
import vue from "vue";
import utilities from "spinal-env-viewer-context-geographic-service";
import Toasted from "vue-toasted";

vue.use(Toasted);

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
      this.inputValue = option.inputValue;
      this.title = option.title;
      this.label = option.label;
      this.type = option.type;
      this.selectedNode = option.selectedNode;
      this.context = option.context;
    },

    async removed(option) {
      var success,
        toastOption = {
          position: "bottom-right",
          duration: 3000
        };

      if (option.closeResult && option.inputValue.trim().length > 0) {
        if (typeof this.selectedNode === "undefined") {
          success = await utilities.createContext(option.inputValue.trim());
        } else {
          success = utilities.addAbstractElement(
            this.context,
            this.selectedNode,
            option.inputValue
          );
        }

        if (success) {
          vue.toasted.success(" created with success", toastOption);
        } else {
          vue.toasted.error("an error occurred, try again later", toastOption);
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
