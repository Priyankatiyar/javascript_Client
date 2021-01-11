import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().trim().required('Name is a required field').min(3),
  email: yup.string()
    .trim().email().required('Email is a required field'),
  password: yup.string()
    .required('Password is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
  'Confirm Password': yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Must match password'),
});

export default schema;
