import * as Yup from 'yup';
export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
        fictionalName: Yup.string()
            .required(),
        fish: Yup.string(),
        fishQuantity: Yup.number(),
        foodQuantity: Yup.number()
            .required()
            .moreThan(0),
        foodInterval: Yup.string()
            .required(),
        turnOnLight: Yup.string()
            .required(),
        turnOffLight: Yup.string()
            .required(),
    });
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res.status(400).json({
      error: 'Validation fails, body of request out of expected format!',
      messages: err.inner,
    });
  }
};