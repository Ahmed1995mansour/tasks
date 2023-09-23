import { useState } from 'react';
import Select from 'react-select';
import './filter-header.styles.scss';

const FilterHeader = ({ onChangeHandler }: any) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const selectOptions = [
    {
      value: 'completed',
      label: 'Completed',
    },
    {
      value: 'notCompleted',
      label: 'Not Completed',
    },
  ];

  const onselectChange = () => {};
  return (
    <div className="filter-header container">
      <div className="search-bar">
        <input
          className="search"
          onChange={onChangeHandler}
          type="search"
          placeholder="Search..."
        />
      </div>

      <div className="select">
        <Select
          defaultValue={selectedOption}
          onChange={onselectChange}
          options={selectOptions}
          placeholder="Select by"
        />
      </div>
    </div>
  );
};

export default FilterHeader;
