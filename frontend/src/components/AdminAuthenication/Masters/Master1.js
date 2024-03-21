// // Master1.js
// import React, { useEffect, useState } from "react";
// import EditModal from "./EditModal";
// import "./Table.css";
// import axios from "axios";

// const Master1 = () => {
//   const [plans, setPlans] = useState([]);
//   const [editingPlan, setEditingPlan] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const getPlanDetails = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/getPlans`,
//         { headers: { authorization: token } }
//       );
//       setPlans(response.data);
//     } catch (err) {
//       console.error("Error fetching plans:", err);
//     }
//   };

//   useEffect(() => {
//     getPlanDetails();
//   }, []);

//   const handleEdit = (plan) => {
//     setEditingPlan(plan);
//     setModalOpen(true);
//   };

//   const handleCreate = () => {
//     setEditingPlan(null);
//     setModalOpen(true);
//   };

//   const handleSave = async (formData) => {
//     try {
//       const token = localStorage.getItem("token");
//       let response;
//       if (!formData._id) {
//         response = await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/addPlans`,
//           formData,
//           { headers: { authorization: token } }
//         );
//       } else {
//         response = await axios.put(
//           `${process.env.REACT_APP_BACKEND_URL}/plans/${formData._id}`,
//           formData,
//           { headers: { authorization: token } }
//         );
//         console.log(response.data);
//       }
//       // Update plans after successful save
//       getPlanDetails();
//       setModalOpen(false);
//       console.log(response.data);
//     } catch (err) {
//       console.error("Error saving plan:", err);
//     }
//   };
//    const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       console.log("token in handledelete", token);
//       console.log("id in handledelete", id);

//       const response = await axios.delete(
//         `${process.env.REACT_APP_BACKEND_URL}/plans/${id}`,
//         {
//           headers: { authorization: token },
//         }
//       );
//       console.log(response.data);
//       // Update plans after successful delete
//       getPlanDetails();
//     } catch (err) {
//       console.error("Error deleting plan:", err);
//     }
//   };

//   const handleCancel = () => {
//     setEditingPlan(null);
//     setModalOpen(false);
//   };

//   return (
//     <div>
//       <h1>Plan Management</h1>
//       <table>
//         {/* Table headers */}
//         <tbody>
//           {plans.map((plan) => (
//             <tr key={plan._id}>
//               <td>{plan.subscriptionPlanName}</td>
//               <td>{plan.price}</td>
//               <td>{plan.features}</td>
//               <td>
//                 <button onClick={() => handleEdit(plan)}>Edit</button>
//                 <button onClick={() => handleDelete(plan._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div>
//         <button onClick={handleCreate}>Create New Plan</button>
//       </div>
//       {modalOpen && (
//         <EditModal
//           plan={editingPlan}
//           onSave={handleSave}
//           onCancel={handleCancel}
//           setOpenModal={setModalOpen}
//         />
//       )}

//     </div>
//   );
// };
// export default Master1;
import React, { useState, useEffect } from "react";
import EditModal from "./EditModal";
import ConfirmationModal from "./ConfirmationModal"; // Import the ConfirmationModal component
import "./Table.css";
import axios from "axios";
import CreatableSelect from "react-select/creatable";

const Master1 = () => {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  const getPlanDetails = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getPlans`,
        { headers: { authorization: token } }
      );
      setPlans(response.data);
      console.log("getplandetails", response.data);
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  useEffect(() => {
    getPlanDetails();
  }, []);

  const handleEdit = (plan) => {
    console.log("inside handleEdit", plan);
    setEditingPlan(plan);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditingPlan(null);
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      const token = localStorage.getItem("adminToken");
      let response;
      console.log("formdata", formData);
      if (!formData._id) {
        response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/addPlans`,
          formData,
          { headers: { authorization: token } }
        );
      } else {
        response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/plans/${formData._id}`,
          formData,
          { headers: { authorization: token } }
        );
      }
      // Update plans after successful save
      getPlanDetails();
      setModalOpen(false);
    } catch (err) {
      console.error("Error saving plan:", err);
    }
  };
  const handleDelete = (plan) => {
    setPlanToDelete(plan);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/plans/${planToDelete._id}`,
        {
          headers: { authorization: token },
        }
      );
      console.log(response.data);
      // Update plans after successful delete
      getPlanDetails();
      setShowConfirmationModal(false);
    } catch (err) {
      console.error("Error deleting plan:", err);
    }
  };

  const handleCancel = () => {
    setEditingPlan(null);
    setModalOpen(false);
    setPlanToDelete(null);
    setShowConfirmationModal(false);
  };

  return (
    <div>
      <h1>Plan Management</h1>
      <table>
        {/* Table headers */}
        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.subscriptionPlanName}</td>
              <td>{plan.price}</td>
              <td>{plan.features}</td>
              <td>
                <button onClick={() => handleEdit(plan)}>Edit</button>
                <button onClick={() => handleDelete(plan)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleCreate}>Create New Plan</button>
      </div>
      {modalOpen && (
        <EditModal
          plan={editingPlan}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      {showConfirmationModal && (
        <ConfirmationModal
          onConfirmDelete={confirmDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Master1;
