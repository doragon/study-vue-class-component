import Component from 'vue-class-component'
import * as Vue from "vue"

@Component({
  props: {
    parentMsg: String
  },
  template: `
    <div class="child">
      <h2>Child</h2>
      <input v-model="msg">
      <p>msg: {{msg}}</p>
      <p>parentMsg from props: {{parentMsg}}</p>
      <button @click="greet">SetTitle</button>
    </div>
  `
})
class App extends Vue{
  msg: string;

  // return initial data
  data () {
    return {
      msg: 123
    }
  }

  // lifecycle hook
  ready () {
    this.greet()
  }

  // computed
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // method
  greet () {
      this.$dispatch("setTitle", this.msg);
  }
}

new Vue({
    el: "main",
    data: {
        title : "Hey",
        parentMsg: ""
    },
    components: {
        app: App
    },
    ready: function(){
        this.$on("setTitle", (title)=>{
            this.title = title;
        })
    }
})