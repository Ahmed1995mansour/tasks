import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { getCategories } from '../../apis/apis';
import AddCategoryModal from '../../components/add-category-modal/AddCategoryModal.component';
import Category from '../../components/category/Category.component';
import FilterHeader from '../../components/filter-header/FilterHeader.component';
import Message from '../../components/message/Message.component';
import Loader from '../loader/Loader';
import './categories.styles.scss';

const Categories = () => {
  const authHeader = useAuthHeader();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };
  const { data, error, isLoading, isFetching, isError } = useQuery(
    'categories',
    () => getCategories(config),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || isFetching) return <Loader />;

  if (isError) return <Message content={error} />;

  return (
    <div className="categories-container container pt-5">
      <h2>Categories</h2>
      <FilterHeader />
      <div className="categories">
        {data?.data.map((category: any) => (
          <Category key={category._id} category={category} />
        ))}
      </div>
      <AddCategoryModal />
    </div>
  );
};

export default Categories;
