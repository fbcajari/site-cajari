
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    const menu = navbar.querySelector("#menu-principal");
    const botaoMenu = navbar.querySelector(".menu-toggle");
    const botoesSubmenu = navbar.querySelectorAll(".submenu-toggle");

    function fecharSubmenus(excecao = null) {
        navbar.querySelectorAll(".menu-item.aberto").forEach(function (item) {
            if (item === excecao) return;

            item.classList.remove("aberto");

            const botao = item.querySelector(".submenu-toggle");
            if (botao) {
                botao.setAttribute("aria-expanded", "false");
            }
        });
    }

    function fecharMenu() {
        menu.classList.remove("menu-aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");

        fecharSubmenus();
    }

    botaoMenu.addEventListener("click", function () {
        const aberto = menu.classList.toggle("menu-aberto");

        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );

        if (!aberto) {
            fecharSubmenus();
        }
    });

    botoesSubmenu.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const item = botao.closest(".menu-item");
            const vaiAbrir = !item.classList.contains("aberto");

            fecharSubmenus(item);

            item.classList.toggle("aberto", vaiAbrir);
            botao.setAttribute("aria-expanded", String(vaiAbrir));
        });
    });

    // Fecha ao clicar fora da navbar
    document.addEventListener("click", function (evento) {
        if (!navbar.contains(evento.target)) {
            fecharSubmenus();

            if (window.innerWidth <= 700) {
                fecharMenu();
            }
        }
    });

    // Fecha com Escape
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            fecharMenu();
            botaoMenu.focus();
        }
    });

    // Fecha o menu móvel ao escolher um link
    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 700) {
                fecharMenu();
            }
        });
    });

    // Ao mudar de celular para desktop, limpa o estado móvel
    window.addEventListener("resize", function () {
        if (window.innerWidth > 700) {
            menu.classList.remove("menu-aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
        }
    });
});
