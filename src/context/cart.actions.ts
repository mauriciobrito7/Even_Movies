import { CartItem } from './cart.types';

export enum CartActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

interface AddItemAction {
  type: CartActionTypes.ADD_ITEM;
  payload: CartItem;
}

interface RemoveItemAction {
  type: CartActionTypes.REMOVE_ITEM;
  payload: CartItem;
}

export type CartActions = AddItemAction | RemoveItemAction;
