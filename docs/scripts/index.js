var showMana = 0;
function showMenu(){
    var menSidebar= document.getElementById("men-sidebar-box");
    if(showMana == 0) {
        document.getElementById('menSidebarBox').className = 'men-sidebar-box active';
        showMana = 1;
    }else{
        document.getElementById('menSidebarBox').className = 'men-sidebar-box';
        showMana = 0;
    }

}

function addActive(){
	$(".second_menu li,.menu_first li,.textbox-con li").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
		});
}

//体验中心下单中的订单加减
function numberbox(){
	var input = $(".number-input input");
	$(".minus").click(function(){
		var num=input.val();
		num--;
		if(num<0){
			num=0;
		}
		input.val(num);
                $("#hySumPrice").text(parseFloat($("#hyPrice").text()*$("#hyNum").val()).toFixed(2));                     
                $("#hyPayPrice").text($("#hySumPrice").text());
	})
	$(".plus").click(function(){
		var num=input.val();
		num++;
		input.val(num);
                $("#hySumPrice").text(parseFloat($("#hyPrice").text()*$("#hyNum").val()).toFixed(2));                     
                $("#hyPayPrice").text($("#hySumPrice").text());
	})
}