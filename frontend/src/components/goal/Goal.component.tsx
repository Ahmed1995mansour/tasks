import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardText,
  MDBCardTitle,
} from 'mdb-react-ui-kit';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './goal.styles.scss';

type GoalT = {
  title: String;
  user: string;
  _id: string;
};

type props = {
  goal: GoalT;
};

const Goal: FC<props> = ({ goal }) => {
  return (
    <div key={goal._id} className="goal-container container mb-3">
      <div className="card text-center">
        <div className="card-header">{goal.title}</div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional content.
          </p>
          <div className="actions-container">
            <Link className="btn btn-primary" to="/">
              View
            </Link>
            <Link className="btn btn-secondary" to="/">
              Edit
            </Link>
            <button
              onClick={() => {
                alert('Are you sure ?');
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
      {/* <MDBCard alignment="start">
        <MDBCardHeader className="text-center goal-title">{goal.title}</MDBCardHeader>
        <MDBCardBody>
          <MDBCardTitle>Num of Categories: 15</MDBCardTitle>
          <MDBCardTitle>Num of Tasks: 100</MDBCardTitle>
          <MDBCardText>Progress:</MDBCardText>
          <div className="actions-container">
            <Link className="btn btn-primary" to="/">
              View
            </Link>
            <Link className="btn btn-secondary" to="/">
              Edit
            </Link>
            <button
              onClick={() => {
                alert('Are you sure ?');
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </MDBCardBody>
      </MDBCard> */}
    </div>
  );
};

export default Goal;
