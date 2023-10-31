import { format } from 'date-fns';
import { useState } from 'react';
import 'react-day-picker/dist/style.css';
import Select from 'react-select';
import DatePiker from '../date-picker/DatePiker.component';
import FilterHeading from '../filter-heading/FilterHeading.component';
import './filter-bar.styles.css';

type props = {
  selectDateFilter: Function;
  onSelectOption: Function;
};
const FilterBar: React.FC<props> = ({ selectDateFilter, onSelectOption }) => {
  const date = new Date();
  const [selected, setSelected] = useState<Date>(date);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'done',
      label: 'Done',
    },
    {
      value: 'pending',
      label: 'Pending',
    },
  ];

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }

  const onselectChange = (option: any) => {
    setSelectedOption(option.value);
    onSelectOption(option.value);
  };

  const onSelectDate = (date: any) => {
    selectDateFilter(date);
  };
  return (
    <div className=" container filter-bar d-flex justify-content-around">
      <div className="date-picker">
        <DatePiker handleSelectDate={onSelectDate} />
      </div>

      <div className="select">
        <Select
          defaultValue={selectedOption}
          onChange={onselectChange}
          options={options}
          placeholder="Select Category"
        />
      </div>
    </div>
  );
};

export default FilterBar;
