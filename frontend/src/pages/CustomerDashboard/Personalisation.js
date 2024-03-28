import React, { useState } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import "./Personalisation.css";

const components = { DropdownIndicator: null };
const options = [
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
];

function PersonalisationForm() {
  const [showForm, setShowForm] = useState(false);
  const [values, setValues] = useState({
    tone: "",
    style: "",
    emojis: "",
    description: "",
  });

  const handleChange = (field, selectedOption) => {
    if (field === "emojis") {
      // For emojis, we directly set the value since it's an object
      setValues({ ...values, [field]: selectedOption });
    } else {
      // For other fields, we set the value property of selectedOption
      setValues({ ...values, [field]: selectedOption.value });
    }
  };

  // const handleEmojisChange = (selectedOption) => {
  //   console.log("selectedOption:", selectedOption);
  //   console.log("selectedOption.value:", selectedOption);
  //   setValues({
  //     ...values,
  //     emojis: selectedOption.value,
  //   }); // Update state for emojis properly
  // };

  const handleTextareaChange = (event) => {
    setValues({ ...values, description: event.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("FormData:", values);
      const token = localStorage.getItem("token");
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/createassistant`,
        { data: values, id: tokenData.userId }
      );

      // Reset form after successful submission
      setValues({
        tone: "",
        style: "",
        emojis: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      width: "60%",

      margin: "0.5rem auto ",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #080808",
    },

    button: {
      padding: "10px 20px",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "black",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    select: {
      border: "black",
      control: (styles, { isFocused }) => ({
        ...styles,
        borderColor: isFocused ? "black" : "#080808",
        boxShadow: isFocused ? "0 0 0 1px black" : "black",
      }),
    },
    paraStyle: {
      fontSize: "16px",

      lineHeight: "1.6",
      marginBottom: "20px",
    },
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  return (
    <div className="container mt-5">
      <div className="row ">
        <div className="col-md-12 ">
          <button className="btn btn-primary open-form" onClick={toggleModal}>
            Assistance Instructions
          </button>
          {isOpen && (
            <div
              className="modal mx-auto"
              style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}>
              <div className="modal-dialog">
                <div
                  className="modal-content"
                  style={{ width: "200%", marginLeft: "-16rem" }}>
                  <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeForm}></button>
                  </div>
                  <div className="modal-body">
                    <div>
                      <div>
                        <div className="">
                          <p className="Form-para" style={styles.paraStyle}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Accusamus est dignissimos sapiente,
                            necessitatibus nobis quam? Ratione iste, debitis
                            explicabo reprehenderit corrupti laboriosam
                            quibusdam incidunt aperiam? Magnam illum sed a
                            consequatur!
                          </p>
                        </div>
                        <div className="main-section-tn">
                        <div className="label-selection-input">
                          <label className="mb-2">Tone</label>
                          <Select
                            // isMulti
                            isClearable
                            
                            options={options}
                            onChange={(selectedOption) =>
                              handleChange("tone", selectedOption)
                            }
                            styles={styles.select} // Apply custom styles to the Select component
                          />
                        </div>
                        <div className="label-selection-input">
                          <label className="mb-2">Style</label>
                          <Select
                            // isMulti
                            isClearable
                            options={options}
                            onChange={(selectedOption) =>
                              handleChange("style", selectedOption)
                            }
                            styles={styles.select} // Apply custom styles to the Select component
                          />
                        </div>
                        <div className="label-selection-input">
                          <label className="mb-2">Emojis</label>
                          <CreatableSelect
                            components={components}
                            isClearable
                            value={values.emojis}
                            onChange={(selectedOption) =>
                              handleChange("emojis", selectedOption)
                            }
                            styles={styles.select} // Apply custom styles to the Select component
                          />
                        </div>
                        <div className="label-selection-input">
                          <label className="mb-2">Channel Description</label>
                          <textarea
                            style={styles.textarea}
                            value={values.description}
                            onChange={handleTextareaChange}
                            placeholder="Enter description here..."
                            rows={4}
                          />
                        </div>
                        </div>
                        <div className="mx-auto">
                          <button style={styles.button} onClick={handleSubmit}>
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeForm}>Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalisationForm;
