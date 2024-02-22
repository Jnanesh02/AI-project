
import React, { useState } from 'react';
import EditModal from './EditModal';
import ConfirmationModal from './ConfirmationModal';
import "./Table.css";

const Master1 = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Basic Plan', price: '$10/month' },
    { id: 2, name: 'Pro Plan', price: '$20/month' },
    { id: 3, name: 'Free Plan', price: 'Free' },
  ]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setModalOpen(true);
  };
  
  const handleCreate = () => {
    setEditingPlan(null);
    setModalOpen(true);
  };

  const handleSave = (id, newName, newPrice) => {
    if (id) {
      // Edit existing plan
      setPlans(plans.map(plan => (plan.id === id ? { ...plan, name: newName, price: newPrice } : plan)));
    } else {
      // Create new plan
      const newPlan = {
        id: plans.length + 1,
        name: newName,
        price: newPrice
      };
      setPlans([...plans, newPlan]);
    }
    setModalOpen(false);
  };

  const handleDelete = (plan) => {
    setPlanToDelete(plan);
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedPlans = plans.filter(plan => plan.id !== planToDelete.id);
    setPlans(updatedPlans);
    setConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setPlanToDelete(null);
    setConfirmationOpen(false);
  };

  const handleCancel = () => {
    setEditingPlan(null);
    setModalOpen(false);
  };

  return (
    <div>
      <h1><strong>Plan Management</strong></h1>
      <table>
        <thead>
          <tr>
            <th><strong>Name</strong></th>
            <th><strong>Price</strong></th>
            <th><strong>Actions</strong></th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td><strong>{plan.name}</strong></td>
              <td><strong>{plan.price}</strong></td>
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
          setOpenModal={setModalOpen}
        />
      )}
      {confirmationOpen && (
        <ConfirmationModal
          onConfirmDelete={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Master1;
