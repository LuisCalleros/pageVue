var app_program_description = new Vue({
    el: '#app_program_description',
    data: {
       id_progrm:"",
       program_html:[],
      
       server:webServer,
       puerto:puerto,
       stylesDinmamic:[],
       rgbaStyle:'',
       current_page:0,
    },
    methods: {
        getprogram:function(){

            // if (page== null) {
            //     console.log(page);
            //     page= 0;
            // }
            console.log(app_program_description.server )
            console.log(window.location.hostname )
            let protocolo =window.location.hostname 
            console.log(sessionStorage.getItem('loanProgram') )
            // console.log(page);
            app_program_description.id_progrm =sessionStorage.getItem('loanProgram')
            
            $.get(`${app_program_description.server}${app_program_description.puerto}/getContentLoanProgram/${protocolo}/${app_program_description.id_progrm}/${'0'}`).done(data => {

                app_program_description.program_html=JSON.parse(data)
                console.log(app_program_description.program_html)
                // if (app_program_description.id_progrm =="") {
                    // app_program_description.current_page= page;
                //     sessionStorage.removeItem('loanProgram');
                // }

            });

            $.get(`${app_program_description.server}${app_program_description.puerto}/getEnterpriseColors/${protocolo}`).done(data => {

                app_program_description.stylesDinmamic=JSON.parse(data)

                console.log('colors styles= ',app_program_description.stylesDinmamic)

                console.log(app_program_description.stylesDinmamic[0].color_background_user);

               app_program_description.hexToRgbA(app_program_description.stylesDinmamic[0].color_background_user)

            });
        },
        // movePage: function(number) {

        //     let next_page = app_program_description.current_page + number;

        //     // if (next_page < app_program_description.pageBanner.length && next_page >= 0) {

        //         app_program_description.getprogram(next_page);
        //     // }
            
        // },

        hexToRgbA:function (hex){
            var c;
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                c= hex.substring(1).split('');
                if(c.length== 3){
                    c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c= '0x'+c.join('');
                app_program_description.rgbaStyle= 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.77)';
                // return ;
            }
            throw new Error('Bad Hex');
        },
        
    }
})
app_program_description.getprogram();