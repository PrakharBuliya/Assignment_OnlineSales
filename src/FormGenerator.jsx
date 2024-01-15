import React, { useState } from "react";
import FormField from "./FormField";
import "./FormGenerator.css";

const FormGenerator = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleAddField = (fieldType) => {
    const label = prompt("Enter a label for this field:");

    if (label === null) {
      return;
    }

    const newField = {
      id: Date.now(),
      type: fieldType,
      label: label || `Field ${Date.now()}`,
      options: fieldType === "dropdown" ? ["Option 1", "Option 2"] : [],
    };

    setFormFields((prevFields) => [...prevFields, newField]);
    setFormData((prevData) => ({ ...prevData, [newField.id]: "" }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [newField.id]: "" }));
  };

  const handleRemoveField = (fieldId) => {
    setFormFields((prevFields) =>
      prevFields.filter((field) => field.id !== fieldId)
    );
    setFormData((prevData) => {
      const { [fieldId]: removedField, ...newData } = prevData;
      return newData;
    });
    setFormErrors((prevErrors) => {
      const { [fieldId]: removedError, ...newErrors } = prevErrors;
      return newErrors;
    });
  };

  const handleInputChange = (fieldId, value) => {
    setFormData((prevData) => ({ ...prevData, [fieldId]: value }));
  };

  const handleValidation = () => {
    const errors = {};
    formFields.forEach((field) => {
      if (!formData[field.id]) {
        errors[field.id] = "Field is required";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("Form data submitted:", formData);
    } else {
      console.log("Form validation failed");
    }
  };

  const handleSaveConfig = () => {
    const formConfig = JSON.stringify(formFields);
    console.log("Form configuration saved:", formConfig);
  };

  const handleLoadConfig = (config) => {
    const parsedConfig = JSON.parse(config);
    setFormFields(parsedConfig);
    setFormData({});
    setFormErrors({});
  };

  return (
    <div className="container">
      <h1>Form Generator</h1>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            formData={formData}
            handleInputChange={handleInputChange}
            handleRemoveField={handleRemoveField}
            formErrors={formErrors}
          />
        ))}
        <div>
          <button type="button" onClick={() => handleAddField("text")}>
            Add Text Input
          </button>
          <button type="button" onClick={() => handleAddField("textarea")}>
            Add Text Area
          </button>
          <button type="button" onClick={() => handleAddField("dropdown")}>
            Add Dropdown
          </button>
          <button type="button" onClick={() => handleAddField("checkbox")}>
            Add Checkbox
          </button>
          <button type="button" onClick={() => handleAddField("radio")}>
            Add Radio Button
          </button>
        </div>
        <div>
          <button type="submit">Submit Form</button>
          <button type="button" onClick={handleSaveConfig}>
            Save Configuration
          </button>
          <input
            type="file"
            onChange={(e) => handleLoadConfig(e.target.files[0])}
          />
        </div>
      </form>
    </div>
  );
};

export default FormGenerator;
