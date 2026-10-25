CREATE TABLE public.pedidos (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL CHECK (char_length(nome) BETWEEN 1 AND 40),
  id_jogo TEXT NOT NULL CHECK (id_jogo ~ '^[0-9]{1,20}$'),
  telefone TEXT NOT NULL CHECK (char_length(telefone) BETWEEN 1 AND 25),
  funcao TEXT NOT NULL CHECK (funcao IN ('Full Gas','Cura','Rush')),
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','aceito','recusado')),
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.pedidos TO anon, authenticated;
GRANT USAGE ON SEQUENCE public.pedidos_id_seq TO anon, authenticated;
GRANT ALL ON public.pedidos TO service_role;
GRANT ALL ON SEQUENCE public.pedidos_id_seq TO service_role;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Qualquer um envia pedido pendente" ON public.pedidos
  FOR INSERT TO anon, authenticated WITH CHECK (status = 'pendente');