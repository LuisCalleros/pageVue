var app_morgage_option_description = new Vue({
    el: '#app_morgage_option_description',
    data: {
       id_options:"",
       description_options:[],
      
       server:webServer,
       puerto:puerto,
    },
    methods: {
        getprogram:function(){
            console.log(app_morgage_option_description.server )
            // console.log(window.location.hostname )
            // let protocolo =window.location.hostname 
            app_morgage_option_description.id_options =sessionStorage.getItem('optionId')
            console.log(sessionStorage.getItem('optionId') )
            
            $.get(`${app_morgage_option_description.server}${app_morgage_option_description.puerto}/getContentMortgagResources/${app_morgage_option_description.id_options}`).done(data => {

                app_morgage_option_description.description_options=JSON.parse(data)
                console.log(app_morgage_option_description.description_options)
            });

        },
        
    }
})
app_morgage_option_description.getprogram();