
import { useState } from "react";
import Detalle from "./Detalle";


import { useContext } from "react";
import { carritoContext } from "../contexts/carritoContext";

const Card = ({producto}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const { cart, agregar, vaciar, eliminar, comprar } = useContext(carritoContext)
  
    const getCantidad=(producto)=>{
        return cart.find((item)=> item.id === producto.id)?.cantidad || 0
    }
    const totalProd=getCantidad(producto)
    return ( 
    <>
        <div className="col-md-4 col-lg-3 mb-4" >
                <div className="card h-100">
                <div className="card-header p-0">
                {
                        totalProd > 0 && (
                          <span
                          className="badge rounded-pill text-bg-warning fs-3 m-1"  style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}>
                            {totalProd}
                        </span>  
                        )
                    }
                    <img src={producto.thumbnail} alt={producto.title}  className="img-fluid" />
                </div>
                <div className="card-body text-center">
                    
                    <h5 className="text-info">{producto.brand}</h5>
                    
                    <div class="d-flex justify-content-around text-center">
                    <p className="text-danger">Precio: {producto.price.toFixed(0).toLocaleString()}$ </p> 
                    <p>Existencia: {producto.stock}</p>
                    </div>
                  
                    
                  
                </div>
                <div className="card-footer text-center">
                {
                        totalProd > 0 && (
                          <span
                          className="badge rounded-pill text-bg-warning fs-3 m-1"  style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}>
                            {totalProd}
                        </span>  
                        )
                    }
                    <button className="btn btn-info btn-sm mx-1"  onClick={handleShow}>Detalle</button>
                   
                    <button className="btn btn-success btn-md mx-1" onClick={()=>agregar(producto)}>+</button>
                    {
                        totalProd > 0 && (
                            <button className="btn btn-danger btn-md mx-1" onClick={()=>eliminar(producto)}>-</button>
                        )

                    }
                    
                </div>
            </div>
        </div>
        <Detalle show={show} handleClose={handleClose} producto={producto}  />
    </>  
  )
}

export default Card