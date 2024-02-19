// import React from "react";
// import "./EditModal.css"


// function EditModal({ setOpenModal }) {
//   return (
//     <div className="modalBackground">
//       <div className="modalContainer">
//         <div className="titleCloseBtn">
//           <button
//             onClick={() => {
//               setOpenModal(false);
//             }}
//           >
//             X
//           </button>
//         </div>
//         <div className="title">
//           <h1>Are You Sure You Want to Continue?</h1>
//         </div>
//         <div className="body">
//           <p>The next page looks amazing. Hope you want to go there!</p>
//         </div>
//         <div className="footer">
//           <button
//             onClick={() => {
//               setOpenModal(false);
//             }}
//             id="cancelBtn"
//           >
//             Cancel
//           </button>
//           <button>Continue</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditModal;

// import React, { useState } from "react";
// import "./EditModal.css";

// function EditModal({ setOpenModal }) {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Here you can implement the logic to handle the form submission
//     // For example, you can send the data to an API endpoint or perform any other action
//     console.log("Submitted form data:", { name, price });

//     // Close the modal after form submission
//     setOpenModal(false);
//   };

//   return (
//     <div className="modalBackground">
//       <div className="modalContainer">
//         <div className="titleCloseBtn">
//           <button onClick={() => setOpenModal(false)}>X</button>
//         </div>
//         <div className="title">
//           <h1>Edit Plan</h1>
//         </div>
//         <div className="body">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="name">Name:</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="price">Price:</label>
//               <input
//                 type="text"
//                 id="price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </div>
//             <div className="footer">
//               <button
//                 type="button"
//                 onClick={() => setOpenModal(false)}
//                 id="cancelBtn"
//               >
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

// export default EditModal;
// EditModal.js
import React, { useState, useEffect } from "react";
import "./EditModal.css";

function EditModal({ plan, onSave, onCancel, setOpenModal }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (plan) {
      setName(plan.name);
      setPrice(plan.price);
    }
  }, [plan]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(plan.id, name, price);
    setOpenModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={onCancel}>X</button>
        </div>
        <div className="title">
          <h1>Edit Plan</h1>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="footer">
              <button
                type="button"
                onClick={onCancel}
                id="cancelBtn"
              >
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
