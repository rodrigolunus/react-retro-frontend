import { useContext, useActionState } from 'react';

import Modal from './UI/Modal.jsx';
import CarrinhoContext from '../store/CarrinhoContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import UsuarioContext from '../store/UsuarioContext.jsx';
import useHttp from '../hooks/useHttp.js';
import Erro from './Erro.jsx';
import Input from './UI/Input.jsx';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const cartCtx = useContext(CarrinhoContext);
  const userProgressCtx = useContext(UsuarioContext);

  const { data, erro, sendRequest, clearData } = useHttp('http://localhost:8080/pedidos', requestConfig);

  const cartTotal = cartCtx.items.reduce((valorTotal, item) => valorTotal + item.quantidade * item.preco, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const dadosCliente = Object.fromEntries(fd.entries());

    // Monte os itens no formato correto
    const itens = cartCtx.items.map(item => ({
      quantidade: item.quantidade,
      preco: item.preco,
      produto: {
        id: item.id,
      },
    }));
    
    const novoPedido = {
      cliente: {
        nome: dadosCliente.nome,
        email: dadosCliente.email,
      },
      enderecoDeEntrega: {
        logradouro: dadosCliente.endereco,
        cep: dadosCliente.cep,
        cidade:  dadosCliente.cidade,
        estado: dadosCliente.estado,
      },
      itens: itens,
    };

    await sendRequest(JSON.stringify(novoPedido));
  }

  const [formState, formAction, isSending] = useActionState(checkoutAction, null);

  let actions = (
    <>
      <Button type='button' textOnly onClick={handleClose}>
        Fechar
      </Button>
      <Button>Finalizar Compra</Button>
    </>
  );

  if (isSending) {
    actions = <span>Fechando compra...</span>;
  }

  if (data && !erro) {
    return (
      <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
        <h2>Deu certo!</h2>
        <p>Sua compra foi feita com sucesso.</p>
        <p>Você ira receber mais detalhes do seu pedido via email em alguns minutos.</p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form action={formAction}>
        <h2>Revisão do Pedido</h2>
        <p>Confira os dados antes de finalizar a compra</p>

        <Input label='Nome Completo' type='text' id='nome' />
        <Input label='E-Mail' type='email' id='email' />
        <Input label='Endereço' type='text' id='endereco' />
        <div className='control-row'>
          <Input label='Cep' type='text' id='cep' />
          <Input label='Cidade' type='text' id='cidade' />
          <Input label='Estado' type='text' id='estado' />
        </div>


        <section>
          <h3>Itens do Pedido</h3>
          <ul>
            {cartCtx.items.map(item => (
              <li key={item.id}>
                <div>
                  <p>
                    {item.nome} - {currencyFormatter.format(item.quantidade * item.preco)} ({item.quantidade} X
                    {currencyFormatter.format(item.preco)})
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <span>Total a pagar:</span>
            <strong>{currencyFormatter.format(cartTotal)}</strong>
          </div>
        </section>

        {erro && <Erro title='Failed to submit order' messsage={erro} />}

        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}