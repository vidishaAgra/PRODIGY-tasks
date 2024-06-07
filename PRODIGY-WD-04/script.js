function fixedimage(){
    var elem=document.querySelector(".elem-container")
    var fixed=document.querySelector(".fixed-image")
    elem.addEventListener("mouseenter",function(){
        fixed.style.display="block"
    })
    elem.addEventListener("mouseleave",function(){
        fixed.style.display="none"
    })

    var elems=document.querySelectorAll(".elem")
    elems.forEach(function(e){
        e.addEventListener("mouseenter",function(){
            var image=e.getAttribute("data-image")
            fixed.style.backgroundImage=`url(${image})`
        })
    })
}

fixedimage()