export interface Motorista {
  nome: string;
}

export interface Cliente {
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
}

export interface Delivery {
  id: string;
  documento: string;
  motorista: Motorista;
  cliente_origem: Cliente;
  cliente_destino: Cliente;
  status_entrega: string;
}
