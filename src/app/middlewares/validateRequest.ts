import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //validation check
    await schema.parseAsync({
      body: req.body,
    });

    next();
  };
};

export default validateRequest;
