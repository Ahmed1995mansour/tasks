import { format } from 'date-fns';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Select from 'react-select';
import './filter-bar.styles.css';

const FilterBar = () => {
  const [selected, setSelected] = useState<Date>();
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      value: 'All',
      label: 'All',
    },
    {
      Value: 'Done',
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

  const onselectChange = (event: any) => {
    setSelectedOption(event.value);
  };
  return (
    <div className=" container filter-bar d-flex justify-content-around">
      <div className="select">
        <Select defaultValue={selectedOption} onChange={onselectChange} options={options} />
      </div>
      <div className="date-picker">
        <DayPicker mode="single" selected={selected} onSelect={setSelected} footer={footer} />
      </div>
    </div>
  );
};

export default FilterBar;
