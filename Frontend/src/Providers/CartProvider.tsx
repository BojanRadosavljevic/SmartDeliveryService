import { createContext, ReactNode, useContext, useState } from "react";
import { Artikal } from "../Models/Artikal";

interface cartState{
    artikal: Artikal;
    brojArtikala: number;
};

type CartContextType = {
    cart: cartState[];
    price: number;
    numberOfProducts: number;
    addToCart: (product: Artikal) => void;
    removeFromCart: (productId: string|number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
    children: ReactNode;
  };

  export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart,setCart] = useState<cartState[]>([]);
    const [price, setPrice] = useState<number>(0);
    const [numberOfProducts, setNumberOfProducts] = useState<number>(0);

    const addToCart = (product:Artikal) =>{
        var prevCart = cart;
        const findingIndex = prevCart.findIndex(item=>item.artikal.id==product.id);

        if(findingIndex!==undefined){
            cart[findingIndex].brojArtikala++;
            setCart(cart);
            setPrice(price+product.cena);
            setNumberOfProducts(numberOfProducts+1);
        }else{
            const cs: cartState = {
                artikal: product,
                brojArtikala : 1
            }; 
           cart.push(cs);
           setCart(cart);
           setPrice(price+product.cena);
            setNumberOfProducts(numberOfProducts+1);
        }

    };

    const removeFromCart = (productId: string | number) =>{
        var prevCart = cart;
        const product = prevCart.find(item=>item.artikal.id==productId);
        if(product!==undefined){
            setCart(cart.filter(item=>item !== product));
            setPrice(price-product.artikal.cena);
            setNumberOfProducts(numberOfProducts-1);
        }
    };

    const clearCart = ()=>{
        setCart([]);
    };

    return(
        <CartContext.Provider value={{ cart,price,numberOfProducts,addToCart,removeFromCart,clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error('useCart mora biti korišćen unutar CartProvider-a!');
    }
    return context;
  };