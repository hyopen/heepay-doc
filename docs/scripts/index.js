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