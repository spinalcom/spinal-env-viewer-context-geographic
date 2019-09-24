<template>
  <md-dialog :md-active.sync="showDialog"
             @md-closed="closeDialog(false)">
    <md-dialog-title>Add Child</md-dialog-title>
    <md-dialog-content>

      <md-field>
        <label for="childType">Select Type</label>
        <md-select v-model="typeSelected"
                   name="childType"
                   id="childType">
          <md-option v-for="(obj,index) in typeAvailable"
                     :key="index"
                     :value="obj.type">{{obj.name}}</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label>Name</label>
        <md-input v-model="inputValue"></md-input>
      </md-field>

    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary"
                 @click="closeDialog(false)">Close</md-button>
      <md-button class="md-primary"
                 :disabled="disableBtn()"
                 @click="closeDialog(true)">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import ContextGeographicService from "spinal-env-viewer-context-geographic-service";

const constants = ContextGeographicService.constants;

export default {
  name: "addChildDialog",
  props: ["onFinised"],
  data() {
    return {
      showDialog: true,
      contextId: null,
      nodeSelectedId: null,
      nodeSelectedType: null,
      typeAvailable: [],
      typeSelected: null,
      inputValue: ""
    };
  },
  methods: {
    opened(option) {
      this.nodeSelectedId = option.selectedNode.id.get();
      this.nodeSelectedType = option.selectedNode.type.get();
      this.contextId = option.context.id.get();

      this.typeAvailable = this.getTypesAvailable();
    },

    getTypesAvailable() {
      let typesIndex = constants.GEOGRAPHIC_TYPES_ORDER.indexOf(
        this.nodeSelectedType
      );

      let data = [...constants.GEOGRAPHIC_TYPES_ORDER];

      if (typesIndex !== -1) {
        data = data.slice(typesIndex + 1, data.length - 1);
      }

      return data.map(el => {
        return {
          type: el,
          name: this.formatData(el)
        };
      });
    },

    removed(option) {
      if (option.closeResult) {
        switch (this.typeSelected) {
          case constants.SITE_TYPE:
            ContextGeographicService.addSite(
              this.contextId,
              this.nodeSelectedId,
              this.inputValue.trim()
            );
            break;
          case constants.BUILDING_TYPE:
            ContextGeographicService.addBuilding(
              this.contextId,
              this.nodeSelectedId,
              this.inputValue.trim()
            );
            break;
          case constants.FLOOR_TYPE:
            ContextGeographicService.addFloor(
              this.contextId,
              this.nodeSelectedId,
              this.inputValue.trim()
            );
            break;
          case constants.ZONE_TYPE:
            ContextGeographicService.addZone(
              this.contextId,
              this.nodeSelectedId,
              this.inputValue.trim()
            );
            break;
          case constants.ROOM_TYPE:
            ContextGeographicService.addRoom(
              this.contextId,
              this.nodeSelectedId,
              this.inputValue.trim()
            );
            break;
        }
      }

      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") {
        this.onFinised({ closeResult, inputValue: this.inputValue });
      }
    },

    disableBtn() {
      return this.inputValue.trim().length === 0 || !this.typeSelected;
    },

    formatData(data) {
      return data.replace("geographic", "");
    }
  }
};
</script>