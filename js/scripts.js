const form = document.querySelector("#generator-form");
const textarea = document.querySelector(".texto-pagina");
const button = form.querySelector("button");
const message = document.querySelector(".form-message");
const workspace = document.querySelector(".workspace");
const emptyState = document.querySelector(".empty-state");
const resultGrid = document.querySelector(".result-grid");
const codeElement = document.querySelector(".bloco-codigo code");
const preview = document.querySelector(".bloco-site");
const copyButton = document.querySelector(".copy-button");
const promptChips = document.querySelectorAll(".prompt-chip");

let requisicaoEmAndamento = null;

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("is-error", isError);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (requisicaoEmAndamento) return;

  const texto = textarea.value.trim();

  if (!texto) {
    showMessage("Descreva sua ideia antes de gerar a página.", true);
    textarea.focus();
    return;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 25000);
  requisicaoEmAndamento = controller;

  const labelOriginal = button.textContent;
  button.textContent = "Gerando página...";
  button.disabled = true;
  button.classList.add("is-loading");
  showMessage("Montando o primeiro rascunho.");

  try {
    const resposta = await fetch("/.netlify/functions/gerar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto }),
      signal: controller.signal
    });
    const dados = await resposta.json();

    if (!resposta.ok || !dados.resultado) throw new Error(dados.erro || "Falha ao gerar");

    codeElement.textContent = dados.resultado;
    preview.srcdoc = dados.resultado;
    emptyState.hidden = true;
    resultGrid.hidden = false;
    workspace.classList.remove("is-empty");
    copyButton.disabled = false;
    showMessage("Rascunho pronto. Revise o conteúdo antes de publicar.");
  } catch (erro) {
    const mensagem = erro && erro.name === "AbortError"
      ? "O gerador demorou demais para responder. Tente novamente."
      : (erro && erro.message) || "Não foi possível gerar a página agora. Tente novamente em instantes.";
    showMessage(mensagem, true);
  } finally {
    window.clearTimeout(timeoutId);
    requisicaoEmAndamento = null;
    button.textContent = labelOriginal;
    button.disabled = false;
    button.classList.remove("is-loading");
  }
});

promptChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    textarea.value = chip.dataset.example;
    showMessage("Exemplo adicionado. Ajuste os detalhes para deixá-lo com a sua cara.");
    textarea.focus();
  });
});

copyButton.addEventListener("click", async () => {
  const codigo = codeElement.textContent;
  if (!codigo) return;

  try {
    await navigator.clipboard.writeText(codigo);
    copyButton.textContent = "Código copiado";
    window.setTimeout(() => { copyButton.textContent = "Copiar código"; }, 1800);
  } catch (erro) {
    showMessage("Não foi possível copiar automaticamente. Selecione o código para copiar.", true);
  }
});
