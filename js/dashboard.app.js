
var dashboardApp = new Vue({
  el: '#dashboard',
  data: {
      name : "Tapestry",
      "short_description": "Build a visualization layer for the project dashboard",
      "start_date" : "2018-07-01",
      "target_date" : "2018-11-03",
      "budget" : "4950000",
      "spent" : "3456700",
      "projected_spend": "4740500",
      "weekly_effort_target": 400,
      tasks:[
      {
        id: 1,
        title: " ",
        type : "",
        size : "",
        team : "",
        status: "",
        start_date: "2018-08-02",
        close_date: null,
        hours_worked:'',
        perc_complete: '',
        current_sprint: ''
      }
    ]
},

  computed: {
    days_left:function(){
      //this.days_left
      return moment(this.target_date).diff(moment(), 'days');
    },
    pretty_target_date: function(){
      return this.pretty_date(this.target_date);
    }
  },
  methods: {
    pretty_date: function(d){
    return moment(d).format('l');
  },
    pretty_currency: function(val){
      if( val < 1e3){
        return "$ "+ val;
      }
      if (val < 1e6){
        return "$ " + (val/1e3).toFixed(1) + " k";
      }
      return "$ " + (val/1e6).toFixed(1) + " M";
    },
    completeClass: function(task){
      if (task.perc_complete == 100) {return 'alert-success';}
      if (task.current_sprint && task.hours_worked== 0) {return 'alert-warning';}
    },
    fetchTasks(){
      fetch("https://raw.githubusercontent.com/tag/iu-msis/dev/public/p1-tasks.json")
      .then(function (response) {return response.json();})
      .then(function (json) {dashboardApp.tasks= json;})
      .catch(function(err){
        console.log('Task fetch error:');
        console.log(err);});
    }
  },

  created(){
    this.fetchTasks();
  }//created should be out of methods

});
