var app_blog_info = new Vue({
    el: '#app_blog_info',
    data: {
        id_blog:"",
         blog:[],
         server: webServer,
         puerto:puerto,
         stylesDinmamic:[],
         rgbaStyle:'',
    },
    methods: {
        getblog:function(){
            let protocolo =window.location.hostname 
           
            console.log(sessionStorage.getItem('key') )
            app_blog_info.id_blog =sessionStorage.getItem('key')
            
            $.get(`${app_blog_info.server}${app_blog_info.puerto}/getBlogById/${app_blog_info.id_blog}`).done(data => {

                app_blog_info.blog=JSON.parse(data)
                console.log(app_blog_info.blog)
                if (app_blog_info.id_blog ="") {
                    
                    sessionStorage.removeItem('key');
                }

            });
            $.get(`${app_blog_info.server}${app_blog_info.puerto}/getEnterpriseColors/${protocolo}`).done(data => {

                app_blog_info.stylesDinmamic=JSON.parse(data)
                console.log('colors styles= ',app_blog_info.stylesDinmamic)
                console.log(app_blog_info.stylesDinmamic[0].color_footer);
               app_blog_info.hexToRgbA(app_blog_info.stylesDinmamic[0].color_footer)

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
                app_blog_info.rgbaStyle= 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.77)';
                // return ;
            }
            throw new Error('Bad Hex');
        },
      
    }
})
app_blog_info.getblog();