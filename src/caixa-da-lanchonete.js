class CaixaDaLanchonete {
    
    constructor(){
        this.cardapio = new Map([
            ["cafe", 3.00],
            ["chantily", 1.50],
            ["suco", 6.20],
            ["sanduiche", 6.50],
            ["queijo", 2.00],
            ["salgado", 7.25],
            ["combo1", 9.50],
            ["combo2", 7.50]
          ]);

        this.formasDePagamento = new Map([
            ["dinheiro", 0.95],
            ["debito", 1],
            ["credito", 1.03]
        ]);
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        
        //Verifica se é carrinho está vazio
        if(itens.length === 0){
            return "Não há itens no carrinho de compra!";
        }

        //Verifica de o método de pagamento existe
        if(!this.formasDePagamento.has(metodoDePagamento)){
            return "Forma de pagamento inválida!";
        }

        //Valor total a ser pago
        let total = 0;

        for(let item of itens){

            //Separa o item da quantidade e atribui em variaveis auxiliares
            let itemAtual;
            let quantidadeAtual;
            [itemAtual, quantidadeAtual] = item.split(",");

            //Verifica se o item existe
            if(!this.cardapio.has(itemAtual)){
                return "Item inválido!";
            }
            //Verifica se a quantidade é igual a zero ou inválida
            if(quantidadeAtual == 0){
                return "Quantidade inválida!";
            }

            //Verifica se o item pode ser somado
            if((itemAtual !== "chantily" && itemAtual !== "queijo") ||
               (itemAtual === "chantily" && itens.some(item => item.split(',')[0] === "cafe")) || 
               (itemAtual === "queijo" && itens.some(item => item.split(',')[0] === "sanduiche"))){
                    total += this.cardapio.get(itemAtual) * quantidadeAtual;
            }
            else{
                return "Item extra não pode ser pedido sem o principal";
            }
        }
        
        //Aplica os descontos ou acrécimos relacionados a cada forma de pagamento e retorna o valor total
        return `R$ ${(total * this.formasDePagamento.get(metodoDePagamento)).toFixed(2)}`.replace('.', ',');
    }
}

export { CaixaDaLanchonete };
