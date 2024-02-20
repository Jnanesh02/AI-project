// import React from 'react'

// function Master1() {
//   return (
//     <div>Master1</div>
//   )
// }

// export default Master1

// import React, { useState } from 'react';
// import "./Table.css";

// const Master1 = () => {
//   const [plans, setPlans] = useState([
//     { id: 1, name: 'Basic Plan', price: '$10/month' },
//     { id: 2, name: 'Pro Plan', price: '$20/month' },
//     { id: 3, name: 'Free Plan', price: 'Free' },
//   ]);
//   const [editingPlan, setEditingPlan] = useState(null);
//   const [newPlan, setNewPlan] = useState({ name: '', price: '' });

//   const handleEdit = (plan) => {
//     setEditingPlan(plan.id);
//     setNewPlan({ name: plan.name, price: plan.price });
//   };

//   const handleSave = (id) => {
//     setPlans(plans.map(plan => (plan.id === id ? { ...plan, name: newPlan.name, price: newPlan.price } : plan)));
//     setEditingPlan(null);
//   };

//   const handleDelete = (id) => {
//     setPlans(plans.filter(plan => plan.id !== id));
//   };

//   const handleCancel = () => {
//     setEditingPlan(null);
//     setNewPlan({ name: '', price: '' });
//   };

//   return (
//     <div>
//       <h1>Plan Management</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {plans.map(plan => (
//             <tr key={plan.id}>
//               <td>
//                 {editingPlan === plan.id ? (
//                   <input
//                     type="text"
//                     value={newPlan.name}
//                     onChange={e => setNewPlan({ ...newPlan, name: e.target.value })}
//                   />
//                 ) : (
//                   plan.name
//                 )}
//               </td>
//               <td>
//                 {editingPlan === plan.id ? (
//                   <input
//                     type="text"
//                     value={newPlan.price}
//                     onChange={e => setNewPlan({ ...newPlan, price: e.target.value })}
//                   />
//                 ) : (
//                   plan.price
//                 )}
//               </td>
//               <td>
//                 {editingPlan === plan.id ? (
//                   <>
//                     <button onClick={() => handleSave(plan.id)}>Save</button>
//                     <button onClick={handleCancel}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => handleEdit(plan)}>Edit</button>
//                     <button onClick={() => handleDelete(plan.id)}>Delete</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Master1;
// Master1.js
import React, { useState } from 'react';
import EditModal from './EditModal';
import "./Table.css";

const Master1 = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Basic Plan', price: '$10/month' },
    { id: 2, name: 'Pro Plan', price: '$20/month' },
    { id: 3, name: 'Free Plan', price: 'Free' },
  ]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setModalOpen(true);
  };

  const handleSave = (id, newName, newPrice) => {
    setPlans(plans.map(plan => (plan.id === id ? { ...plan, name: newName, price: newPrice } : plan)));
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  const handleCancel = () => {
    setEditingPlan(null);
    setModalOpen(false);
  };

  return (
    <div>
      <h1>Plan Management</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{plan.price}</td>
              <td>
                <button onClick={() => handleEdit(plan)}>Edit</button>
                <button onClick={() => handleDelete(plan.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <EditModal
          plan={editingPlan}
          onSave={handleSave}
          onCancel={handleCancel}
          setOpenModal={setModalOpen}
        />
      )}
    </div>
  );
};

export default Master1;
