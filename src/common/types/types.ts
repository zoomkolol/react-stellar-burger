export type User = {
  email?: string;
  name?: string;
  password?: string;
}

export type LoginPayload = {
  email: string;
  password: string;
}

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  uniqueId?: string;
  name?: string;
  count?: number;
  place?: number;
}

export type Response = {
  body: ReadableStream;
  bodyUsed: boolean;
  headers: {};
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: string;
  url: string;
}

export type Order = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  owner?: string;
  status: string;
  updatedAt: string;
  __v?: number;
  _id: string;
}

export type WSMessage = {
  orders: Order[];
  success: boolean;
  total: number;
  totalToday: number;
}

export type FormValues = {
  email?: string;
  name?: string;
  password?: string;
  token?: string;
}
