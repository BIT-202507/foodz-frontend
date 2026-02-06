// Este contrato debe cumplir con todas las formas de respuesta que se puedan usar tanto en el envio de datos como en la recepcion de los mismos.
export interface User {
  _id: string;
  name: string;
  username: string;
  email: string
  password: string
  role: string
  isActive: boolean;
  activationCode: string;
  createAt: Date;
  updatedAt: Date;
}
