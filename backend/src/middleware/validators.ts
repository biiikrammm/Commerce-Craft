import { body, param, ValidationChain } from 'express-validator';

export const productValidation = {
  getById: [
    param('id').notEmpty().withMessage('Product ID is required'),
  ] as ValidationChain[],
};

export const cartValidation = {
  addItem: [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  ] as ValidationChain[],
  
  updateItem: [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive number'),
  ] as ValidationChain[],
};

export const orderValidation = {
  create: [
    body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
    body('items.*.productId').notEmpty().withMessage('Product ID is required'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('shippingAddress.fullName').notEmpty().withMessage('Full name is required'),
    body('shippingAddress.address').notEmpty().withMessage('Address is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.postalCode').notEmpty().withMessage('Postal code is required'),
    body('shippingAddress.country').notEmpty().withMessage('Country is required'),
  ] as ValidationChain[],
};

export const newsletterValidation = {
  subscribe: [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
  ] as ValidationChain[],
};
