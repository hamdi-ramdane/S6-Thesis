import {create} from 'zustand'


//--------------------------------------------------------------------------------------------
interface CartItem{
  id: string;
  user_id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stock_quantity: number;
  images: string[];
  status: string;
  reviews_rate: number;
  reviews_nbr: number;
}

type CartStore ={
    cart: CartItem[];
    totalPrice: number;
    emptyCart: ()=> void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  totalPrice: 0,
  emptyCart: () => {
    set({ cart: [], totalPrice: 0 });
  },
  addToCart: (item: CartItem) => {
    set((state) => ({
      cart: [...state.cart, item],
      totalPrice: state.totalPrice + item.price,
    }));
  },
  removeFromCart: (id: string) => {
    set((state) => {
      const removedItem = state.cart.find((item) => item.id === id);
      const itemPrice = removedItem?.price ?? 0; // Use nullish coalescing operator to provide a default value
      return {
        cart: state.cart.filter((item) => item.id !== id),
        totalPrice: state.totalPrice - itemPrice,
      };
    });
  },
}));






