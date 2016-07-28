import Component from 'vue-class-component'
import * as Vue from "vue"


@Component({
    template: "<div><p><b>This is component</b></p></div>"
})
class HelloComponent extends Vue{
    //nothing todo
}

@Component({
  props: {
    parentMsgProp: String
  },
  template: `
    <div class="child">
      <h2>Child</h2>
      <input v-model="msg">
      <p>msg: {{msg}}</p>
      <p>parentMsg from props: {{parentMsgProp | addBlacket}}</p>
      <div><hello-component /></div>
      <button @click="greet">SetTitle</button>
    </div>
  `,
  filters: {
      addBlacket : function(input){
          return "[" + input + "]"
      }
  },
  components: {
      helloComponent: HelloComponent
  }
})
class AppComponent extends Vue{
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
        app: AppComponent
    },
    ready: function(){
        this.$on("setTitle", (title)=>{
            this.title = title;
        })
    }
})