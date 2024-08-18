import { checkPassword } from 'shared/const';
import { ValidationError } from 'yup';

const MAX_WIDTH = 100;
const MIN_WIDTH = 0;
const A_BIT_MORE_THEN_MIN_WIDTH = 2;
const MAX_ERROR_COUNT = 5;

export const checkPasswordStrength = async (password?: string) => {
  try {
    if (password === undefined) return;
    const result = await checkPassword.validate(
      { password: password },
      {
        abortEarly: false,
      }
    );
    if (result) return MAX_WIDTH;
    else return MIN_WIDTH;
  } catch (e) {
    const errors = (e as ValidationError).inner.map((item) => item.message);
    console.log('password = ', errors);
    return (
      MAX_WIDTH - (MAX_WIDTH / MAX_ERROR_COUNT) * errors.length ||
      A_BIT_MORE_THEN_MIN_WIDTH
    );
  }
};
