document.addEventListener("DOMContentLoaded", function () {
    const carrossel = document.querySelector(".carrossel");

    if (!carrossel) return;

    const slides = carrossel.querySelectorAll(".slide");
    const indicadores = carrossel.querySelectorAll(".indicador");
    const anterior = carrossel.querySelector(".anterior");
    const proximo = carrossel.querySelector(".proximo");

    let atual = 0;
    let temporizador;

    function mostrarSlide(indice) {
        atual = (indice + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            slide.classList.toggle("ativo", i === atual);
        });

        indicadores.forEach(function (indicador, i) {
            indicador.classList.toggle("ativo", i === atual);
            indicador.setAttribute(
                "aria-current",
                i === atual ? "true" : "false"
            );
        });
    }

    function reiniciarTemporizador() {
        clearInterval(temporizador);

        temporizador = setInterval(function () {
            mostrarSlide(atual + 1);
        }, 5000);
    }

    anterior.addEventListener("click", function () {
        mostrarSlide(atual - 1);
        reiniciarTemporizador();
    });

    proximo.addEventListener("click", function () {
        mostrarSlide(atual + 1);
        reiniciarTemporizador();
    });

    indicadores.forEach(function (indicador, i) {
        indicador.addEventListener("click", function () {
            mostrarSlide(i);
            reiniciarTemporizador();
        });
    });

    mostrarSlide(0);
    reiniciarTemporizador();
});