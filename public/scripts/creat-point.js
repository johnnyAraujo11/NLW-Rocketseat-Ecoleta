function estadosUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((resposta) => {return resposta.json()})
    .then(estados => {
        for(const estado of estados){/*Diz que para cada elemento em estado(percorrendo o item em estados)*/
            ufSelect.innerHTML += `<option value="${estado.id}"> ${estado.nome}</option>`
        }
    })

}
/*passando evento  de mudança*/
function getCidades(event){
    const stateInput = document.querySelector("input[name=state")
    const cidadeSelect = document.querySelector("select[name=city]")
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    cidadeSelect.innerHTML = '<option value="">Selelcione a cidade<option>'
    cidadeSelect.disabled = true

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    fetch(url)
    .then( respo => respo.json() )
    .then(cities => {
        for( const city of cities){
           cidadeSelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`

        }
        cidadeSelect.disabled = false
    })

}



estadosUFs()
/*
document
    .querySelector("select[name=uf]")
     Fica ouvindo os eventos e quando mudar no change ele exibe a msg 
    .addEventListener("change", () => {console.log("Muidei ")})*/

    /*Outro modo de fazer colocando a função por referência */
  
document.querySelector("select[name=uf]").addEventListener("change", getCidades)


//itens de coleta
// buscar todos os li que contém as imagens
const todosItensImg = document.querySelectorAll(".items-grid li")

for (const item of todosItensImg){
    item.addEventListener("click", itemSelecionado)
}

let arrayItensSelecionados = []
itemColetado = document.querySelector("input[name=items]")
function itemSelecionado(event){
    const itemLi = event.target

    //adicionar ou remover uma classe no JS toggle remove se existir e adiciona se não existir
    //isso aqui adiciona css que está lá definido as cores e etc...
    itemLi.classList.toggle("mouse-em-cima")
    const itemId = itemLi.dataset.id

    //console.log('Item ID: ', itemId)

    /*Verificar se os itens estão selecionados*/
    const jaSelecionado = arrayItensSelecionados.findIndex( function(item){

        const itemFound = item == itemId
        return itemFound
    })

    /*Se estiver selecionado devemos tirar a seleção */
    if (jaSelecionado != -1){
        //remover do array
        const filtrarItens = arrayItensSelecionados.filter( item => {
            const itemDiferente = item != itemId //false
            return itemDiferente
        })
        arrayItensSelecionados = filtrarItens
    } else{
        arrayItensSelecionados.push(itemId)
    }
//console.log('arrayItensSelecionados: ', arrayItensSelecionados)

  //atualizar o campo escodido 
    itemColetado.value = arrayItensSelecionados
}

