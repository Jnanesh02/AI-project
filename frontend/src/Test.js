import React from "react";
// import axios from "axios";
const Test = () => {
  //   const handleClick = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/auth/youtube");
  //       console.log(response);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  return (
    <div>
      <form action="http://localhost:3000/auth/youtube" method="get">
        <input type="submit" value="Press to log in" />
      </form>
    </div>
  );
};

export default Test;
