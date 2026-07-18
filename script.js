(function () {
  'use strict';

  var nomesCategorias = {
    economia: 'Economia & Negócios',
    esportes: 'Esportes',
    tecnologia: 'Tecnologia',
    cultura: 'Cultura',
    saude: 'Saúde'
  };

  function initMenu() {
    var menuToggle = document.querySelector('.menu-toggle');
    var siteNav = document.getElementById('site-navigation');
    if (menuToggle && siteNav) {
      menuToggle.addEventListener('click', function () {
        var isOpen = siteNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
      });
    }
  }

  function carregarNoticias() {
    var el = document.getElementById('dados-noticias');
    if (!el) return [];
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      return [];
    }
  }

  function formatarData(dataStr) {
    var partes = dataStr.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
  }

  function renderizarCards(artigos) {
    var html = '';
    artigos.forEach(function (a) {
      html += '<article class="card">' +
        '<span class="categoria-tag">' + (nomesCategorias[a.categoria] || a.categoria) + '</span>' +
        '<h3>' + a.titulo + '</h3>' +
        '<p>' + a.resumo + '</p>' +
        '<time datetime="' + a.data + '">' + formatarData(a.data) + '</time>' +
        '</article>';
    });
    return html;
  }

  function renderizarHome(noticiasFiltradas) {
    var container = document.getElementById('conteudo-noticias');
    if (!container) return;

    var noticias = noticiasFiltradas || carregarNoticias();
    if (!noticias.length) {
      container.innerHTML = '<p class="sem-resultados">Nenhuma notícia encontrada.</p>';
      return;
    }

    var grupos = {};
    noticias.forEach(function (n) {
      if (!grupos[n.categoria]) grupos[n.categoria] = [];
      grupos[n.categoria].push(n);
    });

    var html = '';
    for (var cat in grupos) {
      if (!grupos.hasOwnProperty(cat)) continue;
      html += '<section class="noticia-card">' +
        '<h2>' + (nomesCategorias[cat] || cat) + '</h2>' +
        renderizarCards(grupos[cat]) +
        '</section>';
    }
    container.innerHTML = html;
  }

  function renderizarRecentes() {
    var container = document.getElementById('conteudo-recentes');
    if (!container) return;

    var noticias = carregarNoticias();
    var ordenadas = noticias.slice().sort(function (a, b) {
      return new Date(b.data) - new Date(a.data);
    });

    if (!ordenadas.length) {
      container.innerHTML = '<p class="sem-resultados">Nenhuma notícia encontrada.</p>';
      return;
    }

    container.innerHTML = renderizarCards(ordenadas);
  }

  function filtrarNoticias(noticias, termo, categoria) {
    var resultado = noticias;

    if (categoria && categoria !== 'todas') {
      resultado = resultado.filter(function (n) {
        return n.categoria === categoria;
      });
    }

    if (termo) {
      var t = termo.toLowerCase();
      resultado = resultado.filter(function (n) {
        return n.titulo.toLowerCase().indexOf(t) !== -1 ||
               n.resumo.toLowerCase().indexOf(t) !== -1;
      });
    }

    return resultado;
  }

  function initFiltros() {
    var busca = document.getElementById('busca');
    var filtroCategoria = document.getElementById('filtro-categoria');
    if (!busca && !filtroCategoria) return;

    var todasNoticias = carregarNoticias();

    function aplicarFiltro() {
      var termo = busca ? busca.value : '';
      var categoria = filtroCategoria ? filtroCategoria.value : 'todas';
      var resultado = filtrarNoticias(todasNoticias, termo, categoria);
      renderizarHome(resultado);
    }

    if (busca) busca.addEventListener('input', aplicarFiltro);
    if (filtroCategoria) filtroCategoria.addEventListener('change', aplicarFiltro);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMenu();
    renderizarHome();
    renderizarRecentes();
    initFiltros();
  });
})();
