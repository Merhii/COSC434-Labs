$(document).ready(function () {
    let currentPage = 1;
    let usersperpage = 8;
    let totalItems = 0;
    let data = []; 
    let userArr=[];
    $.ajax({
        url: 'data.json',
        method: 'GET',
        dataType: 'json',
        success: function (responseData) {
            totalItems = responseData.length;
            data = responseData;
            LoadData(responseData);
            search();
            Pages();
        },
        error: function (error) {
            console.error('Error fetching data: ', error);
        }
    });

    function LoadData(responseData) {
        let container = $("#container");
        container.empty(); 
       
      $.each(data,function(index,item){
            let subdiv = $("<div class='subdiv'>");
            let minidiv = $("<div class='minidiv'>");
            let img = $("<img class='img' src='" + item.avatar_url + "'>");
            let user = $("<a class='user' href='" + item.html_url + "' target='_blank'>" + item.login + "</a>");
            minidiv.append(img);
            minidiv.append(user);
        userArr.push(item.login);
            subdiv.append(minidiv);
            container.append(subdiv);
        })
        console.log(userArr);
    }

    function search() {
        $("#search").on("input", function () {
            var search = $(this).val().toLowerCase();    
            $(".subdiv").hide();
    
            $.each(userArr, function(index, value) {
                if (value.includes(search)) {
                    $("#container .subdiv:contains('"+value+"')").show();
                }
            });
        });
        $("#search").on("blur",function(){
            $("#container .subdiv:eq(1)").show();
        });
    }
    
 function Pages(){
    let numberofDivs = $("#container .subdiv").length;
    let pagelimit = 8;
    $("#container .subdiv:gt("+ (pagelimit-1) +")").hide();
    let toalPages=Math.round(numberofDivs/pagelimit);
    // alert(toalPages);
    $(".pagination").append('<li class="page-item current-page active"><a class="page-link" href="#">1</a></li>');
    for (let i=2;i<=toalPages;i++){
        $(".pagination").append('<li class="page-item current-page"><a class="page-link" href="#">'+i+'</a></li>');
    }

   
    $(".pagination .current-page").on("click",function(){
        if($(this).hasClass("active")){
            return false;
        }
        else{
            let currentPage = $(this).index();
        $(".pagination li").removeClass("active");
        $(this).addClass("active");
        $("#container .subdiv").hide();
        var grandTotal = pagelimit * currentPage;

        for(let i= grandTotal - pagelimit; i< grandTotal; i++){
            $("#container .subdiv:eq("+i+")").show();
        }
        }
        
    });
}

});
