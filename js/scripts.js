
async function gerarCodigo() {

    let textarea = document.querySelector(".texto-pagina").value

    let botao = document.querySelector("button")
    let textoOriginalBotao = botao.textContent
    botao.textContent = "🔥 Forjando..."
    botao.disabled = true

    try {
        let resposta = await fetch("/.netlify/functions/gerar", {
            method: "POST",
            body: JSON.stringify({
                texto: textarea
            })
        })

        let dados = await resposta.json()
        let resultado = dados.resultado

        let espacoCodigo = document.querySelector(".bloco-codigo")
        let espacoSite = document.querySelector(".bloco-site")

        espacoCodigo.textContent = resultado
        espacoSite.srcdoc = resultado
    } catch (erro) {
        alert("Não foi possível gerar o site. Tente novamente.")
    } finally {
        botao.textContent = textoOriginalBotao
        botao.disabled = false
    }
}
