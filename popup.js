function click(array){
    chrome.tabs.query({currentWindow: true, active:true},
        function(tabArray){
            chrome.tabs.sendMessage(tabArray[0].id,{scriptOptions: {param1: array}}, function(){
            });
        }
    );
}

document.addEventListener('DOMContentLoaded', function(){
    var helpBtn = document.getElementById('helpBtn');
    var findBtn = document.getElementById('findBtn');
    var helpBtnIcons = document.getElementById('helpBtnIcons');   
    var main = document.getElementById('main');
    var help = document.getElementById('help');

    chrome.tabs.query({currentWindow: true, active:true},
        function(tabArray){
            chrome.tabs.executeScript(tabArray[0].id, {file: "main.js"}, function(){
                //script injected
            });
        }
    );

    findBtn.addEventListener('click', function(){
        var caseArray = document.getElementById('caseNumbers').value.split(/\n/);
        click(caseArray);
    });

    helpBtn.addEventListener('click', function(){
        findBtn.classList.toggle('hide');
        main.classList.toggle('hide');
        help.classList.toggle('hide');
        if(helpBtnIcons.classList.contains('fa-question')){
            helpBtnIcons.classList.toggle('fa-question');
            helpBtnIcons.classList.toggle('fa-times');
            helpBtn.firstChild.textContent = "Close ";
        } else if(helpBtnIcons.classList.contains('fa-times')) {
            helpBtnIcons.classList.toggle('fa-times');
            helpBtnIcons.classList.toggle('fa-question');
            helpBtn.firstChild.textContent = "Help ";

        }
    });
});


/*
* Old broken code. main.js was injected each time button was clicked
* I'm leaving here to learn from
*
chrome.tabs.executeScript(tabArray[0].id, {file: "main.js"}, function(){
                chrome.tabs.sendMessage(tabArray[0].id,{scriptOptions: {param1: array}}, function(){
                    //all injected
                });
            });
*
*
*/