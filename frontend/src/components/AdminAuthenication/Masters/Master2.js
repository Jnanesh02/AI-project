import React, { useEffect, useState } from "react";
import EditModal2 from "./EditModal2";

import "./Table.css";
import axios from "axios";

const Master2 = () => {
  const [tones, setTones] = useState([
    {
      id: 1,
      name: "sai Tone",
      description:
        "The novelist J.K. Rowling once said, “there’s always room for a story that can transport people to another place.” But what if that place we’re transported to is here, inside the rich web of life of our Mother Earth? What if her story, told through us, becomes a portal through which we can deeply connect to our own nature and discover—without judgement—our heart-centered humanity within the whole of nature.",
    },
  ]);
  // const [tones, setTones] = useState([]);
  const [editingTone, setEditingTone] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getTones = async () => {
    // try {
    //   const response = await axios.get(
    //     `${process.env.REACT_APP_BACKEND_URL}/all-assistance-instructions`
    //   );
    //   console.log(response.data);
    // } catch (err) {
    //   console.error(err.message);
    // }
  };

  useEffect(() => {
    getTones();
  }, []);
  const handleEdit = (tone) => {
    setEditingTone(tone);
    setModalOpen(true);
  };

  const handleCreate = async () => {
    setEditingTone(null);
    setModalOpen(true);
    // try {
    //   const token = localStorage.getItem("token");
    //   const response = await axios.post(
    //     `${process.env.REACT_APP_BACKEND_URL}/assistance-instructions`,
    //     { headers: { authorization: token } }
    //   );
    //   console.log("Created new tone: ", response.data);
    // } catch (err) {
    //   console.error(err.message);
    // }
  };
  const handleSave = (id, newName, newDescription) => {
    if (id) {
      // Edit existing tone
      const updatedTones = tones.map((tone) =>
        tone.id === id
          ? { ...tone, name: newName, description: newDescription }
          : tone
      );
      setTones(updatedTones);
    } else {
      // Create new tone
      const newTone = {
        id: tones.length + 1,
        name: newName,
        description: newDescription,
      };
      setTones([...tones, newTone]);
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
          {tones.map((tone) => (
            <tr key={tone.id}>
              <td>
                <strong>{tone.name}</strong>
              </td>
              <td>{tone.description}</td>
              <td>
                <button onClick={() => handleEdit(tone)}>Edit</button>
                <button onClick={() => handleDelete(tone)}>Delete</button>
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
