import { useState } from "react";
import axios from "axios";
const Test = () => {
  const [formData, setFormData] = useState({
    tone: "",
    style: "",
    emoji: "",
    description: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async () => {
    // console.log(formData);
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    console.log(tokenData);

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createassistant`,
      { formData, userId: tokenData.userId }
    );
    console.log("response from the backend", response.data);
  };

  return (
    <>
      <input
        type="text"
        placeholder="tone"
        value={formData.tone}
        name="tone"
        onChange={onChangeInput}></input>
      <input
        type="text"
        placeholder="style"
        value={formData.style}
        name="style"
        onChange={onChangeInput}></input>
      <input
        type="text"
        placeholder="emoji"
        value={formData.emoji}
        name="emoji"
        onChange={onChangeInput}></input>
      <input
        type="text"
        placeholder="description"
        value={formData.description}
        name="description"
        onChange={onChangeInput}></input>
      <button onClick={handleSubmit}>submit</button>
    </>
  );
};

export default Test;
