var app = new Vue({
  el: '#app',
  data: {
    mycolor: '#'+(Math.random()*0xFFFFFF<<0).toString(16)
  },
  mounted() {
     document.body.style.background = this.mycolor;
  },
  methods: {
      generator: function(){
        this.mycolor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        document.body.style.background = this.mycolor;
      }
    }
})