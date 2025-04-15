import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Artikal } from "../Models/Artikal";

interface cartState{
    artikal: Artikal;
    brojArtikala: number;
};

type CartContextType = {
    cart: cartState[];
    price: number;
    numberOfProducts: number;
    returnNumberOfArtical : (productId: string|number) => number;
    addToCart: (product: Artikal) => void;
    removeFromCart: (productId: string|number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
    children: ReactNode;
  };

  export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<cartState[]>(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
      });
      
      const [price, setPrice] = useState<number>(() => {
        const saved = localStorage.getItem('cartPrice');
        return saved ? parseFloat(saved) : 0;
      });
      
      const [numberOfProducts, setNumberOfProducts] = useState<number>(() => {
        const saved = localStorage.getItem('cartCount');
        return saved ? parseInt(saved) : 0;
      });


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartPrice', price.toString());
        localStorage.setItem('cartCount', numberOfProducts.toString());
      }, [cart, price, numberOfProducts]);

    const returnNumberOfArtical = (productId: string | number) => {
        var prevCart = cart;
        const product = prevCart.find(item=>item.artikal.id==productId);
        if(product!==undefined){
            return product.brojArtikala;
        }
        return 0;
    };

    const addToCart = (product:Artikal) =>{
        var prevCart = cart;
        const findingIndex = prevCart.findIndex(item=>item.artikal.id==product.id);

        if(findingIndex!==-1){
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
            if(product.brojArtikala>1){
                product.brojArtikala--;
                setCart(cart);
            }else{
                setCart(cart.filter(item=>item !== product));
            }
            setPrice(price-product.artikal.cena);
            setNumberOfProducts(numberOfProducts-1);
        }
    };

    const clearCart = ()=>{
        localStorage.removeItem('cart');
        localStorage.removeItem('cartPrice');
        localStorage.removeItem('cartCount');
        setPrice(0);
        setNumberOfProducts(0);
        setCart([]);
    };

    return(
        <CartContext.Provider value={{ cart,price,numberOfProducts,returnNumberOfArtical,addToCart,removeFromCart,clearCart}}>
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