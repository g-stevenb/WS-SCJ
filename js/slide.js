/*==================================================
OBJETO CON LAS PROPIEDADES DEL SLIDE
==================================================*/
var p = {
    paginacion: document.querySelectorAll("#paginacion li"),
    item: 0,
    cajaSlide: document.querySelector("#slide ul"),
    animacionSlide: "slide",
    imgSlide: document.querySelectorAll("#slide ul li"),
    avanzar: document.querySelector("#slide #avanzar"),
    retroceder: document.querySelector("#slide #retroceder"),
    velocidadSlide: 2000,
    formatearLoop: false
}

console.log(document.querySelectorAll("#paginacion li"));


/*==================================================
OBJETO CON LOS METODOS DEL SLIDE
==================================================*/
var m = {
    inicioSlide: function() {
        for (var i = 0; i < p.paginacion.length; i++) {
            p.paginacion[i].addEventListener("click", m.paginacionSlide)
            p.imgSlide[i].style.width = (100 / p.paginacion.length) + "%"
        }

        p.avanzar.addEventListener("click", m.avanzarSlide)
        p.retroceder.addEventListener("click", m.retrocederSlide)

        m.intervaloSlide();
        p.cajaSlide.style.width = (p.paginacion.length * 100) + "%";
    },

    paginacionSlide: function(item) {
        p.item = item.target.parentNode.getAttribute("item") - 1;
        m.movimientoSlide(p.item);
    },

    avanzarSlide: function() {
        if (p.item == p.imgSlide.length - 1) {
            p.item = 0;
        } else {
            p.item++
        }
        // console.log(p.i/tem);
        m.movimientoSlide(p.item);
    },

    retrocederSlide: function() {
        if (p.item == 0) {
            p.item = p.imgSlide.length - 1;
        } else {
            p.item--
        }
        console.log(p.item);
        m.movimientoSlide(p.item);
    },

    movimientoSlide: function(item) {
        p.formatearLoop = true;
        p.cajaSlide.style.left = item * -100 + "%";
        for (var i = 0; i < p.paginacion.length; i++) {
            p.paginacion[i].style.opacity = .5;
        }
        p.paginacion[item].style.opacity = 1;

        if (p.animacionSlide == "slide") {
            p.cajaSlide.style.transition = ".7s left ease-in-out";
        }
        if (p.animacionSlide == "fade") {

            p.imgSlide[item].style.opacity = 0;
            p.imgSlide[item].style.transition = ".7s opacity ease-in-out";
            setTimeout(function() {
                p.imgSlide[item].style.opacity = 1;
            }, 500);
        }
        //console.log( item * -100+"%");

    },

    intervaloSlide: function() {
        setInterval(function() {
            if (p.formatearLoop) {
                p.formatearLoop = false;
            } else {
                m.avanzarSlide();
            }
        }, p.velocidadSlide)
    }
}


m.inicioSlide();