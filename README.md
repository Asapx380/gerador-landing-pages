# 🔥 Forja — Gerador de Sites com IA

Gerador de landing pages que transforma uma descrição de negócio em uma
página HTML/CSS completa, usando a API da [Groq](https://groq.com/)
(modelo `llama-3.3-70b-versatile`).

## Como funciona

1. Você descreve o seu negócio numa frase (ex: *"Cafeteria aconchegante no
   centro da cidade"*).
2. O front-end envia esse texto para uma **função serverless**
   (`netlify/functions/gerar.js`), que roda no servidor da Netlify.
3. Essa função chama a IA usando uma chave guardada como variável de
   ambiente — a chave nunca aparece no navegador nem no código-fonte.
4. A IA responde com HTML + CSS prontos, que aparecem lado a lado: o código
   gerado e a pré-visualização ao vivo (dentro de um `<iframe>`).

## Tecnologias

- HTML, CSS e JavaScript puros no front-end (sem frameworks)
- Netlify Functions (Node.js) como back-end, para esconder a chave de API
- API da Groq (compatível com a API da OpenAI)

## Estrutura do projeto

```
.
├── index.html
├── netlify.toml
├── css/
│   └── style.css
├── js/
│   └── scripts.js
└── netlify/
    └── functions/
        └── gerar.js       # roda no servidor — tem acesso à chave
```

## Como publicar (deploy)

1. Suba este repositório para o GitHub normalmente (`git push`).
2. Crie uma conta gratuita em [netlify.com](https://www.netlify.com/).
3. No painel da Netlify: **Add new site → Import an existing project** e
   escolha este repositório no GitHub.
4. A Netlify já vai detectar o `netlify.toml` e a pasta de functions
   sozinha — não precisa mexer em nada na configuração de build.
5. Antes (ou depois) do deploy, vá em **Site configuration → Environment
   variables** e adicione:
   - **Key**: `GROQ_API_KEY`
   - **Value**: sua chave da Groq (gerada em
     [console.groq.com/keys](https://console.groq.com/keys))
6. Clique em **Deploy site**. Pronto — o site fica no ar com a chave
   totalmente escondida do navegador.

## Rodar localmente (opcional)

Para testar no seu computador antes de publicar, instale a CLI da Netlify:

```bash
npm install -g netlify-cli
netlify dev
```

Na primeira vez, ela vai pedir para você linkar o site (ou rodar sem
linkar) e definir `GROQ_API_KEY` localmente — ela pergunta ou você pode
criar um arquivo `.env` com `GROQ_API_KEY=sua_chave` (esse arquivo já está
no `.gitignore`, então não vai para o Git)

## Sobre a segurança da chave

Diferente da primeira versão deste projeto (onde a chave ficava direto no
JavaScript do navegador), agora ela mora **só no servidor** — quem abrir o
"Inspecionar" do navegador não consegue mais vê-la.
