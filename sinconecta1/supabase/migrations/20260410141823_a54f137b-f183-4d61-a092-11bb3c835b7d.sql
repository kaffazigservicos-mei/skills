
-- Create clientes table
CREATE TABLE public.clientes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  whatsapp TEXT,
  cep TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read clientes" ON public.clientes FOR SELECT USING (true);
CREATE POLICY "Anyone can insert clientes" ON public.clientes FOR INSERT WITH CHECK (true);

-- Create profissionais table
CREATE TABLE public.profissionais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_completo TEXT NOT NULL,
  cpf_cft TEXT NOT NULL UNIQUE,
  whatsapp TEXT,
  cep TEXT,
  especialidades TEXT[],
  status_validacao TEXT NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profissionais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read profissionais" ON public.profissionais FOR SELECT USING (true);
CREATE POLICY "Anyone can insert profissionais" ON public.profissionais FOR INSERT WITH CHECK (true);
