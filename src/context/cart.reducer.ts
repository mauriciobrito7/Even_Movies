import { CartItem } from './cart.types';
import { CartActions, CartActionTypes } from './cart.actions';
import { TICKET_OPTIONS } from '@/constants/tickets';

type CartState = CartItem[];

const cartReducer = (state: CartState, action: CartActions): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM: {
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        const newState = [...state];
        newState[itemIndex].quantity += action.payload.quantity;
        newState[itemIndex].price += TICKET_OPTIONS[action.payload.type].price;
        return newState;
      } else {
        return [...state, action.payload];
      }
    }
    case CartActionTypes.REMOVE_ITEM: {
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        const newState = [...state];
        newState[itemIndex].quantity -= action.payload.quantity;
        newState[itemIndex].price -= TICKET_OPTIONS[action.payload.type].price;
        if (newState[itemIndex].quantity <= 0) {
          newState.splice(itemIndex, 1);
        }
        return newState;
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

export default cartReducer;
