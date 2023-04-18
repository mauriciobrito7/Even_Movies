import { CartItem } from './cart.types';
import { CartActions, CartActionTypes } from './cart.actions';

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
