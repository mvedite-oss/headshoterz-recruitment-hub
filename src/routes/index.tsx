import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { atualizarStatus, listarPedidos, loginAdmin } from "@/lib/pedidos.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HEADSHOTERZ | Recrutamento Free Fire" },
      { name: "description", content: "Recrutamento oficial da guilda HEADSHOTERZ de Free Fire." },
      { property: "og:title", content: "HEADSHOTERZ | Recrutamento Free Fire" },
      { property: "og:description", content: "Entre para a guilda HEADSHOTERZ. Recrutamento aberto!" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

type Tela = "cadastro" | "confirmacao" | "login" | "painel";
type Status = "pendente" | "aceito" | "recusado";
type Pedido = {
  id: number;
  nome: string;
  id_jogo: string;
  telefone: string;
  funcao: string;
  status: string;
  criado_em: string;
};

function Cantos() {
  return (
    <>
      <span className="c tl" />
      <span className="c tr" />
      <span className="c bl" />
      <span className="c br" />
    </>
  );
}

function Index() {
  const [tela, setTela] = useState<Tela>("cadastro");
  const [senhaAdmin, setSenhaAdmin] = useState("");

  const ir = (t: Tela) => {
    setTela(t);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-glow" />
      <main className="hs-container">
        {tela === "cadastro" && <Cadastro onEnviado={() => ir("confirmacao")} onAdmin={() => ir("login")} />}
        {tela === "confirmacao" && <Confirmacao onVoltar={() => ir("cadastro")} />}
        {tela === "login" && (
          <Login
            onCancelar={() => ir("cadastro")}
            onOk={(s) => {
              setSenhaAdmin(s);
              ir("painel");
            }}
          />
        )}
        {tela === "painel" && (
          <Painel
            senha={senhaAdmin}
            onSair={() => {
              setSenhaAdmin("");
              ir("cadastro");
            }}
          />
        )}
      </main>
    </>
  );
}

function Cadastro({ onEnviado, onAdmin }: { onEnviado: () => void; onAdmin: () => void }) {
  const [nome, setNome] = useState("");
  const [idJogo, setIdJogo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [funcao, setFuncao] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !idJogo.trim() || !telefone.trim() || !funcao) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (!/^\d+$/.test(idJogo.trim())) {
      setErro("O ID do jogo deve conter apenas números.");
      return;
    }
    setErro("");
    setEnviando(true);
    const { error } = await supabase.from("pedidos").insert({
      nome: nome.trim().slice(0, 40),
      id_jogo: idJogo.trim().slice(0, 20),
      telefone: telefone.trim().slice(0, 25),
      funcao,
    });
    setEnviando(false);
    if (error) {
      setErro("Não foi possível enviar. Tente novamente.");
      return;
    }
    onEnviado();
  }

  return (
    <section className="tela ativa">
      <header className="hero">
        <svg className="crosshair" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="4" className="dot" />
          <line x1="50" y1="5" x2="50" y2="30" />
          <line x1="50" y1="70" x2="50" y2="95" />
          <line x1="5" y1="50" x2="30" y2="50" />
          <line x1="70" y1="50" x2="95" y2="50" />
        </svg>
        <h1 className="logo">HEADSHOTERZ</h1>
        <span className="pill">
          <span className="pulse" />
          RECRUTAMENTO ABERTO
        </span>
      </header>

      <div className="card hud">
        <Cantos />
        <form onSubmit={enviar} noValidate>
          <label className="campo">
            <span>Nome / Nick</span>
            <input type="text" maxLength={40} value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>
          <label className="campo">
            <span>ID do Jogo</span>
            <input type="number" inputMode="numeric" value={idJogo} onChange={(e) => setIdJogo(e.target.value)} />
          </label>
          <label className="campo">
            <span>Número de Telefone</span>
            <input type="tel" maxLength={25} value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </label>
          <label className="campo">
            <span>Função</span>
            <select value={funcao} onChange={(e) => setFuncao(e.target.value)}>
              <option value="" disabled hidden></option>
              <option value="Full Gas">Full Gas</option>
              <option value="Cura">Cura</option>
              <option value="Rush">Rush</option>
            </select>
          </label>
          <p className="erro">{erro}</p>
          <button type="submit" className="btn btn-primario" disabled={enviando}>
            {enviando ? "ENVIANDO..." : "ENVIAR PEDIDO"}
          </button>
        </form>
      </div>

      <footer className="rodape">
        <button className="link-admin" onClick={onAdmin}>
          ÁREA DO ADMIN
        </button>
      </footer>
    </section>
  );
}

function Confirmacao({ onVoltar }: { onVoltar: () => void }) {
  return (
    <section className="tela ativa">
      <div className="card hud centro">
        <Cantos />
        <svg className="check" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r="24" />
          <path d="M14 27 l8 8 l16 -17" />
        </svg>
        <h2 className="titulo">PEDIDO ENVIADO</h2>
        <p className="sub">Aguarde a análise do admin</p>
        <button className="btn btn-primario" onClick={onVoltar}>
          Voltar ao início
        </button>
      </div>
    </section>
  );
}

