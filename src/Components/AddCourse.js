import { Button } from "reactstrap";
import React, { Fragment, useEffect, useState } from "react";
import { Container, Form, FormGroup, Input, InputGroup } from "reactstrap";
import axios from "axios";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";

const AddCourse = () => {
  useEffect(() => {
    document.title = "AddCourse Course";
  }, []);

  const [course, setCourse] = useState({});

  //form handler
  const handleForm = (e) => {
    console.log(course);

    postDatatoServer(course);
    e.preventDefault();
  };

  const postDatatoServer = (data) => {
    axios.post(`${base_url}/courses`, data).then(
      (response) => {
        console.log(response);
        console.log("success");

        toast.success("Course added successfully");
        setCourse({ id: "", title: "", description: " " });
      },
      (error) => {
        console.log(error);
        console.log("error");
        toast.error("Error ! something went wrong");
      }
    );
  };
  return (
    <div class="card o-hidden border-1 shadow-lg my-4">
      <div class="col-xl-10 col-lg-12 col-md-3">
        <div class="card-body p-3">
          <div class="col-lg-7">
            <Fragment>
              <h1 class="h4 text-gray-900 mb-4"> Fill Course Details !!</h1>
              <Form onSubmit={handleForm}>
                <FormGroup>
                  <label for="title">Title</label>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      onChange={(e) => {
                        setCourse({ ...course, title: e.target.value });
                      }}
                      placeholder="Enter here"
                      name="title"
                      id="title"
                    ></Input>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <label for="description">Course Description</label>
                  <InputGroup className="mb-3">
                    <Input
                      type="textarea"
                      placeholder="Enter Description here"
                      name="description"
                      id="description"
                      style={{ height: 100 }}
                      onChange={(e) => {
                        setCourse({ ...course, description: e.target.value });
                      }}
                    ></Input>
                  </InputGroup>
                </FormGroup>

                <Container className="text-center my-3">
                  <Button type="submit" color="success">
                    Add Course
                  </Button>
                  <Button
                    type="reset"
                    style={{ marginLeft: 20 }}
                    onClick={() => {
                      setCourse({ id: " ", title: "", description: "" });
                    }}
                    color="warning ml-2"
                  >
                    Clear
                  </Button>
                </Container>
              </Form>
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddCourse;
