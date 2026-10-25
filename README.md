# Headshoterz Recruitment Hub

Faz um site que tem.  Crie um site completo e responsivo para recrutamento de uma guilda de Free Fire chamada "HEADSHOTERZ", dividido estritamente em 4 arquivos separados: app.py, index.html, style.css e script.js.



⚙️ REQUISITOS TÉCNICOS E ARQUITETURA:

- Backend: Python + Flask (app.py)

- Banco de dados: SQLite (criar automaticamente o arquivo headshoterz.db)

- Tabela "pedidos" com as colunas: id, nome, id_jogo, telefone, funcao, status, criado_em (status padrão: 'pendente')

- API REST no Flask:

  • POST /api/pedidos -> criar novo pedido (salvando nome, id_jogo, telefone e funcao)

  • GET /api/pedidos -> listar todos os pedidos

  • PATCH /api/pedidos/<id> -> atualizar o status para 'aceito' ou 'recusado'

  • POST /api/login -> validar a senha do admin ('lobao123')

- Frontend separado (sem HTML embutido no Python): index.html, style.css, script.js

- Responsivo mobile-first com fontes do Google Fonts (Orbitron para títulos e Rajdhani para o corpo).



🎨 DESIGN / VISUAL (Dark Mode Gamer / HUD de FPS):

- Fundo: preto profundo (#050505) com grid vermelho sutil e efeito glow radial vermelho pulsante no topo.

- Título "HEADSHOTERZ" em destaque com fonte Orbitron 900, cor vermelha (#ff1e1e) e text-shadow com glow, acompanhado de uma mira SVG (crosshair) rotativa no topo.

- Cards com cantos de HUD (⊞ vermelhos), borda com gradiente e glassmorphism.

- Inputs limpos e modernos (sem textos de exemplo poluindo), botões grandes (min-height 50px) com efeito de brilho.



📱 TELAS DA APLICAÇÃO (gerenciadas por JavaScript via Fetch API):

1) TELA DE CADASTRO (Pública):

   - Título "HEADSHOTERZ" com glow + pill verde "RECRUTAMENTO ABERTO" com ponto pulsante.

   - Campos do formulário:

     • Nome / Nick (texto, obrigatório)

     • ID do Jogo (número, obrigatório)

     • Número de Telefone (WhatsApp/contato, obrigatório)

     • Função (select com as opções exatas: Full Gas, Cura, Rush)

   - Botão "ENVIAR PEDIDO"

   - Link discreto no rodapé: "ÁREA DO ADMIN"



2) TELA DE CONFIRMAÇÃO:

   - Ícone de check verde animado, título "PEDIDO ENVIADO", texto "Aguarde a análise do admin" e botão "Voltar ao início".



3) TELA DE LOGIN DO ADMIN:

   - Ícone de cadeado, título "LOGIN DO ADMIN", campo de senha, botões "ENTRAR" e "CANCELAR".

   - Animação de shake caso a senha esteja errada. Senha correta: "lobao123".



4) PAINEL DO ADMIN (Após login):

   - Header "Painel do Admin" com badge "👑 Lobão".

   - 4 cards de estatística (Total, Pendentes, Aceitos, Recusados) com faixas coloridas nas bordas.

   - Botões de filtro: Todos | Pendentes | Aceitos | Recusados.

   - Lista detalhada mostrando o Nome, ID do Jogo, Telefone e a Função escolhida.

   - Cada pedido na lista possui diretamente dois botões: "Aceitar" (verde) e "Recusar" (vermelho) que mudam o status instantaneamente no banco de dados via API PATCH.

   - Botão "Sair do Painel".



Por favor, forneça o código completo e limpo dos 4 arquivos (app.py, index.h

tml, style.css e script.js) pronto para rodar.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/734a6380-95b9-4c7f-bfbe-e093271af5c6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
