
<template>
  <div>
    <md-dialog :md-active.sync="showDialog"
               @md-closed="closeDialog(false)">
      <md-dialog-title>Select a dashboard To link</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout">

          <div v-if="hasDash"
               class="choicesEmpty">

            This element already has a dashboard, the old one will be removed !
          </div>

          <md-radio class="md-layout-item md-size-30 md-primary"
                    v-for="(choice,index) in choices"
                    :key="index"
                    v-model="radio"
                    :value="choice.name">{{choice.name}}</md-radio>

          <div class="choicesEmpty"
               v-if="choices.length == 0">
            There is no Dahboard created for this type
          </div>

        </div>
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
const DASHBOARD_CONTEXT = "Dashboard Standard";
const RELATION_NAME = "hasDashBoard";

export default {
  name: "linkToDashBoardDialog",
  props: ["onFinised"],
  data() {
    return {
      selectedNode: null,
      context: null,
      showDialog: true,
      choices : [],
      radio : "",
      hasDash: false
    };
  },
  methods: {
    opened(option) {
      this.context = option.context;
      this.selectedNode = option.selectedNode;
      this.hasDash = this.hasDashBoard(option.selectedNode);
      this.getDashboardByType(option.selectedNode).then(el => {
        this.choices = el;
      })
    },

    removed(option) {
      if(option.closeResult) {
        this.createRelation(this.selectedNode,this.context,RELATION_NAME,"Ref",(this.choices.find(el => el.name == this.radio)).node)
      }
      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function")
        this.onFinised({ closeResult });
    },

    async getDashboardByType(selectedNode) {
      let mod = await window.spinal.spinalSystem.getModel();
      if(mod.graph) {
        let context = await mod.graph.getContext(DASHBOARD_CONTEXT);

        if(context) {
          var res = [];

          let children = await context.getChildren([RELATION_NAME]);

          children.forEach(element => {

            if(element.info.type.get() == selectedNode.info.type.get()){
              res.push({
              name : element.info.name.get(),
              node : element
            })}
          });

          return res;

        }
      }

    },
    hasDashBoard(selectedNode) {
      if(selectedNode.hasRelation(RELATION_NAME,"Ref")) {
        return true;
      }
      return false;
    },
    createRelation(node,context, relationName,relationType,child) {

      if(node.hasRelation(relationName,relationType))
        return;

      node.addChildInContext(child, relationName, relationType, context);

    }
  }
};
</script>

<style>
  .choicesEmpty {
    color: red;
    width: 100%;
    margin-bottom: 10px;
    display: block;
  }
</style>
