//script injected through manifest.json
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){

    var scriptOptions = message.scriptOptions.param1;
    var block = document.getElementById('ext-gen12').childNodes;
    var eventNames = ['mousedown','mouseup','click'];
    
    function fireMouseEvents(id, eventNames){
        var element = document.getElementById(id);
        if(element && eventNames && eventNames.length){
            for(var index in eventNames){
                var eventName = eventNames[index];
                if(element.fireEvent){
                    element.fireEvent('on' + eventName);     
                } else {   
                    var eventObject = document.createEvent('MouseEvents');
                    eventObject.initEvent(eventName, true, false);
                    element.dispatchEvent(eventObject);
                }
            }
        }
    }
    
    for(var i = 0; i < scriptOptions.length; i++){ //cases in case array
        for(var j = 0; j < block.length; j++){ //items in block childNodes
            if(block[j].childNodes[0].childNodes[0].childNodes[0].childNodes[3].childNodes[0].childNodes[0].text == scriptOptions[i]){
                fireMouseEvents(block[j].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].id.substring(0,15), eventNames);
                delete block[j];
            }
        }
    }
});

