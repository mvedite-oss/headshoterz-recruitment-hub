import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const senhaSchema = z.object({ senha: z.string().max(100) });

function verificarSenha(senha: string) {
  const correta = process.env.ADMIN_PASSWORD || "lobao123";
  if (senha !== correta) throw new Error("Senha incorreta.");
}

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => senhaSchema.parse(d))
  .handler(async ({ data }) => {
    verificarSenha(data.senha);
    return { ok: true };
  });

export const listarPedidos = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => senhaSchema.parse(d))
  .handler(async ({ data }) => {
    verificarSenha(data.senha);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("pedidos")
      .select("*")
      .order("id", { ascending: false });
    if (error) throw new Error(error.message);
    return rows;
  });

export const atualizarStatus = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    senhaSchema
      .extend({ id: z.number().int().positive(), status: z.enum(["aceito", "recusado"]) })
      .parse(d),
  )
  .handler(async ({ data }) => {
    verificarSenha(data.senha);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("pedidos")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
