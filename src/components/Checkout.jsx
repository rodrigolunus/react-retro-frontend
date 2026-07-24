import { useContext, useActionState } from 'react';

import Modal from './UI/Modal';
import CarrinhoContext from '../store/CarrinhoContext';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UsuarioContext from '../store/UsuarioContext';
import useHttp from '../hooks/useHttp';
import Erro from './Erro.jsx';

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
    //const dadosCliente = Object.fromEntries(fd.entries());

   const novoPedido = {
      id: 0, // A API geralmente gera o ID real no banco
      cliente: {
        id: 0,
        nome: 'formData.clienteNome',
        email: 'formData.clienteEmail',
        enderecos: [
          {
            id: 0,
            logradouro: 'formData.logradouro',
            cep: 1,
            cidade: {
              id: 0,
              nome: 'formData.cidadeNome',
              estado: {
                id: 0,
                nome: 'formData.estadoNome'
              }
            }
          }
        ]
      },
      enderecoDeEntrega: {
        id: 0,
        logradouro: 'formData.logradouro',
        cep: 1,
        cidade: {
          id: 0,
          nome: 'formData.cidadeNome',
          estado: {
            id: 0,
            nome: 'formData.estadoNome'
          }
        }
      },
      itens: [
        {
          quantidade: 1,
          preco: 1,
          produto: {
            id: 0,
            nome: 'formData.produtoNome',
            preco: 1,
            imagem: "https://via.placeholder.com/150"
          },
          subtotal: 1
        }
      ],
      valorTotal: 1
    };
    
    await sendRequest(JSON.stringify(novoPedido));
  }

  const [formState, formAction, isSending] = useActionState(checkoutAction, null);

  let actions = (
    <>
      <Button type='button' textOnly onClick={handleClose}>
        Fechar
      </Button>
      <Button>Fechar Compra</Button>
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
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>

        <Input label='Nome Completo' type='text' id='nome' />
        <Input label='E-mail' type='email' id='email' />
        <Input label='Endereço' type='text' id='endereco' />
        <div className='control-row'>
          <Input label='Cep' type='text' id='cep' />
          <Input label='Cidade' type='text' id='cidade' />
          <Input label='Estado' type='text' id='estado' />
        </div>

        {erro && <Erro title='Failed to submit order' messsage={erro} />}

        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}
