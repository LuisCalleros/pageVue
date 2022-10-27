var app_loan_descripsion = new Vue({
    el: '#app_loan_descripsion',
    data: {
       id_loan_oficer:"",
       loansOficer:[],
       message:"hola Mundo",
       videosUser:[],
       server:webServer,
       puerto:puerto,
       rgbaStyle:'',
       videos_user:[],
    },
    created:function() {
        app_page.loanOfficerId =  sessionStorage.getItem('key')
        app_page.loanOfficerName=  sessionStorage.getItem('nameLoanOfficer')
        app_page.imgLoanOfficer=  sessionStorage.getItem('imgLoanOfficer')

        console.log('name loan ',app_page.imgLoanOfficer);
     },
    methods: {
        getLoansOficer:function(){
            // console.log(window.location.protocol )
            // console.log(window.location.hostname )
            let protocolo =window.location.hostname 
            console.log(sessionStorage.getItem('key') )
            app_loan_descripsion.id_loan_oficer =sessionStorage.getItem('key')
            
            $.get(`${app_loan_descripsion.server}${app_loan_descripsion.puerto}/getUser/${app_loan_descripsion.id_loan_oficer}`).done(data => {

                
                app_loan_descripsion.loansOficer=JSON.parse(data)
                console.log(app_loan_descripsion.loansOficer)
                let nameOficer = app_loan_descripsion.loansOficer[0].name
                let imgOficer = app_loan_descripsion.loansOficer[0].picture
                // console.log('nameOficer',nameOficer);
                sessionStorage.setItem('nameLoanOfficer', nameOficer);
                sessionStorage.setItem('imgLoanOfficer', imgOficer);
                
                app_page.loanOfficerId =  app_loan_descripsion.id_loan_oficer 
                app_page.loanOfficerName=  nameOficer
                app_page.imgLoanOfficer=  imgOficer
                console.log('el putoo nombre ', app_page.loanOfficerName);
                app_page.$forceUpdated();
                if (app_loan_descripsion.id_loan_oficer =="") {
                    
                    sessionStorage.removeItem('key');
                }

            });
            $.get(`${app_loan_descripsion.server}${app_loan_descripsion.puerto}/getEnterpriseColors/${protocolo}`).done(data => {

                app_loan_descripsion.stylesDinmamic=JSON.parse(data)

                console.log('colors styles= ',app_loan_descripsion.stylesDinmamic)

                console.log(app_loan_descripsion.stylesDinmamic[0].color_background_user);

               app_loan_descripsion.hexToRgbA(app_loan_descripsion.stylesDinmamic[0].color_background_user)

            });

        },
        hexToRgbA:function (hex){
            var c;
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                c= hex.substring(1).split('');
                if(c.length== 3){
                    c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c= '0x'+c.join('');
                app_loan_descripsion.rgbaStyle= 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.77)';
                // return ;
            }
            throw new Error('Bad Hex');
        },
        getVideos:function(){
            // console.log(window.location.protocol )
            // console.log(window.location.hostname )
            let protocolo =window.location.hostname 
            // console.log(sessionStorage.getItem('key') )
            // app_loan_descripsion.id_loan_oficer =sessionStorage.getItem('key')
            
            $.get(`${app_loan_descripsion.server}${app_loan_descripsion.puerto}/getVideoById/${protocolo}/${ app_loan_descripsion.id_loan_oficer}`).done(data => {

                app_loan_descripsion.videosUser=JSON.parse(data)
                console.log(app_loan_descripsion.videosUser)
                // if (app_loan_descripsion.id_loan_oficer ="") {
                    
                //     sessionStorage.removeItem('key');
                // }

            });

        },
        goToCustumerPortal: function () {
            // console.log("https://1smtg.com" +"/set_mlo/" + app_loan_descripsion.id_loan_oficer);
            window.location = "https://1smtg.com" +"/set_mlo/" + app_loan_descripsion.id_loan_oficer ;

        },
        goToQuote: function () {
            // console.log("https://1smtg.com" +"/rates/"+ app_loan_descripsion.loansOficer[0].branch +"/" + app_loan_descripsion.id_loan_oficer);
            window.location = "https://1smtg.com" +"/rates/"+ app_loan_descripsion.loansOficer[0].branch +"/"+ app_loan_descripsion.id_loan_oficer ;

        },
    }
})
app_loan_descripsion.getLoansOficer();
app_loan_descripsion.getVideos();