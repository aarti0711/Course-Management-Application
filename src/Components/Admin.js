import React, { useState, useEffect } from "react";

import UserService from "../api/user.service";

const Admin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdmin().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Admin;
