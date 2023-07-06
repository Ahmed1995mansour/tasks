import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { getGoals } from '../../apis/apis';
import AddGoalModal from '../../components/add-goal-modal/AddGoalModal.component';
import FilterHeader from '../../components/filter-header/FilterHeader.component';
import Goal from '../../components/goal/Goal.component';
import Message from '../../components/message/Message.component';
import Loader from '../loader/Loader';
import './goals.styles.scss';

const Goals = () => {
  const authHeader = useAuthHeader();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };
  const { data, error, isLoading, isFetching, isError } = useQuery(
    'goals',
    () => getGoals(config),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || isFetching) return <Loader />;

  if (isError) return <Message content={error} />;

  return (
    <div className="goals-container container pt-5">
      <h2>Goals</h2>
      <FilterHeader />
      <div className="goals">
        {data?.data.map((goal: any) => (
          <Goal key={goal._id} goal={goal} />
        ))}
      </div>
      <AddGoalModal />
    </div>
  );
};

export default Goals;
