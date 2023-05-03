import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import './register.styles.scss';

const Register = () => {
  return (
    <div className="register-container">
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
                  <MDBInput label="First Name" id="form1" type="text" className="w-100" />
                </div>
                <div className="d-flex flex-row align-items-center mb-4 input-container ">
                  <MDBIcon fas icon="user-tie me-3" size="lg" />
                  <MDBInput label="Last Name" id="form1" type="text" className="w-100" />
                </div>
                <div className="d-flex flex-row align-items-center mb-4 input-container">
                  <MDBIcon fas icon="at me-3" size="lg" />
                  <MDBInput label="Username" id="form1" type="text" className="w-100" />
                </div>

                <div className="d-flex flex-row align-items-center mb-4 input-container">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput label="Your Email" id="form2" type="email" />
                </div>

                <div className="d-flex flex-row align-items-center mb-4 input-container">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput label="Password" id="form3" type="password" />
                </div>

                <div className="d-flex flex-row align-items-center mb-4 input-container">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput label="Repeat your password" id="form4" type="password" />
                </div>

                <div className="mb-4 switch-link">
                  <Link to="/login">Already a member ?</Link>
                </div>

                <MDBBtn className="mb-4" size="lg">
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
    </div>
  );
};

export default Register;
