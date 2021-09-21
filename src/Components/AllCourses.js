import { Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import base_url from "../api/bootapi";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import _ from "lodash";

const AllCourses = () => {
  useEffect(() => {
    document.title = "All Course";
    getAllCoursesFromServer();
  }, []);

  const [courses, setCourses] = useState([]);
  const history = useHistory();
  const pageSize = 5;
  const [paginatedCourse, setPaginatedCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);

  //function call server

  const getAllCoursesFromServer = () => {
    axios.get(`${base_url}/courses`).then(
      (response) => {
        //success
        console.log(response);
        console.log(response.data);
        toast.success("Course has been loaded", {
          position: "bottom-center",
        });
        setCourses(response.data);
        setPaginatedCourse(_(response.data).slice(0).take(pageSize).value());
      },
      (error) => {
        console.log(error);
        toast.error("Something went wrong", {
          position: "bottom-center",
        });
      }
    );
  };

  const deleteCourse = (id) => {
    axios.delete(`${base_url}/courses/${id}`).then(
      (response) => {
        toast.success("course deleted");

        console.log(response);
        localStorage.removeItem("jwt");
      },
      (error) => {
        toast.error("course not deleted !! server problem");
        console.log(error);
      }
    );
  };

  const addCourse = () => {
    history.push("/add-course/_add");
  };

  const pageCount = courses ? Math.ceil(courses.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedCourse = _(courses).slice(startIndex).take(pageSize).value();
    setPaginatedCourse(paginatedCourse);
  };

  return (
    <div>
      <div class="card o-hidden border-0 shadow-lg my-4">
        <div className="container">
          <h1 className="text-center mb-4"> Course List</h1>
          <div className="row">
            <button
              className="text-center mb-4"
              style={{ height: "38px", backgroundColor: "	#ffa07a" }}
              onClick={addCourse}
            >
              {" "}
              Add Course
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th> Course Id</th>
                <th> Course Name</th>
                <th> Course Description</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourse.map((Course) => (
                <tr key={Course.id}>
                  <td> {Course.id}</td>

                  <td> {Course.title}</td>
                  <td> {Course.description}</td>
                  <td>
                    <Link class=" mr-2" to={`/course/edit/${Course.id}`}>
                      <i
                        class="fa fa-edit"
                        className="btn btn mr-4"
                        style={{ heigth: "40px", backgroundColor: "#db7093" }}
                        aria-hidden="true"
                      >
                        Edit
                      </i>
                    </Link>
                    <button
                      style={{
                        marginLeft: "10px",
                        height: "38px",

                        backgroundColor: "#008080",
                        border: "none",
                        borderRadius: "5px",
                      }}
                      onClick={() => deleteCourse(Course.id)}
                    >
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="d-flex justify-content-center">
            <ui className="pagination">
              {pages.map((page) => (
                <li
                  className={
                    page === currentPage ? "page-item active" : "page:item"
                  }
                >
                  <p className="page-link" onClick={() => pagination(page)}>
                    {page}
                  </p>
                </li>
              ))}
            </ui>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default AllCourses;
