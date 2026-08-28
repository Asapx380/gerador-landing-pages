# ⚡ Forja — Gerador de Landing Pages com IA

> **Do briefing ao primeiro rascunho em segundos.**  
Gere landing pages prontas (HTML + CSS) a partir de uma breve descrição do negócio usando a API da [Groq](https://groq.com/) (modelo `openai/gpt-oss-120b`).

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](#)

 **[Acesse a versão ao vivo do Forja](https://forjaai.netlify.app/)**

---

##  Funcionalidades

-  **Geração Ultrarrápida**: Respostas em segundos utilizando a infraestrutura da Groq Cloud.
-  **Prévia ao Vivo**: Visualize o site gerado e edite o código HTML/CSS lado a lado.
-  **Cópia em 1 Clique**: Exporte o código gerado facilmente.
-  **Segurança Total**: Sua chave de API protegida em ambiente Serverless.

---

##  Como funciona

1. O usuário descreve a ideia do negócio e o público-alvo no formulário.
2. O front-end envia a requisição para a Netlify Function (`netlify/functions/gerar.js`).
3. A função chama a API da Groq com a chave armazenada de forma segura em variáveis de ambiente.
4. O HTML e CSS gerados são renderizados dinamicamente na prévia ao vivo.

---

##  Estrutura do Projeto

```text
.
├── index.html              # Interface do gerador
├── netlify.toml            # Configuração de build da Netlify
├── css/
│   └── style.css           # Estilos e temas (Dark Mode / Glassmorphism)
├── js/
│   └── scripts.js          # Lógica do front-end e interações
└── netlify/
    └── functions/
        └── gerar.js        # Serverless function com integração da Groq API
