import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Newsletter from '../models/Newsletter';
import { ApiError } from '../middleware/errorHandler';

export const subscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, 'Validation failed', errors.array());
    }
    
    const { email } = req.body;
    
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    
    if (existing) {
      if (existing.subscribed) {
        throw new ApiError(400, 'Email already subscribed');
      } else {
        // Re-subscribe
        existing.subscribed = true;
        await existing.save();
        
        res.status(200).json({
          success: true,
          message: 'Successfully re-subscribed to newsletter',
        });
        return;
      }
    }
    
    // Create new subscription
    await Newsletter.create({ email, subscribed: true });
    
    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;
    
    const subscription = await Newsletter.findOne({ email });
    
    if (!subscription) {
      throw new ApiError(404, 'Email not found');
    }
    
    subscription.subscribed = false;
    await subscription.save();
    
    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    });
  } catch (error) {
    next(error);
  }
};
