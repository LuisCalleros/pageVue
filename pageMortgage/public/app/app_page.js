var app_page = new Vue({
    el: '#app_page',
    data: {
        
        server: webServer,
        puerto:puerto,
        infoEteprices:[],
        sellos:[],
        numeroofice:'',
        faxNumber:'',
        programs:[],
        calculator:"",
        mortgageOptions:[],
        stylesDinmamic:[],
        rgbaStyle:"",
        convetionalDrop:"false",
        governmentDrop:"false",
        portafolioDrop:"false",
        loanOfficerName:"",
        loanOfficerId:"",
        imgLoanOfficer:'',
    },
    created:function() {
       this.loanOfficerId =  sessionStorage.getItem('key')
       this.loanOfficerName=  sessionStorage.getItem('nameLoanOfficer')
       this.imgLoanOfficer=  sessionStorage.getItem('imgLoanOfficer')
       console.log('name loan ',this.loanOfficerName);
    },
    methods: {
        showBubble: function(){

				 	

            $("#hello_loan").fadeIn(250);
            // app_support_user.auxiliaryBubble = false;
    

 },
 
 hideBubble: function(){

         $("#hello_loan").fadeOut(250);
            // app_support_user.auxiliaryBubble = true;

 },
        changeDropdwonConvetional:function () {
            if (app_page.convetionalDrop =="false") {
                app_page.convetionalDrop ="true";
            }else{
                app_page.convetionalDrop = "false"; 
            }
            
        },
        changeDropdwongovernmentDrop:function () {
            if (app_page.governmentDrop =="false") {
                app_page.governmentDrop ="true";
            }else{
                app_page.governmentDrop = "false"; 
            }
            
        },
        changeDropdwonportafoliotDrop:function () {
            if (app_page.portafolioDrop =="false") {
                app_page.portafolioDrop ="true";
            }else{
                app_page.portafolioDrop = "false"; 
            }
            
        },
        getInfo:function(){
               console.log(window.location.hostname )
            let protocolo =window.location.hostname 
          $.get(`${app_page.server}${app_page.puerto}/getInformationEnterprise/${protocolo}`).done(data => {

                console.log(data)

                console.log(JSON.parse(data)) 
                app_page.infoEteprices=JSON.parse(data);
                app_page.calculator= app_page.infoEteprices[0].mortgage_calculator
                console.log(app_page.infoEteprices);
                console.log(app_page.calculator);
                app_page.formatear(app_page.infoEteprices[0].telnyx_number, app_page.infoEteprices[0].fax);
                 });


                 $.get(`${app_page.server}${app_page.puerto}/getFooter/${protocolo}`).done(data => {

                    app_page.sellos=JSON.parse(data)
                    console.log('this is sello',app_page.sellos)
                   
    
                });
                $.get(`${app_page.server}${app_page.puerto}/getEnterpriseColors/${protocolo}`).done(data => {

                    app_page.stylesDinmamic=JSON.parse(data)
                    console.log('colors styles= ',app_page.stylesDinmamic)
                    console.log(app_page.stylesDinmamic[0].color_footer);
                   app_page.hexToRgbA(app_page.stylesDinmamic[0].color_footer)
    
                });
    
                //  console.log(server + puerto + '/getBackgroundPage/' + stylesDinmamic[0].video_background );
        },
        getPrograms:function(program){
           let typeprogram=program
         let protocolo =window.location.hostname 
            $.get(`${app_page.server}${app_page.puerto}/getLoanPrograms/${protocolo}/${typeprogram}`).done(data => {

                console.log(JSON.parse(data)) 
                app_page.programs=JSON.parse(data);
                console.log(app_page.programs);
                // app_page.formatear(app_page.programs[0].telnyx_number, app_page.infoEteprices[0].fax);
                
            });
                    
            
        },
        getMortgagResources:function () {
         let protocolo =window.location.hostname 

            $.get(`${app_page.server}${app_page.puerto}/getMortgagResources/${protocolo}`).done(data => {

                console.log(JSON.parse(data)) 
                app_page.mortgageOptions=JSON.parse(data);
                console.log("mortgageOptios",app_page.mortgageOptions);
            });
            
        },

        formatear: function (number,fax){
            var num_sf=number
            // $('#numberOffice').val;
            console.log(fax);
            var num_cf='(';
            num_cf+=num_sf.substring(0,3)+") ";
            num_cf+=num_sf.substring(3,6)+"-";
            num_cf+=num_sf.substring(6,10);
            app_page.numeroofice = num_cf
            num_sf=fax
            // $('#numberOffice').val;
           num_cf='';
           num_cf+='(';
            num_cf+=num_sf.substring(0,3)+") ";
            num_cf+=num_sf.substring(3,6)+"-";
            num_cf+=num_sf.substring(6,10);
            app_page.faxNumber = num_cf
            // document.getElementById('format').value=num_cf;
        },
        goToProgramDescripsion: function (id) {
            sessionStorage.setItem('loanProgram', id);
            // window.location.assign("http://localhost/pageMortgage/public/loanDescription.html")
            renderPage('programDescription.html')
        },
        goToMortgageOptionsDescripsion: function (id) {
            sessionStorage.setItem('optionId', id);
            // window.location.assign("http://localhost/pageMortgage/public/loanDescription.html")
            renderPage('morgageDescriptionsOptions.html')
        },
        hexToRgbA:function (hex){
            var c;
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                c= hex.substring(1).split('');
                if(c.length== 3){
                    c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c= '0x'+c.join('');
                app_page.rgbaStyle= 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.77)';
                // return ;
            }
            throw new Error('Bad Hex');
        },
        goToLoanDescripsion: function (id) {
            sessionStorage.setItem('key', id);
            // window.location.assign("http://localhost/pageMortgage/public/loanDescription.html")
            renderPage('loanDescription.html')
        },
        
        

    }   
})
app_page.getInfo();
app_page.getPrograms();
app_page.getMortgagResources();

