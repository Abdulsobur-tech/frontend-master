import { validationResult } from "express-validator";

export const handleInputError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ error: errors.array() });
  } else {
    next();
  }
};
