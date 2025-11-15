(function(){
    "use strict";
    let forms=document.querySelectorAll(".needs-validation");
    for(let i=0;i<forms.length;i++){
        forms[i].addEventListener("submit",function(event){
          if(!this.checkValidity()){
             event.preventDefault();
             event.stopPropagation();
          }
          this.classList.add("was-validated")
        });
    }
})();