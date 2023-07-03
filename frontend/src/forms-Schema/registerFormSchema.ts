import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const registerSchema = yup.object().shape({
  firstName: yup.string().min(3, 'Minimum 3 characters').required('Required'),
  lastName: yup.string().required('Required'),
  username: yup
    .string()
    .min(5, 'Minimum 5 characters')
    .max(15, 'Maximum 15 characters')
    .required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        'Please create a strong password min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit',
    })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export const loginSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        'Please create a strong password min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit',
    })
    .required('Required'),
});
