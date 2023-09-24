import { DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';
import { FC } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getGoalTasksPercentage } from '../../apis/apis';
import { deleteGoalById } from '../../apis/apis';
import ProgressBar from '../progress-bar/ProgressBar.component';
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

  const [completed, setCompleted] = useState(0);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth(),
    },
  };

  const { data: goalTasksPercentageData } = useQuery(
    ['percentage', goalId],
    () => getGoalTasksPercentage(config, goalId),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        setCompleted(data.data);
      },
    }
  );

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
        <ProgressBar completed={completed} background="#198754" height="10px" width="100%" />

        <div className="card-body">
          <div className="actions-container mt-3">
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
    </div>
  );
};

export default Goal;
