// import React, { useState, useEffect } from "react";
// import "./EditModal.css";

// function EditModal2({ plan, onSave, onCancel }) {
//   const [formData, setFormData] = useState({
//     name: plan ? plan.name : "",
//     description: plan ? plan.description : "",
//     isDescriptionExpanded: false,
//   });

//   useEffect(() => {
//     if (plan) {
//       setFormData(plan);
//     }
//   }, [plan]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleDescriptionFocus = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       isDescriptionExpanded: true,
//     }));
//   };

//   const handleDescriptionBlur = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       isDescriptionExpanded: false,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSave(plan ? plan.id : null, formData.name, formData.description);
//   };

//   return (
//     <div className="modalBackground">
//       <div className="modalContainer">
//         <div className="titleCloseBtn">
//           <button onClick={onCancel}>X</button>
//         </div>
//         <div className="title">
//           <h1>{plan ? "Edit Tone" : "Create New Tone"}</h1>
//         </div>
//         <div className="body">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Tone Name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group description-container">
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 onFocus={handleDescriptionFocus}
//                 onBlur={handleDescriptionBlur}
//                 style={{ height: formData.isDescriptionExpanded ? "200px" : "auto" }}
//               />
//             </div>
//             <div className="footer">
//               <button type="button" onClick={onCancel} id="cancelBtn">
//                 Cancel
//               </button>
//               <button type="submit">Save</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditModal2;
import React, { useState, useEffect } from "react";
import "./EditModal.css";

function EditModal2({ plan, onSave, onCancel }) {
  console.log("plan in editmodal", plan);
  const [formData, setFormData] = useState({
    id: plan?._id || "",
    tone: plan ? plan.tone : "",
    description: plan ? plan.description : "",
  });

  useEffect(() => {
    if (plan) {
      setFormData(plan);
    }
  }, [plan]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("inside handleChange", name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAutoResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(plan ? plan.id : null, formData.tone, formData.description);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className="cross-t" onClick={onCancel}>X</button>
        </div>
        <div className="title">
          <h1>{plan ? "Edit Tone" : "Create New Tone"}</h1>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="form-group frm-gp">
              <input
                type="text"
                name="tone"
                placeholder="Tone Name"
                value={formData.tone}
                onChange={handleChange}
                class="form-control"
              />
            </div>
            <div className="form-group frm-gp">
              <textarea
              class="form-control"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                onInput={handleAutoResize}
                style={{ width: "100%", height: "100px" }}
              />
            </div>
            <div className="footer">
              <button type="button" className="cancel-cl" onClick={onCancel} id="cancelBtn">
                Cancel
              </button>
              <button class="save-vv" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal2;
