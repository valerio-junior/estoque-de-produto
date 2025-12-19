let products = []
const formAdicionar = document.getElementById("form-adicionar")
const tabelaCorpo = document.getElementById("tabela-corpo")
let myUl = document.querySelector("ul")
let nextId = 1

function formatedValue(value) {
    const newValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)

    return newValue
}

function totalStockValue(arrayProducts) {
    const totalValue = arrayProducts.reduce((acc, value) => {
        return acc + (value.preco * value.quantidade)

    }, 0)

    const totalEstoque = document.querySelector("#total-estoque")
    totalEstoque.innerHTML = formatedValue(totalValue)

}

function averagePriceProducts() {
    const priceProducts = products.reduce((acc, product) => {
        return acc + product.preco
    }, 0)

    const mediaProducts = products.length
    const mediaPreco = document.querySelector("#media-preco")

    if (mediaProducts > 0) {
        const mediaFinal = priceProducts / mediaProducts
        mediaPreco.innerHTML = formatedValue(mediaFinal)
    }else {
        // Se não houver produtos, define como R$ 0,00
        mediaPreco.innerHTML = formatedValue(0)
    }
}

function addProductTable() {
    tabelaCorpo.innerHTML = ""
    products.forEach(product => {
        const newRow = tabelaCorpo.insertRow()
        newRow.insertCell().textContent = product.id
        newRow.insertCell().textContent = product.nome
        newRow.insertCell().textContent = formatedValue(product.preco)
        newRow.insertCell().textContent = product.quantidade

        const cellAcao = newRow.insertCell()
        const buttonDelete = document.createElement("button")
        buttonDelete.textContent = "Remover"
        buttonDelete.dataset.productId = product.id

        buttonDelete.addEventListener("click", deleteProduct)

        cellAcao.appendChild(buttonDelete)
    })
}

function deleteProduct(event) {
    const idParaRemover = parseInt(event.target.dataset.productId)
    products = products.filter(product => product.id !== idParaRemover)

    renderAll()
}

function renderAll() {

    totalStockValue(products)
    averagePriceProducts()
    addProductTable()
    productsOutOfStock()

}

function productsOutOfStock() {
    const lowStock = products.filter(product => product.quantidade < 5)

    myUl.innerHTML = ""

    if (lowStock.length > 0) {
        const listHtml = lowStock.map(product => {
            return `<li>${product.nome} ${product.quantidade} unidades</li>`
        })

        myUl.innerHTML = listHtml.join("")

    } else {
        myUl.innerHTML = `
        <li>
            Nenhum item em alerta.
        </li>
        `
    }

    console.log(lowStock);

}

formAdicionar.addEventListener("submit", function (event) {
    event.preventDefault()

    const nome = document.getElementById("nome").value
    const preco = parseFloat(document.getElementById("preco").value)
    const quantidade = parseInt(document.getElementById("quantidade").value)

    const newProducts = {
        id: nextId++,
        nome: nome,
        preco: preco,
        quantidade: quantidade
    }

    products.push(newProducts)
    formAdicionar.reset()

    renderAll()

})