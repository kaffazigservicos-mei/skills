CREATE TABLE public.whatsapp_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profissional_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_whatsapp_clicks_profissional ON public.whatsapp_clicks(profissional_id);
CREATE INDEX idx_whatsapp_clicks_created_at ON public.whatsapp_clicks(created_at);

GRANT SELECT, INSERT ON public.whatsapp_clicks TO anon;
GRANT SELECT, INSERT ON public.whatsapp_clicks TO authenticated;
GRANT ALL ON public.whatsapp_clicks TO service_role;

ALTER TABLE public.whatsapp_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert whatsapp clicks"
ON public.whatsapp_clicks
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can read whatsapp clicks"
ON public.whatsapp_clicks
FOR SELECT
TO public
USING (true);