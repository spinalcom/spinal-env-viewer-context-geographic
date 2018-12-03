import vue from "vue";
import Toasted from "vue-toasted";


vue.use(Toasted);


var option = {
  position: "top-center",
  duration: 3000
};


let toasted = {

  success: function(message) {
    vue.toasted.success(message, option);
  },

  error: function(message) {
    vue.toasted.error(message, option);
  }


}

export {
  toasted
}