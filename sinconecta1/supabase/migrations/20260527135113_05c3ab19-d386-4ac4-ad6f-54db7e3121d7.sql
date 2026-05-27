
CREATE OR REPLACE FUNCTION public.admin_list_professionals()
RETURNS TABLE(id uuid, nome_completo text, cpf_cft text, whatsapp text, cep text, especialidades text[], status_validacao text, created_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT id, nome_completo, cpf_cft, whatsapp, cep, especialidades, status_validacao, created_at
  FROM public.profissionais
  ORDER BY created_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.admin_list_clients()
RETURNS TABLE(id uuid, nome text, whatsapp text, cep text, recorrente boolean, created_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT id, nome, whatsapp, cep, recorrente, created_at
  FROM public.clientes
  ORDER BY created_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.admin_list_clicks()
RETURNS TABLE(profissional_id uuid, created_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT profissional_id, created_at FROM public.whatsapp_clicks;
$$;

CREATE OR REPLACE FUNCTION public.admin_set_status(_id uuid, _status text)
RETURNS void
LANGUAGE sql VOLATILE SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.profissionais SET status_validacao = _status WHERE id = _id;
$$;

GRANT EXECUTE ON FUNCTION public.admin_list_professionals() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_clients() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_clicks() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_set_status(uuid, text) TO anon, authenticated;
