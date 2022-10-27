var app_morgage_blogs = new Vue({
    el: '#app_morgage_blogs',
    data: {
        blogs:[],
        Message:"hola perra",
        total_banner:"",
        banners:[],
        pageBanner:[],
        current_page: 0,
        products:[],
        bolgs_pasados:[],
        server: webServer,
        puerto:puerto,
        rgbaStyle:'', 
        stylesDinmamic:[],
    },
    methods: {
        getBlogs:function(page){
            // console.log(window.location.protocol )
            console.log(window.location.hostname )
            let protocolo =window.location.hostname 
            
            if (page>=0) {

                app_morgage_blogs.current_page = page
            }
            
            $.get(`${app_morgage_blogs.server}${app_morgage_blogs.puerto}/getBlogs/${protocolo}/${app_morgage_blogs.current_page}`).done(data => {

                console.log(JSON.parse(data)) 
                app_morgage_blogs.blogs=JSON.parse(data);
               
                for (let index = 0; index < app_morgage_blogs.blogs.length; index++) {
                    if (index>0) {
                        app_morgage_blogs.bolgs_pasados.push(app_morgage_blogs.blogs[index]) 
                    }
                     
                    console.log(app_morgage_blogs.bolgs_pasados);
                 }
                
            });
            $.get(`${app_morgage_blogs.server}${app_morgage_blogs.puerto}/getEnterpriseColors/${protocolo}`).done(data => {

                app_morgage_blogs.stylesDinmamic=JSON.parse(data)
                console.log('colors styles= ',app_morgage_blogs.stylesDinmamic)
                console.log(app_morgage_blogs.stylesDinmamic[0].color_footer);
                app_morgage_blogs.hexToRgbA(app_morgage_blogs.stylesDinmamic[0].color_background_user)

            });
                 

            let total_banners =app_morgage_blogs.blogs.length ;
        
          

                 
             let resultado = page;

             app_morgage_blogs.banners = app_morgage_blogs.blogs;

             resultado = parseInt(total_banners/20) ;

             app_morgage_blogs.pageBanner=[];

            

             for (var i = 0; i <= resultado; i++) {

             app_morgage_blogs.pageBanner.push(i);

            
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
                app_morgage_blogs.rgbaStyle= 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',') + ',0.77)';
                // return ;
            }
            throw new Error('Bad Hex');
        },

        goToblog: function (id) {
            sessionStorage.setItem('key', id);
            // window.location.assign("http://localhost/pageMortgage/public/blogInformation.html")
            renderPage('blogInformation.html')

        },
        getProducts: function () {
            $.get(`http://192.168.1.131:100/getProducts`).done(data => {

                console.log(data) 
                app_morgage_blogs.products=data;
                
                 });
        },


        movePage: function(number) {

            let next_page = app_morgage_blogs.current_page + number;

            if (next_page < app_morgage_blogs.pageBanner.length && next_page >= 0) {

                app_morgage_blogs.getLoansOficers(next_page);
            }
            
        },
    }
})
app_morgage_blogs.getBlogs();
// app_morgage_blogs.getProducts();