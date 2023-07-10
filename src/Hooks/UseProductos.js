import { data } from "../context/Data"

function useProductos() {
    const getProductos = async () => {
        //return fetch("localhost:5000/productos").then(response=>response.json()).then(data=>data)
        return data.items
    }

    return{getProductos}
}

export {useProductos}
