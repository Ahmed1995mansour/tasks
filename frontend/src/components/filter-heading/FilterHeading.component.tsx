type props = {
  taskCategory: string;
  date: Date;
};

const FilterHeading: React.FC<props> = ({ taskCategory, date }) => {
  return (
    <h3 className="filter-result-heading">{`${taskCategory} tasks of ${date.toDateString()}`}</h3>
  );
};

export default FilterHeading;
