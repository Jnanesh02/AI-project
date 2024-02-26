import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";
import "./Table.css";
import axios from "axios";

const Master1 = () => {
  // const [plans, setPlans] = useState([
  //   // { id: 1, name: 'Basic Plan', price: '$10/month' },
  //   // { id: 2, name: 'Pro Plan', price: '$20/month' },
  //   // { id: 3, name: 'Free Plan', price: 'Free' },
  // ]);
  const [plans, setPlans] = useState([{ _id: "", price: null }]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getPlanDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getPlans`,
        {
          headers: { authorization: token },
        }
      );
      // console.log(response.data);
      setPlans(response.data);
    } catch (err) {}
  };
  // console.log("inside getDetails function", plans);

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setModalOpen(true);
  };
  useEffect(() => {
    getPlanDetails();
    // handleSave();
  }, []);
  useEffect(() => {
    if (editingPlan?.id) {
      // Check if editingPlan has an ID
      getPlanDetails(); // Refetch plans after editing
    }
  }, [editingPlan]);

  const handleSave = async (formdata) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/plans/${formdata._id}`,
      formdata,
      { headers: { authorization: token } }
    );

    // console.log("this is inside", response.data);
    // setPlans(
    //   plans.map((plan) =>
    //     plan.id === id ? { ...plan, name: newName, price: newPrice } : plan
    //   )
    // );
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    // setPlans(plans.filter((plan) => plan.id !== id));
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/plans/${id}`,
        {
          headers: { authorization: token },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
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
            <th>Features</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.subscriptionPlanName}</td>
              <td>{plan.price}</td>
              <td>{plan.features}</td>
              <td>
                <button onClick={() => handleEdit(plan)}>Edit</button>
                <button onClick={() => handleDelete(plan._id)}>Delete</button>
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
