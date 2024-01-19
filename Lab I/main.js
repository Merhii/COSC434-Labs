$(document).ready(function(){
    $.ajax({
        url: 'data.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            FindCategory(data);
            LoadData(data);
            // filterCatagoris() ;
        },
        error: function(error) {
            console.error('Error fetching data: ', error);
        }
    });
    var menuTrigger = $("#CategoryLabel");
    function filterCatagoris() {
        $(".unordered").hide();
        $.each($(".unordered"),function(){
        if(menuTrigger.text===$(".unordered").text)
                this.$("unordered").show();            
        })
    }
    function LoadData(data)
    {
        let main =$("#main");
        $.each(data,function(index,item){
            let UL = $("<div>");
            UL.addClass("unordered");
            
            UL.text((item.name+" "+item.price+"   "+item.category));
            console.log(UL);
             main.append(UL);
             console.log(main)
        })

    }
    function FindCategory(data){
        let categoryArr=[]; 
        $.each(data, function(index,item){
            let newcat = item.category;
        let options= $("<option>")

            if(!categoryArr.includes(newcat)){
            categoryArr.push(newcat);
            options.text(newcat);
            $("#filter").append(options);
            }

        })
        // console.log(categoryArr);
        
    }

})