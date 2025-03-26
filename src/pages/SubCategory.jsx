import { useEffect, useState } from "react";
import { Card } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./css/Brands.css";
import ErrorMessage from "./../components/error/ErrorMessage";

const postToken = import.meta.env.VITE_API_BACKEND_POST_TOKEN;
const getToken = import.meta.env.VITE_API_BACKEND_GET_TOKEN;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function SubCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [refectData, setRefectData] = useState(false);

  const [subCategory, setSubCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");

  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryNameError, setSubCategoryNameError] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [categoryIdError, setCategoryIdError] = useState("");
  const [childrenCategory, setChildrenCategory] = useState("");
  const [childrenCategoryError, setChildrenCategoryError] = useState("");

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/backend/category/all`,
      auth: {
        username: "user",
        password: getToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          setCategories(response.data.success.data);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/backend/subcategory/all`,
      auth: {
        username: "user",
        password: getToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          setSubCategory(response.data.success.data);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [refectData]);

  const handleAddSubCategory = () => {
    if (categoryId == "") {
      setCategoryIdError("This field is Required!");
    } else if (subCategoryName == "") {
      setSubCategoryNameError("This field is Required!");
    } else if (childrenCategory == "") {
      setChildrenCategoryError("This field is Required!");
    } else {
      let genarate = childrenCategory.split(",").map((el) => {
        let linkCreate =
          el.trim().toLowerCase().split(" ").length !== 0
            ? el.trim().toLowerCase().split(" ").join("-")
            : el.trim().toLowerCase();

        return {
          title: el.trim(),
          link: `/${linkCreate}`,
        };
      });

      //   console.log(genarate);

      //   return "sdf";

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${baseUrl}/backend/subcategory/store`,
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: "user",
          password: postToken,
        },
        data: {
          subCategory: subCategoryName,
          categoryId,
          childrenCategory: genarate,
        },
      };

      setIsLoading(true);
      axios
        .request(config)
        .then((response) => {
          if ("success" in response.data) {
            setIsLoading(false);

            setSubCategoryName("");
            setSubCategoryNameError("");
            setCategoryId("");
            setCategoryIdError("");
            setChildrenCategory("");
            setChildrenCategoryError("");

            setRefectData(!refectData);

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
            setIsLoading(false);

            setSubCategoryName("");
            setSubCategoryNameError("");
            setCategoryId("");
            setCategoryIdError("");
            setChildrenCategory("");
            setChildrenCategoryError("");

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
    }
  };

  const handleDelete = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/backend/subcategory/destroy`,
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "user",
        password: postToken,
      },
      data: { subCategoryInfo: id },
    };

    // console.log("id", id);

    // return "sdf";

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          setRefectData(!refectData);

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
          setRefectData(!refectData);

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

  return (
    <Card title="All Sub Category">
      <div>
        <div className="main-box">
          <div className="one">
            <div className="row">
              <div className="col-md-6 form-group">
                <select
                  name="categoryId"
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                    setCategoryIdError("");
                  }}
                  value={categoryId}
                  className="form-select"
                >
                  <option value="">All Category</option>
                  {categories.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.categoryName}
                    </option>
                  ))}
                </select>

                {categoryIdError && <ErrorMessage message={categoryIdError} />}
              </div>

              <div className="col-md-6 form-group">
                <input
                  type="text"
                  name="categoryName"
                  value={subCategoryName}
                  onChange={(e) => {
                    setSubCategoryName(e.target.value);
                    setSubCategoryNameError("");
                  }}
                  className="form-control"
                  placeholder="Sub Category Name"
                />

                {subCategoryNameError && (
                  <ErrorMessage message={subCategoryNameError} />
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mt-3 form-group">
                <input
                  type="text"
                  name="childrenCategory"
                  value={childrenCategory}
                  onChange={(e) => {
                    setChildrenCategory(e.target.value);
                    setChildrenCategoryError("");
                  }}
                  className="form-control"
                  placeholder="Children Category Name"
                />

                {childrenCategoryError && (
                  <ErrorMessage message={childrenCategoryError} />
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="">
                {isLoading ? (
                  <div className="spinner-border" role="status"></div>
                ) : (
                  <button
                    onClick={handleAddSubCategory}
                    className="btn btn-primary"
                  >
                    Add Sub Category
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="one">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>#Sl</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Children Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subCategory.length !== 0 ? (
                  subCategory.map((el, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{el.categoryId.categoryName}</td>
                      <td>{el.subCategory}</td>
                      <td>
                        {el?.childrenCategory
                          ?.map((item) => item.title)
                          .join(", ")}
                      </td>
                      <td>
                        <div
                          role="group"
                          className="btn-group btn-group-sm commonBtn"
                        >
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            onClick={() => setId(el)}
                            data-bs-target="#exampleModal"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      <h4>No data found on the Record.</h4>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

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

export default SubCategory;
