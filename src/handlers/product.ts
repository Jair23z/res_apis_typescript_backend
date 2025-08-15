import { Request, Response } from "express"
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    res.json({ data: products })
}

export const getProductByID = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }

    res.json({ data: product })
}



export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
}


//PUT remplaza todo, por ejemplo si solo enviamos un campo a actualizar, todo lo remplaza
export const updatedProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }

    //Actualizar
    await product.update(req.body)
    //updated nos protege, ya que funciona mas o menos como un patch
    await product.save()

    res.json({ data: product })

}


//Patch rempleaza solo lo que le pasemos, por ejemplo si le pasamos un campo solo actualiza ese campo
export const updatedAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }

    //Actualizar
    product.availability = !product.availability
    await product.save()

    res.json({ data: product })

}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    //Eliminar
    await product.destroy()
    res.json({ data: 'Producto Eliminado' })
}