import api from './api';

export const getConversas = async () => {
  const response = await api.get('/Conversa/conversas');

  return response;
};

type requestConversa = {
    id: string
    nome: string;
}

export const postConversasPrivado = async (userId: string, conversa: requestConversa) => {
  const response = await api.post(`/Conversa/conversas-privado?userId=${userId}`,{
      nome: conversa.nome
    });

  return response;
};

export const getConversaMensagens = async (conversaId: string) => {
    const response = await api.get(`/Conversa/conversas/${conversaId}/mensagens`);

    return response;
}

type requestMensagem = {
    type: number;
    content: string;
};

export const postConversaMensagem = async (conversaId: string, mensagem: requestMensagem) => {
    const response = await api.post(`/Conversa/conversas/${conversaId}/adcinar-mensagem`, {
        type: mensagem.type,
        content: mensagem.content
    });

    return response;
}