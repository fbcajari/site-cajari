
document.addEventListener("DOMContentLoaded", function () {
    const carrossel = document.querySelector(".lenda");

    if (!carrossel) return;

    const slides = carrossel.querySelectorAll(".slide");
    const indicadores = carrossel.querySelectorAll(".indicador");
    const anterior = carrossel.querySelector(".anterior");
    const proximo = carrossel.querySelector(".proximo");

    // Verifica se existem imagens para exibir.
    if (slides.length === 0) return;

    let atual = 0;
    let temporizador = null;

    function mostrarSlide(indice) {
        atual = (indice + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            slide.classList.toggle("ativo", i === atual);
            slide.setAttribute("aria-hidden", i === atual ? "false" : "true");
        });

        indicadores.forEach(function (indicador, i) {
            const selecionado = i === atual;

            indicador.classList.toggle("ativo", selecionado);

            if (selecionado) {
                indicador.setAttribute("aria-current", "true");
            } else {
                indicador.removeAttribute("aria-current");
            }
        });
    }

    function reiniciarTemporizador() {
        clearInterval(temporizador);

        temporizador = setInterval(function () {
            mostrarSlide(atual + 1);
        }, 5000);
    }

    // Navegação para a imagem anterior.
    if (anterior) {
        anterior.addEventListener("click", function () {
            mostrarSlide(atual - 1);
            reiniciarTemporizador();
        });
    }

    // Navegação para a próxima imagem.
    if (proximo) {
        proximo.addEventListener("click", function () {
            mostrarSlide(atual + 1);
            reiniciarTemporizador();
        });
    }

    // Navegação direta pelos indicadores.
    indicadores.forEach(function (indicador, i) {
        indicador.addEventListener("click", function () {
            mostrarSlide(i);
            reiniciarTemporizador();
        });
    });

    // Pausa a troca automática enquanto o mouse estiver sobre a galeria.
    carrossel.addEventListener("mouseenter", function () {
        clearInterval(temporizador);
    });

    carrossel.addEventListener("mouseleave", function () {
        reiniciarTemporizador();
    });

    // Inicializa a galeria.
    mostrarSlide(0);
    reiniciarTemporizador();
});
