var app_teams = new Vue({
    el: '#app_teams',
    data: {
        loansOfficers:[],
        Message:"hola perra",
        total_banner:"",
        banners:[],
        pageBanner:[],
        current_page: 0,
        server : webServer,
        puerto:puerto,
        stylesDinmamic:[],
        rgbaStyle:'',
    },
    methods: {
        getLoansOficers:function(page){
            // console.log(window.location.protocol )
            console.log(window.location.hostname )
            let protocolo =window.location.hostname 
            
            if (page>=0) {

                app_teams.current_page = page
            }
            
            $.get(`${app_teams.server}${app_teams.puerto}/getAllUsers/${protocolo}/mlo/${app_teams.current_page}`).done(data => {

                console.log(JSON.parse(data)) 
                app_teams.loansOfficers=JSON.parse(data);
                 });

                 $.get(`${app_teams.server}${app_teams.puerto}/getEnterpriseColors/${protocolo}`).done(data => {

                    app_teams.stylesDinmamic=JSON.parse(data)
                    console.log('colors styles= ',app_teams.stylesDinmamic)
                    console.log(app_teams.stylesDinmamic[0].color_background_user);
                   app_teams.hexToRgbA(app_teams.stylesDinmamic[0].color_background_user)
    
                });

                 let total_banners =app_teams.loansOfficers.length ;
        
          

                 
             let resultado = page;

             app_teams.banners = app_teams.loansOfficers;

             resultado = parseInt(total_banners/20) ;

             app_teams.pageBanner=[];

            

             for (var i = 0; i <= resultado; i++) {

             app_teams.pageBanner.push(i);
             }



        },
        goToLoanDescripsion: function (id) {
            sessionStorage.setItem('key', id);
            // window.location.assign("http://localhost/pageMortgage/public/loanDescription.html")
            renderPage('loanDescription.html')
        },


        movePage: function(number) {

            let next_page = app_teams.current_page + number;

            if (next_page < app_teams.pageBanner.length && next_page >= 0) {

                app_teams.getLoansOficers(next_page);
            }
            
        },

        hexToRgbA:function (hex){
            var c;
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                c= hex.substring(1).split('');
                if(c.length== 3){
                    c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c= '0x'+c.join('');
                app_teams.rgbaStyle= 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.77)';
                // return ;
            }
            throw new Error('Bad Hex');
        },
    }
})
app_teams.getLoansOficers();