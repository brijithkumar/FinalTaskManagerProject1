

var webGlObject = (function() { 
    return { 
      init: function() {
        elements = document.getElementsByClassName('autocomplete'); 
        for (var i = 0; i < elements.length; i++) {
         elements[i].getElementsByTagName('input')[0].style.width="492px";
         elements[i].getElementsByTagName('input')[0].className="parenttask-input-style"

      }
      
      } 
    } 
})(webGlObject||{})

