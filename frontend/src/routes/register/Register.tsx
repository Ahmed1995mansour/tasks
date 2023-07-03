import { useFormik } from 'formik';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from 'mdb-react-ui-kit';
import { useSignIn } from 'react-auth-kit';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../apis/apis';
import { registerSchema } from '../../forms-Schema/registerFormSchema';
import './register.styles.scss';

const Register = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const mutation = useMutation(signUp, {
    onSuccess: (value: any) => {
      signIn({
        token: value.data.jwt,
        expiresIn: 3600,
        tokenType: 'Bearer',
        authState: value.data.user,
      });
      navigate('/login');
    },
  });

  const onSubmit = async (values: any, actions: any) => {
    const { firstName, lastName, username, email, password } = values;
    mutation.mutate({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    actions.resetForm();
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  return (
    <div className="register-container">
      <form id="register-form" onSubmit={handleSubmit}>
        <MDBContainer>
          <MDBCard className="text-black m-5" style={{ borderRadius: '25px' }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol
                  md="10"
                  lg="6"
                  className="order-2 order-lg-1 d-flex flex-column align-items-center"
                >
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                  <div className="d-flex flex-row align-items-center mb-4 input-container">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="First Name"
                      id="firstName"
                      type="text"
                      className={errors.firstName && touched.firstName ? ' input-error' : ''}
                    />
                  </div>
                  {errors.firstName && touched.firstName && (
                    <div className="d-flex error-container ">
                      <p className="error">{errors.firstName}</p>
                    </div>
                  )}
                  <div className="d-flex flex-row align-items-center mb-4 input-container ">
                    <MDBIcon fas icon="user-tie me-3" size="lg" />
                    <MDBInput
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Last Name"
                      id="lastName"
                      type="text"
                      className={errors.lastName && touched.lastName ? ' input-error' : ''}
                    />
                  </div>
                  {errors.lastName && touched.lastName && (
                    <div className="d-flex error-container ">
                      <p className="error">{errors.lastName}</p>
                    </div>
                  )}
                  <div className="d-flex flex-row align-items-center mb-4 input-container">
                    <MDBIcon fas icon="at me-3" size="lg" />
                    <MDBInput
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Username"
                      id="username"
                      type="text"
                      className={errors.username && touched.username ? ' input-error' : ''}
                    />
                  </div>
                  {errors.username && touched.username && (
                    <div className="d-flex error-container ">
                      <p className="error">{errors.username}</p>
                    </div>
                  )}
                  <div className="d-flex flex-row align-items-center mb-4 input-container ">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Your Email"
                      id="email"
                      type="email"
                      className={errors.email && touched.email ? 'input-error' : ''}
                    />
                  </div>

                  {errors.email && touched.email && (
                    <div className="d-flex error-container ">
                      <p className="error">{errors.email}</p>
                    </div>
                  )}

                  <div className="d-flex flex-row align-items-center mb-4 input-container">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Password"
                      id="password"
                      type="password"
                      className={errors.password && touched.password ? ' input-error' : ''}
                    />
                  </div>
                  {errors.password && touched.password && (
                    <div className="d-flex error-container ">
                      <p className="error">{errors.password}</p>
                    </div>
                  )}
                  <div className="d-flex flex-row align-items-center mb-4 input-container">
                    <MDBIcon fas icon="key me-3" size="lg" />
                    <MDBInput
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Repeat your password"
                      id="confirmPassword"
                      type="password"
                      className={
                        errors.confirmPassword && touched.confirmPassword ? ' input-error' : ''
                      }
                    />
                  </div>

                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="d-flex error-container ">
                      <p className="error">{errors.confirmPassword}</p>
                    </div>
                  )}

                  <div className="mb-4 switch-link">
                    <Link to="/login">Already a member ?</Link>
                  </div>

                  <MDBBtn disabled={isSubmitting} type="submit" className="mb-4" size="lg">
                    Register
                  </MDBBtn>
                </MDBCol>

                <MDBCol md="10" lg="6" className="order-1 order-lg-2 d-flex align-items-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    fluid
                  />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </form>
    </div>
  );
};

export default Register;
