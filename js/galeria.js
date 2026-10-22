
document.addEventListener('DOMContentLoaded', () => {
    const itens = Array.from(
        document.querySelectorAll('.galeria-historica .galeria-item')
    );

    const modal = document.getElementById('galeria-modal');
    const imagemAmpliada = document.getElementById(
        'galeria-imagem-ampliada'
    );
    const tituloAmpliado = document.getElementById(
        'galeria-titulo-ampliado'
    );
    const descricaoAmpliada = document.getElementById(
        'galeria-descricao-ampliada'
    );
    const contador = document.getElementById('galeria-contador');

    if (!itens.length || !modal || !imagemAmpliada) return;

    const botaoFechar = modal.querySelector('.galeria-fechar');
    const botaoVoltar = modal.querySelector('.galeria-voltar');
    const botaoAvancar = modal.querySelector('.galeria-avancar');

    let indiceAtual = 0;
    let ultimoFoco = null;

    function mostrarImagem(indice) {
        indiceAtual = (indice + itens.length) % itens.length;

        const item = itens[indiceAtual];
        const miniatura = item.querySelector('img');

        imagemAmpliada.src = item.dataset.imagem || miniatura.src;
        imagemAmpliada.alt = miniatura.alt || '';

        tituloAmpliado.textContent =
            item.dataset.titulo || miniatura.alt || '';

        descricaoAmpliada.textContent =
            item.dataset.descricao || '';

        contador.textContent =
            `${indiceAtual + 1} de ${itens.length}`;
    }

    function abrirGaleria(indice) {
        ultimoFoco = document.activeElement;

        mostrarImagem(indice);

        modal.classList.add('aberta');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('galeria-modal-aberta');

        botaoFechar.focus();
    }

    function fecharGaleria() {
        modal.classList.remove('aberta');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('galeria-modal-aberta');

        imagemAmpliada.removeAttribute('src');

        if (ultimoFoco) {
            ultimoFoco.focus();
        }
    }

    itens.forEach((item, indice) => {
        item.addEventListener('click', () => abrirGaleria(indice));
    });

    botaoFechar.addEventListener('click', fecharGaleria);

    botaoVoltar.addEventListener('click', () => {
        mostrarImagem(indiceAtual - 1);
    });

    botaoAvancar.addEventListener('click', () => {
        mostrarImagem(indiceAtual + 1);
    });

    modal.addEventListener('click', (evento) => {
        if (evento.target === modal) {
            fecharGaleria();
        }
    });

    document.addEventListener('keydown', (evento) => {
        if (!modal.classList.contains('aberta')) return;

        if (evento.key === 'Escape') {
            fecharGaleria();
        }

        if (evento.key === 'ArrowLeft') {
            mostrarImagem(indiceAtual - 1);
        }

        if (evento.key === 'ArrowRight') {
            mostrarImagem(indiceAtual + 1);
        }
    });
});
