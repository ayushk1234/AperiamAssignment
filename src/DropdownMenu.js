import React, { useState } from 'react';

const DropdownMenu = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = Array.from({ length: 20 }, (_, i) => `Option ${i + 1}`);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          -- Select an option --
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
};

export default DropdownMenu;
