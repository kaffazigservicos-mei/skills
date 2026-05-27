
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS recorrente boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.register_client_lead(_nome text, _whatsapp text, _cep text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _digits text;
  _recurrent boolean := false;
BEGIN
  _digits := regexp_replace(coalesce(_whatsapp, ''), '\D', '', 'g');
  IF length(_digits) > 0 THEN
    SELECT EXISTS(
      SELECT 1 FROM public.clientes
      WHERE regexp_replace(coalesce(whatsapp,''), '\D', '', 'g') = _digits
    ) INTO _recurrent;
  END IF;
  INSERT INTO public.clientes(nome, whatsapp, cep, recorrente)
  VALUES (_nome, _whatsapp, _cep, _recurrent);
  RETURN _recurrent;
END;
$$;

GRANT EXECUTE ON FUNCTION public.register_client_lead(text, text, text) TO anon, authenticated;
