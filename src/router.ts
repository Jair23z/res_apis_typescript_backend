import { Router } from 'express'
import { createProduct, deleteProduct, getProductByID, getProducts, updatedAvailability, updatedProduct } from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router();

/** 
* @swagger 
* components:   
*   schemas: 
*       Product:
*           type: object
*           properties:
*               id: 
*                   type: integer
*                   description: The product ID
*                   example: 1
*               name:
*                   type: string
*                   description: The product name
*                   example: Monitor Curvo de 49 pulgadas
*               price: 
*                   type: number
*                   description: The prduct price
*                   example: 300
*               availability: 
*                   type: boolean
*                   description: The product availability
*                   example: true 
*/

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Product'
 * 
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *      get: 
 *          summary: Get a product by ID
 *          tags: 
 *              - Products 
 *          description: Return a product based on its unique ID
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful Response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 * 
 *              404:
 *                  description: Not found 
 * 
 *              400:
 *                  description: Bad Request - Invalid ID
 * 
 *                  
 * 
 */

router.get('/:id',

    param('id').isInt().withMessage('ID no válido')
    ,

    handleInputErrors,

    getProductByID);




/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags: 
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo de 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *          responses:
 *              201:
 *                   description: Successful response
 *                   content:
 *                       application/json:
 *                           schema:
 *                                $ref: '#/components/schemas/Product'
 *                           
 *              
 *              400: 
 *                  description: Bad Resquest - Invalid Input Data
 */

router.post('/',


    //Validacion
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),

    handleInputErrors,

    createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Uptades a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:     
 *                  type: integer
 *          requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                               name:
 *                                   type: string
 *                                   example: "Monitor Curvo de 49 pulgadas"
 *                               price:
 *                                   type: number
 *                                   example: 399
 *                               availability:
 *                                   type: boolean
 *                                   example: true
 *          responses: 
 *              200:
 *                   description: Successful response
 *                   content:
 *                       application/json:
 *                           schema:
 *                                $ref: '#/components/schemas/Product'
 *                           
 *              400:
 *                   description: Bad request - Invalid ID or invalid input data
 *              404:
 *                   description: Product not found
 */

router.put('/:id',
    //Validacion
    param('id').isInt().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),

    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updatedProduct
);


/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Updated product availability
 *          tags:
 *              - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:     
 *                 type: integer
 *          responses:
 *                  200:
 *                      description: Successful response
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/Product'
 *                  400:
 *                      description: Bad request - Invalid ID
 *                  404:
 *                      description: Product not found
 *                  
 */

router.patch('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updatedAvailability
);


/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a Product by a given ID
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *                  
 *          responses:
 *              200:
 *                  description: Succesful Response
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              type: string
 *                              value: 'Producto Eliminado'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Not Found
 * 
 */
router.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
);

export default router