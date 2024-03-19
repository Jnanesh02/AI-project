
import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

const EditModal = ({ plan, onSave, onCancel }) => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState([]);
  const [planName, setPlanName] = useState(plan ? plan.subscriptionPlanName : '');
  const [price, setPrice] = useState(plan ? plan.price : '');

  const handleChangePlanName = (event) => {
    setPlanName(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
        break;
      default:
        return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const planData = {
      subscriptionPlanName: planName,
      price: price,
      features: value.map((option) => option.value),
    };
    console.log('Updated Details:');
    console.log('Plan Name:', planData.subscriptionPlanName);
    console.log('Price:', planData.price);
    console.log('Features:', planData.features);
    onSave(planData);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={onCancel}>X</button>
        </div>
        <div className="title">
          <h1>{plan ? 'Edit Plan' : 'Create Plan'}</h1>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="subscriptionPlanName">Plan Name</label>
              <input
                type="text"
                name="subscriptionPlanName"
                placeholder="Enter plan name"
                value={planName}
                onChange={handleChangePlanName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="text"
                name="price"
                placeholder="Enter price"
                value={price}
                onChange={handleChangePrice}
              />
            </div>
            <div className="form-group">
              <label htmlFor="features">Features</label>
              <CreatableSelect
                components={components}
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={(newValue) => setValue(newValue)}
                onInputChange={(newValue) => setInputValue(newValue)}
                onKeyDown={handleKeyDown}
                placeholder="Type features and press enter..."
                value={value}
              />
            </div>
            <div className="footer">
              <button type="button" onClick={onCancel} id="cancelBtn">
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
