import { format } from 'date-fns';
import { useState } from 'react';
import 'react-day-picker/dist/style.css';
import Select from 'react-select';
import DatePiker from '../date-picker/DatePiker.component';
import FilterHeading from '../filter-heading/FilterHeading.component';
import './filter-bar.styles.css';

const FilterBar = () => {
  const date = new Date();
  const [selected, setSelected] = useState<Date>(date);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      value: 'All',
      label: 'All',
    },
    {
      value: 'Done',
      label: 'Done',
    },
    {
      value: 'Pending',
      label: 'Pending',
    },
  ];

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }

  const onselectChange = (option: any) => {
    setSelectedOption(option.value);
  };

  const onSelectDate = (date: any) => {
    setSelected(date);
  };
  return (
    <div className=" container filter-bar d-flex justify-content-around">
      <div className="select">
        <Select
          defaultValue={selectedOption}
          onChange={onselectChange}
          options={options}
          placeholder="Select Category"
        />
      </div>
      <div className="filter-heading">
        <FilterHeading taskCategory={selectedOption ? selectedOption : 'All'} date={selected} />
      </div>
      <div className="date-picker">
        <DatePiker handleSelectDate={onSelectDate} />
      </div>
    </div>
  );
};

export default FilterBar;
