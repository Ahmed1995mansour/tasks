import { DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { FC } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteGoalById } from '../../apis/apis';
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
  const goalId = goal._id;
  const auth = useAuthHeader();
  const queryClient = useQueryClient();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth(),
    },
  };

  const deleteGoalMutation = useMutation(deleteGoalById, {
    onSuccess: (data: any) => {
      toast('Goal Deleted', { type: 'error', theme: 'colored' });
      queryClient.invalidateQueries('tasks');
      queryClient.invalidateQueries('goals');
      queryClient.invalidateQueries('percentage');
    },
  });

  const deleteGoalHandler = () => {
    Modal.confirm({
      title: 'Delete Goal',
      content:
        'Deleting this goal will delete all associated tasks , Are you sure to delete this Goal?',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk(...args) {
        deleteGoalMutation.mutate({ config, goalId });
        console.log('deleted');
      },
      icon: <DeleteOutlined color="red" />,
      centered: true,
    });
  };
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
            <Link className="btn btn-primary" to={`/goals/${goal._id}`}>
              View
            </Link>
            <Link className="btn btn-secondary" to="/">
              Edit
            </Link>
            <button onClick={() => deleteGoalHandler()} className="btn btn-danger">
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
