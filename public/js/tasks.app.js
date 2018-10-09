var tasksApp = new Vue({
  el:'#tasksMain',
  data:{
    task: {
      id: 0,
      title: 'foo',
      type : '',
      size : '',
      team : '',
      status: '',
      start_date: '',
      close_date: null,
      hours_worked: '',
      perc_complete: '',
      current_sprint : ''
    },
    work:[],
    workForm:{},
    teamList:[]
  },
  computed:{
    workSpan(){
      return moment(this.workForm.stop)
            .diff(moment(this.workForm.start),'hours',true)
            .toFixed(1);
    }
  },
  methods:{
    handleEorkForm(e){
      e.preventDefault();
      //todo:check validity
      console.log(e);
      const s =JSON.stringify(this.workForm);
      this.work.push(JSON.parse(s));
      this.workForm = this.getEmptyWorkForm();
    },
    sumHours(){
      return this.work.reduce((sum,current) => sum +current.hours,0);
    },
    diffAsHours(){
      return 0;
    },
    datetimeFormat(d){
      d=d || moment();
      return moment(d).format('YYYY-MM-DD[T]HH:MM');
    },
    getEmptyWorkForm(){
      return{
        start:this.datetimeFormat(),
        stop:this.datetimeFormat(),
        teamList: null,
        completion_estimate:0
      };
    },
    prettyDate(d){
      return moment(d).format('YYYY-MM-DD HH:MM');
    }
  },
  created(){
    this.workForm= this.getEmptyWorkForm();
    const url= new URL(window.location.href);
    const taskId =url.searchParams.get('taskId');
    console.log('Task: ' + taskId);

    if(!taskId){}


    fetch('api/work.php?taskId=' +taskId)
    .then(response => response.json())
    .then( json =>{tasksApp.work = json})
    .catch( err =>{
      console.log('Work fetch error:');
      console.log(err);
    })

    fetch('api/team.php')
    .then(response => response.json())
    .then( json =>{tasksApp.teamList = json})
    .catch( err =>{
      console.log('Team list error:');
      console.log(err);
    })
  }
})
