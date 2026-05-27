
-- Drop overly permissive policies on clientes
DROP POLICY IF EXISTS "Anyone can read clientes" ON public.clientes;

-- Drop overly permissive policies on profissionais
DROP POLICY IF EXISTS "Anyone can read profissionais" ON public.profissionais;
DROP POLICY IF EXISTS "Anyone can update profissionais" ON public.profissionais;

-- Drop overly permissive read on whatsapp_clicks (analytics aggregation goes through admin function)
DROP POLICY IF EXISTS "Anyone can read whatsapp clicks" ON public.whatsapp_clicks;

-- Safe public search: returns only non-sensitive fields for VERIFIED technicians
CREATE OR REPLACE FUNCTION public.search_verified_professionals(
  cep_prefix text,
  especialidade text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  nome_completo text,
  whatsapp text,
  cep text,
  especialidades text[]
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.nome_completo, p.whatsapp, p.cep, p.especialidades
  FROM public.profissionais p
  WHERE p.status_validacao = 'verificado'
    AND p.cep IS NOT NULL
    AND regexp_replace(p.cep, '\D', '', 'g') LIKE (cep_prefix || '%')
    AND (especialidade IS NULL OR especialidade = ANY(p.especialidades));
$$;

GRANT EXECUTE ON FUNCTION public.search_verified_professionals(text, text) TO anon, authenticated;

-- Existence check for duplicate registration (returns only minimal info)
CREATE OR REPLACE FUNCTION public.check_professional_exists(_cpf_cft text)
RETURNS TABLE (exists_flag boolean, status text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT TRUE, p.status_validacao
  FROM public.profissionais p
  WHERE lower(p.cpf_cft) = lower(_cpf_cft)
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.check_professional_exists(text) TO anon, authenticated;
