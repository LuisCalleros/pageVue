var app_calculator = new Vue({
    el: '#app_calculator',
    data: {
        selectVal:'',
        pi:'',
        property_tax:'',
        hazard_insurance:'',
        monthly_installment:'',
        mi:'',
        hoa:'',
        graphicCalculator:'',
        server:webServer,
        puerto:puerto,
    },
    methods: {
      getValueSelecteYears: function () {
            app_calculator.selectVal= $("#select_years").val();
            console.log(app_calculator.selectVal)
        },

      getPrincipalInterest: function () {
            let select_years= $("#select_years").val();
            let homeValue=$("#homeValue").val();
            let downPayment= $("#downPayment").val();
            let intersertRate= $("#intersertRate").val();
            let startAfter = $("#startAfter").val();
            let annualProerty = $("#annualProerty").val();
            let annualHazardIns = $("#annualHazardIns").val();
            let MI = $("#MI").val();
            app_calculator.hoa= $("#monthlyHOA").val();
            let loan_amount= parseFloat(homeValue) - parseFloat(downPayment);
            
            console.log(MI)
            
            let rate = intersertRate;
            let anual_rate = (rate / 100) / 12;
            let prePi = loan_amount / ((Math.pow(1 + anual_rate, select_years) - 1) / (anual_rate
                * Math.pow(1 + anual_rate, select_years)));
                
                
                app_calculator.pi= Math.round(prePi); 
                
                app_calculator.property_tax=Math.ceil(((parseFloat(homeValue) * ((parseFloat(annualProerty))/100)) /
                12).toFixed(2));
                console.log(app_calculator.property_tax)
                app_calculator.hazard_insurance= Math.ceil(annualHazardIns/12);
                
                app_calculator.mi= Math.floor((loan_amount*(MI/100))/12)
                
                
                
                // app_calculator.monthly_installment=app_calculator.mi +app_calculator.pi + app_calculator.property_tax + app_calculator.hoa + app_calculator.hazard_insurance
            app_calculator.monthly_installment=  (parseFloat(app_calculator.hoa) 
            +  parseFloat(app_calculator.hazard_insurance)) + (parseInt(app_calculator.mi) + 
            parseInt(app_calculator.property_tax)) + parseInt(app_calculator.pi);
            
            
            
            app_calculator.graphic();

        },
            
        
        graphic:function () {
         
            
            var ctx= document.getElementById('graphicCalculator');
            if (app_calculator.graphicCalculator) {
                app_calculator.graphicCalculator.destroy()
                
            }
            app_calculator.graphicCalculator = new Chart(ctx, {
                type:'doughnut',
                data:{
                    labels: [
                        'Principal & Interest',
                        'Property Tax',
                        'MI',
                        'HOA',
                        'HI',
                        
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [app_calculator.pi, app_calculator.property_tax, app_calculator.mi, app_calculator.hoa, app_calculator.hazard_insurance],
                        backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 205, 86, 0.5)',
                        'rgba(13, 196, 191, 0.5)',
                        'rgba(255, 127, 14, 0.5)',
        
        
                        ],
                        hoverOffset: 1
                    }]
                },
                
            });
        

        },
      formatCurrency(val){ 
          return parseFloat(val).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) 
        },

    }   
})
app_calculator.graphic();
app_calculator.getPrincipalInterest();
app_calculator.getValueSelecteYears();