function Login({ onCancelar, onOk }: { onCancelar: () => void; onOk: (s: string) => void }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [shake, setShake] = useState(0);

  async function entrar(e: FormEvent) {
    e.preventDefault();
    try {
      await loginAdmin({ data: { senha } });
      onOk(senha);
    } catch {
      setErro("Senha incorreta.");
      setShake((n) => n + 1);
    }
  }

  return (
    <section className="tela ativa">
      <div key={shake} className={`card hud centro ${shake ? "shake" : ""}`}>
        <Cantos />
        <svg className="cadeado" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          <circle cx="12" cy="16" r="1.5" />
        </svg>
        <h2 className="titulo">LOGIN DO ADMIN</h2>
        <form onSubmit={entrar} noValidate>
          <label className="campo">
            <span>Senha</span>
            <input type="password" autoFocus value={senha} onChange={(e) => setSenha(e.target.value)} />
          </label>
          <p className="erro">{erro}</p>
          <button type="submit" className="btn btn-primario">ENTRAR</button>
          <button type="button" className="btn btn-secundario" onClick={onCancelar}>
            CANCELAR
          </button>
        </form>
      </div>
    </section>
  );
}

function Painel({ senha, onSair }: { senha: string; onSair: () => void }) {
  const [pedidos, setPedidos] = useState<Pedido[] | null>(null);
  const [filtro, setFiltro] = useState<"todos" | Status>("todos");
  const [erro, setErro] = useState("");

  if (pedidos === null && !erro) {
    listarPedidos({ data: { senha } })
      .then((r) => setPedidos(r as Pedido[]))
      .catch(() => setErro("Erro ao carregar pedidos."));
  }

  const lista = pedidos ?? [];
  const conta = (s: Status) => lista.filter((p) => p.status === s).length;
  const visiveis = filtro === "todos" ? lista : lista.filter((p) => p.status === filtro);

  async function mudar(id: number, status: "aceito" | "recusado") {
    const anterior = lista;
    setPedidos(lista.map((p) => (p.id === id ? { ...p, status } : p)));
    try {
      await atualizarStatus({ data: { senha, id, status } });
    } catch {
      setPedidos(anterior);
      alert("Não foi possível atualizar.");
    }
  }

  const filtros: { k: "todos" | Status; l: string }[] = [
    { k: "todos", l: "Todos" },
    { k: "pendente", l: "Pendentes" },
    { k: "aceito", l: "Aceitos" },
    { k: "recusado", l: "Recusados" },
  ];

  return (
    <section id="tela-painel" className="tela ativa">
      <header className="painel-header">
        <h2 className="titulo">Painel do Admin</h2>
        <span className="badge">👑 Lobão</span>
      </header>

      <div className="stats">
        <div className="stat total"><span>Total</span><strong>{lista.length}</strong></div>
        <div className="stat pendente"><span>Pendentes</span><strong>{conta("pendente")}</strong></div>
        <div className="stat aceito"><span>Aceitos</span><strong>{conta("aceito")}</strong></div>
        <div className="stat recusado"><span>Recusados</span><strong>{conta("recusado")}</strong></div>
      </div>

      <div className="filtros">
        {filtros.map((f) => (
          <button key={f.k} className={`filtro ${filtro === f.k ? "ativo" : ""}`} onClick={() => setFiltro(f.k)}>
            {f.l}
          </button>
        ))}
      </div>

      <ul className="lista">
        {pedidos === null && !erro && <li className="vazio">Carregando...</li>}
        {erro && <li className="vazio">{erro}</li>}
        {pedidos !== null && visiveis.length === 0 && <li className="vazio">Nenhum pedido encontrado.</li>}
        {visiveis.map((p) => (
          <li key={p.id} className="pedido">
            <div className="pedido-topo">
              <span className="pedido-nome">{p.nome}</span>
              <span className={`tag ${p.status}`}>{p.status}</span>
            </div>
            <dl className="info">
              <dt>ID do Jogo</dt><dd>{p.id_jogo}</dd>
              <dt>Telefone</dt><dd>{p.telefone}</dd>
              <dt>Função</dt><dd>{p.funcao}</dd>
            </dl>
            <div className="acoes">
              <button className={`acao aceitar ${p.status === "aceito" ? "atual" : ""}`} onClick={() => mudar(p.id, "aceito")}>
                Aceitar
              </button>
              <button className={`acao recusar ${p.status === "recusado" ? "atual" : ""}`} onClick={() => mudar(p.id, "recusado")}>
                Recusar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button className="btn btn-secundario" onClick={onSair}>Sair do Painel</button>
    </section>
  );
}
