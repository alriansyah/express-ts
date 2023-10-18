import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, updateProduct } from '#controllers/product.controller';
import { requireUser, requireAdmin } from '../middleware/auth';

export const ProductRouter = Router();

ProductRouter.get('/', requireUser, getProduct);
ProductRouter.get('/:id', requireAdmin, getProduct);
ProductRouter.post('/', requireAdmin, createProduct);
ProductRouter.put('/:id', requireAdmin, updateProduct);
ProductRouter.delete('/:id', requireAdmin, deleteProduct);
