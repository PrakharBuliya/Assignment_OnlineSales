// FormField.js
import React from "react";

const FormField = ({
  field,
  formData,
  handleInputChange,
  handleRemoveField,
  formErrors,
}) => (
  <div key={field.id}>
    <label>{field.label || `Field ${field.id}`}</label>
    {field.type === "text" && (
      <input
        type="text"
        value={formData[field.id]}
        onChange={(e) => handleInputChange(field.id, e.target.value)}
      />
    )}
    {field.type === "textarea" && (
      <textarea
        value={formData[field.id]}
        onChange={(e) => handleInputChange(field.id, e.target.value)}
      />
    )}
    {field.type === "dropdown" && (
      <select
        value={formData[field.id]}
        onChange={(e) => handleInputChange(field.id, e.target.value)}
      >
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )}
    {field.type === "checkbox" && (
      <input
        type="checkbox"
        checked={formData[field.id]}
        onChange={(e) => handleInputChange(field.id, e.target.checked)}
      />
    )}
    {field.type === "radio" && (
      <input
        type="radio"
        checked={formData[field.id]}
        onChange={(e) => handleInputChange(field.id, e.target.checked)}
      />
    )}
    <button type="button" onClick={() => handleRemoveField(field.id)}>
      Remove
    </button>
    {formErrors[field.id] && (
      <p style={{ color: "red" }}>{formErrors[field.id]}</p>
    )}
  </div>
);

export default FormField;
