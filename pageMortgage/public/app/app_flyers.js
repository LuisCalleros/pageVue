var app_flyers = new Vue({
    el: '#app_flyers',
    data: {
       id_progrm:"",
       flyers:[],
      
       server:webServer,
       puerto:puerto,
    },
    methods: {
        getFylers:function(){
            // console.log(app_flyers.server )
            // console.log(window.location.hostname )
            let protocolo =window.location.hostname 
            // console.log(sessionStorage.getItem('loanProgram') )
            // app_flyers.id_progrm =sessionStorage.getItem('loanProgram')
            
            $.get(`${app_flyers.server}${app_flyers.puerto}/getFlayers/${protocolo}`).done(data => {

                app_flyers.flyers=JSON.parse(data)
                console.log(app_flyers.flyers)
                // if (app_flyers.id_progrm =="") {
                    
                //     sessionStorage.removeItem('loanProgram');
                // }

            });

        },
        
    }
})
app_flyers.getFylers();