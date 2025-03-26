import { useEffect, useState } from "react";
import { Card } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./css/Brands.css";
import { Link } from "react-router-dom";

const postToken = import.meta.env.VITE_API_BACKEND_POST_TOKEN;
const getToken = import.meta.env.VITE_API_BACKEND_GET_TOKEN;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Order() {
  const [orders, setOrder] = useState([]);
  const [id, setId] = useState("");

  const handleDelete = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/backend/order/destroy`,
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "user",
        password: postToken,
      },
      data: { id: id },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          let orderUpdate = orders.filter((el) => el._id !== id);

          setOrder(orderUpdate);
          setId("");

          toast.success(response.data.success.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setId("");

          toast.error(response.data.error.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleAddDelete = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/backend/order/store`,
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "user",
        password: postToken,
      },
      data: {
        firstName: "Sumon",
        lastName: "",
        company: "IT Soft",
        country: "Bangladesh",
        city: "Dhaka",
        streetAddress: "Demo",
        apartment: "",
        phone: "01754623812",
        email: "demo@gmail.com",
        orderNotes: "",
        shipping: "Flat Rate",
        productInfo: [
          {
            id: "67e2c2911d80ea3c33f71801",
            title: "Demo Title 3",
            price: 100,
            quantity: 4,
          },
          {
            id: "67e2c2911d80ea3c33f79635",
            title: "Demo Title 4",
            price: 100,
            quantity: 7,
          },
        ],
        paymentGateway: true,
        amount: 6000,
        userId: null,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          console.log(response.data.success.data);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleOrderUpdate = (id) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/backend/order/update`,
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "user",
        password: postToken,
      },
      data: { id: id, orderStatus: "2" },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          let orderUpdate = orders.map((el) => {
            if (el._id == id) {
              return { ...el, orderStatus: "2" };
            }
            return el;
          });

          setOrder(orderUpdate);

          toast.success(response.data.success.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(response.data.error.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/backend/order/all`,
      auth: {
        username: "user",
        password: getToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          console.log(response.data.success.data);
          setOrder(response.data.success.data);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  return (
    <Card title="All Order">
      <div>
        <div className="main-box">
          <div className="one">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>#Sl</th>
                  {/* <th>Order Id</th> */}
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>Street Address</th>
                  <th>Apartment</th>
                  <th>Phone</th>
                  <th>Shipping</th>
                  <th>Company Name</th>
                  <th>Order Notes</th>
                  <th>Product Info</th>
                  <th>Price</th>
                  <th>User (Login)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length !== 0 ? (
                  orders.map((el, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {/* <td>{el._id.toString()}</td> */}
                      <td>{el.firstName}</td>
                      <td>{el.email}</td>
                      <td>{el.country}</td>
                      <td>{el.city}</td>
                      <td>{el.streetAddress}</td>
                      <td>{el.apartment ? el.apartment : "Empty"}</td>
                      <td>{el.phone}</td>
                      <td>{el.shipping}</td>
                      <td>{el.company ? el.company : "Empty"}</td>
                      <td>{el.orderNotes ? el.orderNotes : "Empty"}</td>
                      <td>
                        {el.productInfo?.length !== 0 &&
                          el.productInfo?.map((product, ind) => (
                            <div key={product.id}>
                              <div>
                                {product.title} (Quantity: {product.quantity}){" "}
                                <br />${product.price}
                              </div>
                              {ind !== el.productInfo.length - 1 && <br />}
                            </div>
                          ))}
                      </td>

                      <td>${el.amount}</td>
                      <td>{el.userId ? el.userId.uname : "Empty"}</td>

                      <td>
                        {el.orderStatus == "1" ? (
                          <div
                            role="group"
                            className="btn-group btn-group-sm commonBtn"
                          >
                            <button
                              onClick={() => handleOrderUpdate(el._id)}
                              className="btn btn-primary"
                            >
                              Accept
                            </button>

                            <button
                              type="button"
                              onClick={() => setId(el._id)}
                              className="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <button className="btn btn-sm btn-primary">
                            Accepted
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={16} className="text-center">
                      <h4>No data found on the Record.</h4>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              type="button"
              onClick={handleAddDelete}
              className="btn btn-danger"
            >
              Add Data
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Are You Sure?
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h4>Do you want to delete this User ?</h4>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      data-bs-dismiss="modal"
                      className="btn btn-danger"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Card>
  );
}

export default Order;
