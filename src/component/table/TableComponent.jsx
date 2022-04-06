import React, { useState, useEffect } from "react";
import axios from "axios";
import * as AiIcon from "react-icons/ai";
import * as FaIcon from "react-icons/fa";
import * as MdIcon from "react-icons/md";
import {Modal} from 'bootstrap';

const baseURL = "https://jsonplaceholder.typicode.com/users/";
const TableComponent = () => {
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [flagModal, setflagModal] = useState(false);
  const [modalData, setModalData] = useState({});


  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setUser(response.data);
    });
  }, []);

  useEffect(() => {
       var myModalEl = document.getElementById("exampleModal");
       myModalEl.addEventListener("hidden.bs.modal", function (event) {
         setflagModal(false);
         setModalData({});
       });
  }, [])
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (e) => {
     const path = baseURL.concat(e.target.id);
     const myModal = new Modal(document.getElementById("exampleModal"));
     axios.get(path).then((data) => {
       myModal.show();
       const { email, name } = data.data;
       setflagModal(true);
        setModalData({email, name});
            console.log(data.data);
            console.log(path);
            console.log(e.target.id);
     });
     
  };

  return (
    <>
      <div className="container-sm">
        <p className="text-center fs-3 fw-bold pt-4">Data Users</p>
        <div className="pb-2">
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <span>
              <AiIcon.AiOutlinePlus
                style={{ fontSize: "1.5rem", paddingBottom: "0.5px" }}
              />
            </span>
            add user
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col" className="text-center">
                  Name
                </th>
                <th scope="col" className="text-center">
                  Email
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {user.map((users, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{users.id}</th>
                    <td>{users.name}</td>
                    <td>{users.email}</td>
                    <td>
                      <div className="d-flex">
                        <button
                          id={users.id}
                          type="button"
                          className="btn btn-primary me-2"
                          onClick={handleEdit}
                        >
                          edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <span>
                            <MdIcon.MdDelete
                              style={{
                                fontSize: "1.2rem",
                                paddingBottom: "0.5px",
                              }}
                            />
                          </span>
                          delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Name"
                  value={modalData.name ? modalData.name : ""}
                />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  value={modalData.email ? modalData.email : ""}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-success">
                {flagModal ? "Edit User" : "Add user"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
