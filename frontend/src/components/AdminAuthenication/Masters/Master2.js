import React, { useEffect, useState } from "react";
import EditModal2 from "./EditModal2";

import "./Table.css";
import axios from "axios";

const Master2 = () => {
  const [tones, setTones] = useState([]);
  const [editingTone, setEditingTone] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getTones = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/all-assistance-instructions`,
        {
          headers: { authorization: token },
        }
      );
      // console.log("response", response.data);
      setTones(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTones();
  }, []);
  const handleEdit = (tone) => {
    setEditingTone(tone);
    setModalOpen(true);
  };

  const handleCreate = async () => {
    setEditingTone({ _id: "", tone: "", description: "" });
    setModalOpen(true);

    // try {
    //   const token = localStorage.getItem("adminToken");
    //   const response = await axios.post(
    //     `${process.env.REACT_APP_BACKEND_URL}/assistance-instructions`,
    //     { headers: { authorization: token } }
    //   );
    //   console.log("Created new tone: ", response.data);
    // } catch (err) {
    //   console.error(err.message);
    // }
  };
  const handleSave = async (id, newName, newDescription) => {
    console.log("id inside handleSave", tones);
    if (id) {
      // Edit existing tone
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/update-assistance-instructions/${id}`,
        {
          tone: newName,
          description: newDescription,
        },
        { headers: { authorization: token } }
      );
      console.log("response in handleSave", response.data);
      const updatedTones = tones.map((currTone) =>
        currTone._id === id
          ? {
              ...currTone,
              tone: response.data.tone,
              description: response.data.description,
            }
          : currTone
      );
      console.log("updated tones", updatedTones);
      setTones(updatedTones);
      // setTones((prevTones)=>{
      //   ...prevTones,
      //   response.data
      // })
    } else {
      // Create new tone logic
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/assistance-instructions`,
          { tone: newName, description: newDescription },
          { headers: { authorization: token } }
        );
        console.log("Created new tone: ", response.data);

        // Update the state with the newly created tone
        setTones([...tones, response.data]); // Add the created tone to the state
      } catch (err) {
        console.error(err.message);
        // Handle errors appropriately (e.g., display error message to the user)
      }
    }
    setModalOpen(false);
  };

  const handleDelete = (tone) => {
    setTones(tones.filter((t) => t.id !== tone.id));
  };

  const handleCancel = () => {
    setEditingTone(null);
    setModalOpen(false);
  };

  return (
    <div>
      <h1>
        <strong>ASSISTANCE</strong>
      </h1>
      <table className="border table table-bordered border-3 border-black">
        <thead className="border border-3 border-black">
          <tr>
            <th>
              <strong>Tones</strong>
            </th>
            <th>
              <strong>Description</strong>
            </th>
            <th>
              <strong>Actions</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {tones.map((currTone) => (
            <tr key={currTone.id}>
              <td>
                <strong>{currTone.tone}</strong>
              </td>
              <td>{currTone.description}</td>
              <td>
                <button onClick={() => handleEdit(currTone)}>Edit</button>
                <button onClick={() => handleDelete(currTone)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleCreate}>Create New Tone</button>
      </div>
      {modalOpen && (
        <EditModal2
          plan={editingTone}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Master2;
