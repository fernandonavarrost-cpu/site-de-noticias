# Sobre o Projeto

## Contexto

Este é um projeto pessoal de estudo focado em construir um site de notícias **responsivo e simples**, utilizando apenas HTML, CSS e JavaScript puro — sem frameworks, bibliotecas externas ou ferramentas de build. A ideia é praticar os fundamentos da web e entender como tecnologias nativas resolvem problemas reais de layout e interatividade.

## Filosofia Técnica

- **Zero dependências**: todo o comportamento e estilo vêm de código escrito manualmente
- **Código auto-contido**: cada página `.html` carrega seu próprio CSS via `<link>` e seu próprio JS via `<script>` inline
- **Simplicidade acima de tudo**: sem bundlers, transpiladores, pré-processadores ou task runners
- **Foco em responsividade real**: o layout se adapta a qualquer tamanho de tela usando apenas CSS

## Estrutura de Páginas

### `home.html` — Página Inicial

A landing page do site. As notícias são organizadas por categorias dentro de seções `.noticia-card`, cada uma contendo um título de categoria e artigos `.card`:

- **Economia & Negócios** — notícias sobre startups, mercado de trabalho e tendências econômicas
- **Esportes** — cobertura de futebol feminino, NBA e outros eventos esportivos

Layout usa `inline-block` para dispor as seções lado a lado (duas colunas) em telas grandes.

### `noticiarecente.html` — Notícias Recentes

Página que exibe os artigos mais recentes publicados. Utiliza flexbox via `.recent-news` para centralizar os cards com espaçamento uniforme. As notícias cobrem temas variados como tecnologia, astronomia e comportamento digital.

### `contato.html` — Contato e Redes Sociais

Página institucional com três seções:

- **Contato** — e-mail para comunicação
- **Redes Sociais** — links para Facebook, Twitter e Instagram com cards estilizados e ícones coloridos
- **Endereço** — localização física simulada

Os cards de redes sociais têm efeito hover com transição suave (`transform`, `box-shadow`, `background-color`).

## Design e Responsividade

### Abordagem CSS

| Técnica | Uso |
|---|---|
| `font-size: 62.5%` no `:root` | Baseline de `1rem = 10px`, facilitando cálculos de tamanho |
| `rem` para fontes e espaçamentos | Unidades relativas que escalam com a preferência do usuário |
| Flexbox | Navegação (desktop), cards, ícones de redes sociais |
| `inline-block` | Layout de duas colunas na home |
| Media queries | Responsividade com breakpoint em `768px` |

### Comportamento Mobile (< 768px)

- O menu de navegação horizontal desaparece e é substituído por um **botão hamburguer** (☰)
- Os links de navegação empilham verticalmente
- As seções de notícias da home passam de duas colunas para coluna única
- Cards ocupam 100% da largura disponível

## JavaScript — Menu Mobile

Cada página contém um script inline que implementa o toggle do menu:

```javascript
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-navigation');
if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
}
```

O CSS controla a visibilidade: `nav` tem `display: none` e `nav.open` tem `display: flex` apenas no breakpoint mobile.

## Acessibilidade

- **HTML semântico**: estrutura com `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` e `<footer>`
- **Atributos ARIA no menu**: `aria-expanded` indica estado do menu, `aria-controls` vincula o botão à navegação, `aria-label` fornece descrição acessível
- **Ícones decorativos**: elementos com `aria-hidden="true"` para evitar redundância em leitores de tela
- **Hierarquia de headings**: uso consistente de `<h1>`, `<h2>`, `<h3>` em ordem lógica

## Possíveis Evoluções

- Extrair o JavaScript duplicado para um arquivo `.js` externo compartilhado
- Adicionar mais categorias de notícias (Tecnologia, Cultura, Saúde)
- Implementar busca textual e filtro por categoria
- Migrar o conteúdo para dados estruturados (JSON) e gerar páginas dinamicamente
- Utilizar um gerador de site estático (SSG) como Eleventy ou Hugo
- Melhorar contraste e legibilidade com um estudo de paleta de cores
