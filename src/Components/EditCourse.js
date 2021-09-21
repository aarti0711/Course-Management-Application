import React, { useState } from "react";
import { FormGroup, InputGroup } from "reactstrap";
import axios from "axios";
import base_url from "../api/bootapi";
import { useHistory, useParams } from "react-router-dom";

function EditCourse(props) {
  let history = useHistory();
  const { id } = useParams();
  const [courses, setCourse] = useState({
    title: "",
    description: "",
  });

  const { title, description } = courses;
  const onInputChange = (e) => {
    setCourse({ ...courses, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${base_url}/courses/${id}`, courses);
    history.push("/");
  };

  return (
    <div className="container">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-1">
          <div class="card-body p-30">
            <div class="row">
              <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                <h1 class="h4 text-gray-900 mb-4">Edit Course</h1>

                <form
                  onSubmit={(e) => {
                    onSubmit(e);
                  }}
                >
                  <FormGroup>
                    <InputGroup className="mb-3">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={(e) => onInputChange(e)}
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="mb-3">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={(e) => onInputChange(e)}
                      />
                    </InputGroup>
                  </FormGroup>

                  <button
                    type="submit"
                    style={{ marginLeft: 50 }}
                    className="btn btn-primary btn"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
