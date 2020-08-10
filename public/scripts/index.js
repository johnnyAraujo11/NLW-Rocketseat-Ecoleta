const botaoPesq = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const fechar = document.querySelector("#modal .header a")

botaoPesq.addEventListener("click", () => {
    modal.classList.remove("escondido")
})

fechar.addEventListener("click", () => {
    modal.classList.add("escondido")
})