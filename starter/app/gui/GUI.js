/*

    TODO: Use this file to do every GUI related function and call Services from here

*/

//function _bindObjectToContainer(pContainer, pObj) {
//    var obj = pObj || {};
//    var container = pContainer || document;
//    $(container).find("[data-valueof]").each(function(){
//        // Makes nesting possible: e.g. obj.name.firstname
//        var bindTo = $(this).attr("data-valueof").split(".");
//        var value = obj;
//        $.each(bindTo, function(i,v){
//            if (value) value = value[v];
//        });
//
//        if($(this).is("span")) { $(this).text(value); }
//        else if($(this).is("div")) { $(this).html(value); }
//        else if($(this).is("img")) { $(this).attr('src', value); }
//        else { $(this).val(value); }
//    });
//}