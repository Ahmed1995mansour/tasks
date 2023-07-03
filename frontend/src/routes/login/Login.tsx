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
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../apis/apis';
import { loginSchema } from '../../forms-Schema/registerFormSchema';

const Login = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const mutation = useMutation(login, {
    onSuccess: (value: any) => {
      signIn({
        token: value.data.jwt,
        expiresIn: 3600,
        tokenType: 'Bearer',
        authState: value.data.user,
      });
      navigate('/');
    },
  });

  const onSubmit = (values: any, actions: any) => {
    const { login, password } = values;
    mutation.mutate({
      login,
      password,
    });

    actions.resetForm();
  };

  const { handleBlur, handleChange, handleSubmit, values, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        login: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit: onSubmit,
    });
  return (
    <div className="register-container">
      <form id="login-form" onSubmit={handleSubmit}>
        <MDBContainer>
          <MDBCard className="text-black m-5" style={{ borderRadius: '25px' }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol
                  md="10"
                  lg="6"
                  className="order-2 order-lg-1 d-flex flex-column align-items-center"
                >
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

                  <div className="d-flex flex-row align-items-center mb-4 input-container">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput
                      value={values.login}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Email / Username "
                      id="login"
                      type="string"
                      className={errors.login && touched.login ? ' input-error' : ''}
                    />
                  </div>
                  {errors.login && touched.login && (
                    <div className="d-flex error-container ">
                      <p className="error">{errors.login}</p>
                    </div>
                  )}
                  <div className="d-flex flex-row align-items-center mb-4 input-container">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
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
                  <div className="mb-4 switch-link">
                    <Link to="/register">Register ?</Link>
                  </div>

                  <MDBBtn disabled={isSubmitting} type="submit" className="mb-4" size="lg">
                    Login
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

export default Login;
