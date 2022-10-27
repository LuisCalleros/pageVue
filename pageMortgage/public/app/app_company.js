var app_company = new Vue({
    el: '#app_company',
    data: {
        
        
        infoEteprices:[],
        server:webServer,
        puerto:puerto,
        rgbaStyle:'',
        stylesDinmamic:[],
        
        
    },
    methods: {
        getInfo:function(){
            console.log(window.location.hostname )
            let protocolo =window.location.hostname 
            $.get(`${app_company.server}${app_company.puerto}/getInformationEnterprise/${protocolo}`).done(data => {

                console.log(JSON.parse(data)) 
                app_company.infoEteprices=JSON.parse(data);
                console.log(app_company.infoEteprices);
             });
             $.get(`${app_company.server}${app_company.puerto}/getEnterpriseColors/${protocolo}`).done(data => {

                app_company.stylesDinmamic=JSON.parse(data)
                console.log('colors styles= ',app_company.stylesDinmamic)
                console.log(app_company.stylesDinmamic[0].color_footer);
               app_company.hexToRgbA(app_company.stylesDinmamic[0].color_footer)

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
                app_company.rgbaStyle= 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.77)';
                // return ;
            }
            throw new Error('Bad Hex');
        },
        

    }   
})
app_company.getInfo();