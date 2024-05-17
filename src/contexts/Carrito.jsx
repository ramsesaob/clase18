import { useState } from "react";
import { carritoContext } from "./carritoContext"
import Swal from 'sweetalert2'
function mostrarMensage2(titulo,texto){
  Swal.fire({
      title: titulo,
      text: texto,
      icon: "error"
    });
}

const Carrito = ({children}) => {
  
  function mostrarMensage2(titulo,texto){
    Swal.fire({
        title: titulo,
        text: texto,
        icon: "error"
      });
  }

    const [cart, setCart] = useState([]);
    
 
    const agregar = (producto) =>{
        
      setCart((currItems)=>{
      //  let compraminima = 3
      //  if(producto.stock <= compraminima){
       //   compraminima = producto.stock
      //  }
        let compraminima = producto.stock <= 3 ? producto.stock : producto.stock - 1;

        const isItemInCart = currItems.find((item)=> item.id === producto.id)
           if(isItemInCart){

              return currItems.map((item)=>{
                if(item.id === producto.id){
                    if (producto.stock > item.cantidad) {
                    return {...item, cantidad: item.cantidad + 1}
                     }
                
                    else {
                    mostrarMensage2("¡Excedio el Limite de Stock de Producto!");
                  
                     return item;
                   // return {...item, cantidad2: item.cantidad }
                    }
                } 
                else{
                  return item;
                }  
              })
      }else{
          return [...currItems, {...producto, cantidad: compraminima}];
      }
      })
      console.log(cart)
    
  }



    const vaciar = () =>{
        setCart([])
        alert("Carrito vaciado")
       
    }
    const eliminar = (producto) =>{
        setCart((currItems)=>{
            if(currItems.find((item)=> item.id === producto.id)?.cantidad === 1){
                return currItems.filter((item)=> item.id !== producto.id);
            }else{
                return currItems.map((item)=>{
                    if(item.id === producto.id){
                        return {...item, cantidad: item.cantidad - 1};
                    }else{
                        return item;
                    }
                })
            }    
        })
        
        
        /*
        para eliminar todos los item
        setCart((currItems)=>{
            return currItems.filter((item)=> item.id !== producto.id);
        })
        */
        console.log(cart)
    }

    const comprar = () => {
        fetch('https://dummyjson.com/carts/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: 1,
            products: cart.map((item) => ({
              id: item.id,
              quantity: item.cantidad
            }))
          })
        })
          .then((res) => res.json())
          .then(console.log);
          alert("Gracias por su compra")
          setCart([])
      };

  return (
    <carritoContext.Provider 
        value={{cart, agregar, vaciar, eliminar, comprar}}>
        {children}
    </carritoContext.Provider>
  )
}

export default Carrito