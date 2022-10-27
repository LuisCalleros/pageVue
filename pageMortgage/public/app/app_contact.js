var app_contact = new Vue({
    el: '#app_contact',
    data: {
        contacts:[],
        server:webServer,
        puerto:puerto,
    },
    methods: {
        // getInfo:function(){
        //        console.log(window.location.hostname )
        //     let protocolo =window.location.hostname 
        //   $.get(`http://192.168.1.131:100/getInformationEnterprise/${protocolo}`).done(data => {

        //         console.log(JSON.parse(data)) 
        //         app_contact.contacts=JSON.parse(data);
        //          });

         

        // },
        sendEmail:function (params) {
            let protocolo =window.location.hostname
           let name=         $("#name").val();
            let email=        $("#email").val();
             let phone =       $("#phone").val();
              let sub =      $("#subject").val();
               let message =     $("#message").val();
               
               if (!name || !email || !phone || !sub || !message) {
                    

                Swal.fire('Fill all the fields!', '', 'error')
               }
                else {
                        $.get(`${app_contact.server}${app_contact.puerto}/sendEmail/${protocolo}/${name}/${email}/${phone}/${sub}/${message}`).done(data => {

                         Swal.fire('Send!', '', 'success')
                                 $("#name").val("");
                                 $("#email").val("");
                                 $("#phone").val("");
                                 $("#subject").val("");
                                 $("#message").val("");

                        });
                    }
        },

    }   
})
// app_contact.getInfo();
