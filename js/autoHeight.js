var respWidth = 472;                     
var elem1 = '.servicesWrapper .service-item-wrapper .service-item .service-item-title'; 
var elem2 = '.servicesWrapper .service-item-wrapper .service-item .service-item-lead'; 
var elem3 = 'footer .autoHeight';
function resizeGrid(htmlClass){
    if ($(htmlClass).length>0){
        if ($(window).width() > respWidth){
            var h=0;
            $(htmlClass).removeAttr('style');	    
            $(htmlClass).each(function(){		
                if($(this).height()>h){
                   h=$(this).height();  
                }
            });    
            $(htmlClass).height(h);
        }else{
            $(htmlClass).css({'height':'auto'});   
        }
    }
}
$(document).ready(function(){
    setTimeout(function(){ 
        resizeGrid(elem1);
        resizeGrid(elem2);
        resizeGrid(elem3);
    }, 50);
});
$(window).resize(function(){
    setTimeout(function(){ 
        resizeGrid(elem1);
        resizeGrid(elem2);
        resizeGrid(elem3);
    }, 500);
});