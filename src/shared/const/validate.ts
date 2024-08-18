import * as yup from 'yup';
import { countries } from './countries';

const VALID_FILE_SIZE = 102400;
const VALID_IMAGE_FORMATS = ['image/png', 'image/jpeg', 'image/jpg'];

const schemaWithoutPassword = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Uppercase letter must be first'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Must be positive number')
    .typeError('Not a number'),
  email: yup.string().required('Email is required').email(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirmation is required'),
  country: yup
    .string()
    .required('Country is required')
    .test('country', 'Choose country from list', (value) =>
      countries.includes(value)
    ),
  gender: yup.string().required('Gender is required'),
  term: yup
    .boolean()
    .required()
    .oneOf([true], 'Agreement is required to continue'),
  image: yup
    .mixed<FileList>()
    .required()
    .test('required', 'Image is required', (value) => {
      if (!value.length) return false;
      return true;
    })
    .test(
      'size',
      'Size must be less then 100KB',
      (value) =>
        value && Array.from(value).every((item) => item.size <= VALID_FILE_SIZE)
    )
    .test(
      'type',
      'Type must be "png", "jpg", "jpeg"',
      (value) =>
        value &&
        Array.from(value).every((file) =>
          VALID_IMAGE_FORMATS.includes(file.type)
        )
    ),
});

const checkPassword = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .matches(/[a-zа-я]/, 'At least one lowercase letter')
    .matches(/[A-ZА-Я]/, 'At least one uppercase letter')
    .matches(/[0-9]/, 'At least one number')
    .matches(/[!&@%~#^*]/, 'At least one special character'),
});

const schema = schemaWithoutPassword.concat(checkPassword);

export { checkPassword, schema };
