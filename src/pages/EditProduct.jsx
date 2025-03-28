/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Card, Select, Space, Image } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./css/Brands.css";
import { Link, useParams } from "react-router-dom";
import ErrorMessage from "../components/error/ErrorMessage";

const postToken = import.meta.env.VITE_API_BACKEND_POST_TOKEN;
const getToken = import.meta.env.VITE_API_BACKEND_GET_TOKEN;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const imageBaseURL = import.meta.env.VITE_API_IMAGE_URL_KEY;

function EditProduct() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [productInfo, setProductInfo] = useState([]);
  const [brands, setBrands] = useState([]);
  const [capacity, setCapacity] = useState([]);
  const [tags, setTags] = useState([]);
  const [colors, setColors] = useState([]);
  const [moreProduct, setMoreProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);

  const [productInput, setProductInput] = useState("");
  const [productError, setProductError] = useState("");
  const [brandInput, setBrandInput] = useState("");
  const [capacityInput, setCapacityInput] = useState("");
  const [tagId, setTagId] = useState([]);
  const [tagError, setTagError] = useState("");
  const [defaultSelected, setDefaultSelected] = useState([]);

  // const [categories, setCategories] = useState([]);
  // const [defaultCategories, setDefaultCategories] = useState([]);
  // const [categoryId, setCategoryId] = useState([]);
  // const [categoryError, setCategoryError] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [subSategories, setSubCategories] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");

  const [childrenCategory, setChildrenCategory] = useState([]);
  const [childrenCategoryId, setChildrenCategoryId] = useState("");
  const [childrenCategoryError, setChildrenCategoryError] = useState("");

  const [selectedImages, setSelectedImages] = useState([]);
  const [imageArr, setImageArr] = useState([]);

  const [amountInput, setAmountInput] = useState("");
  const [amountError, setAmountError] = useState("");

  const [skuInput, setSkuInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [shortDescError, setShortDescError] = useState("");

  const [moreProductId, setMoreProductId] = useState([]);
  const [moreProductSelect, setMoreProductSelect] = useState([]);

  const [relatedProductId, setRelatedProductId] = useState([]);
  const [relatedProductSelect, setRelatedProductSelect] = useState([]);

  const [additionalInfo, setAdditionalInfo] = useState("");
  const [fileKey, setFileKey] = useState(0);

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
          // let categoryUpdate = response.data.success.data.map((el) => {
          //   return {
          //     _id: el._id,
          //     label: el.categoryName,
          //     value: el.categoryName,
          //     desc: el.categoryName,
          //   };
          // });
          console.log("one", response.data.success.data);

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
      url: `${baseUrl}/backend/brand/all`,
      auth: {
        username: "user",
        password: getToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          setBrands(response.data.success.data);
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
      url: `${baseUrl}/backend/capacity/all`,
      auth: {
        username: "user",
        password: getToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          setCapacity(response.data.success.data);
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
      url: `${baseUrl}/backend/tag/all`,
      auth: {
        username: "user",
        password: getToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          // {
          //     label: "China",
          //     value: "china",
          //     desc: "China (中国)",
          //     _id: "dfg"
          //   }

          let tagsUpdate = response.data.success.data.map((el) => {
            return {
              _id: el._id,
              label: el.tagName,
              value: el.tagName,
              desc: el.tagName,
            };
          });

          setTags(tagsUpdate);
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
      url: `${baseUrl}/backend/color/all`,
      auth: {
        username: "user",
        password: getToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          setColors(response.data.success.data);
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
      url: `${baseUrl}/backend/product/all`,
      auth: {
        username: "user",
        password: getToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          let productUpdate = response.data.success.data
            .map((el) => {
              if (el._id != id) {
                return {
                  _id: el._id,
                  label: el.title,
                  value: el.title,
                  desc: el.title,
                };
              }
            })
            .filter((el) => el !== undefined);

          setMoreProduct(productUpdate);
          setRelatedProduct(productUpdate);
          // console.log("more, related => ", productUpdate);
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
      url: `${baseUrl}/backend/product/edit/${id}`,
      auth: {
        username: "user",
        password: getToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if ("success" in response.data) {
          console.log("sumon", response.data.success.data[0]);

          setProductInput(response.data.success.data[0].title);

          setDefaultSelected(
            response.data.success.data[0].tagId.map((tag) => tag.tagName)
          );

          let tagData = response.data.success.data[0].tagId.map((tag) => {
            return { _id: tag._id };
          });

          setTagId(tagData);

          // let categoryData = response.data.success.data[0].categoryId.map(
          //   (cat) => {
          //     return { _id: cat._id };
          //   }
          // );

          // setDefaultCategories(
          //   response.data.success.data[0].categoryId.map(
          //     (cat) => cat.categoryName
          //   )
          // );

          setImageArr(response.data.success.data[0].imageArray);
          setAdditionalInfo(response.data.success.data[0].additionalInfo);
          setDescription(response.data.success.data[0].description);
          setAmountInput(response.data.success.data[0].amount);
          setShortDesc(response.data.success.data[0].shortDesc);
          setSkuInput(response.data.success.data[0].sku);
          setProductInfo(response.data.success.data);

          setColorInput(response.data.success.data[0].colorId?._id);
          setBrandInput(response.data.success.data[0].brandId?._id);
          setCapacityInput(response.data.success.data[0].capacityId?._id);
          setCategoryId(response.data.success.data[0].categoryId?._id);
          setSubCategoryId(response.data.success.data[0].subcategoryId?._id);
          setChildrenCategoryId(
            response.data.success.data[0]?.childrenCategory
          );
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  useEffect(() => {
    if (moreProduct.length > 0 && productInfo.length > 0) {
      let moreArr = moreProduct
        .filter((el) => productInfo[0].moreProduct.includes(el._id))
        .map((el) => el.value);

      let selectedProduct = moreProduct
        .filter((el) => productInfo[0].moreProduct.includes(el._id))
        .map((el) => {
          return { _id: el._id };
        });

      setMoreProductId(selectedProduct);
      setMoreProductSelect(moreArr);
    }
  }, [moreProduct, productInfo]);

  useEffect(() => {
    if (relatedProduct.length > 0 && productInfo.length > 0) {
      let relatedArr = relatedProduct
        .filter((el) => productInfo[0].relatedProduct.includes(el._id))
        .map((el) => el.value);

      let selectedProduct = relatedProduct
        .filter((el) => productInfo[0].relatedProduct.includes(el._id))
        .map((el) => {
          return { _id: el._id };
        });

      setRelatedProductId(selectedProduct);
      setRelatedProductSelect(relatedArr);
    }
  }, [relatedProduct, productInfo]);

  useEffect(() => {
    if (categories.length > 0 && productInfo.length > 0) {
      let filterCat = categories.filter(
        (el) => el._id == productInfo[0].categoryId?._id
      )[0];

      if (filterCat) {
        setSubCategories(filterCat.subCategoryId);
        setChildrenCategory(filterCat.subCategoryId[0]?.childrenCategory);
      }
    }
  }, [categories, productInfo]);

  const handleChangeTags = (value) => {
    let selectedTags = tags
      .filter((tag) => value.includes(tag.value))
      .map((tag) => {
        return { _id: tag._id };
      });

    setTagError("");
    setTagId(selectedTags);

    setDefaultSelected(
      tags
        .filter((tag) => value.includes(tag.value))
        .map((tag) => {
          return tag.value;
        })
    );
  };

  const handleChangeCategory = (e) => {
    let subCatArr = categories.filter((el) => el._id == e.target.value);
    setSubCategories(subCatArr[0].subCategoryId);

    setCategoryError("");
    setCategoryId(e.target.value);
  };

  const handleChangeSubCategory = (e) => {
    let subCatArr = subSategories.filter((el) => el._id == e.target.value);
    setChildrenCategory(subCatArr[0].childrenCategory);
    setSubCategoryError("");
    setSubCategoryId(e.target.value);
  };

  const handleChangeChildrenCategory = (e) => {
    setChildrenCategoryError("");
    setChildrenCategoryId(e.target.value);
  };

  const handleInputFile = (event) => {
    const files = Array.from(event.target.files);

    const fileObjects = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
            base64: reader.result,
          });
        };
      });
    });

    Promise.all(fileObjects).then((imageObjects) => {
      setSelectedImages((prevImages) => [...imageObjects]);
    });
  };

  const handleChangeMoreProduct = (value) => {
    let selectedProduct = moreProduct
      .filter((el) => value.includes(el.value))
      .map((el) => {
        return { _id: el._id };
      });

    setMoreProductId(selectedProduct);

    setMoreProductSelect(
      moreProduct
        .filter((el) => value.includes(el.value))
        .map((el) => {
          return el.value;
        })
    );
  };

  const handleChangeRelatedProduct = (value) => {
    let selectedProduct = relatedProduct
      .filter((el) => value.includes(el.value))
      .map((el) => {
        return { _id: el._id };
      });

    setRelatedProductId(selectedProduct);

    setRelatedProductSelect(
      relatedProduct
        .filter((el) => value.includes(el.value))
        .map((el) => {
          return el.value;
        })
    );
  };

  const handleUpdateProduct = () => {
    if (productInput === "") {
      setProductError("This field is Required!");
    } else if (categoryId === "") {
      setCategoryError("This field is Required!");
    } else if (subCategoryId === "") {
      setSubCategoryError("This field is Required!");
    } else if (childrenCategoryId === "") {
      setChildrenCategoryError("This field is Required!");
    } else if (tagId.length == 0) {
      setTagError("This field is Required!");
    } else if (amountInput == "") {
      setAmountError("This field is Required!");
    } else if (shortDesc == "") {
      setShortDescError("This field is Required!");
    } else if (description == "") {
      setDescriptionError("This field is Required!");
    } else if (
      productInput !== "" &&
      categoryId !== "" &&
      subCategoryId !== "" &&
      childrenCategoryId !== "" &&
      tagId.length > 0 &&
      amountInput !== "" &&
      shortDesc !== "" &&
      description !== ""
    ) {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${baseUrl}/backend/product/update`,
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: "user",
          password: postToken,
        },
        data: {
          id,
          title: productInput,
          shortDesc,
          description,
          amount: amountInput,
          sku: skuInput,
          categoryId: categoryId,
          subcategoryId: subCategoryId,
          childrenCategory: childrenCategoryId,
          tagId,
          brandId: brandInput == "" ? null : brandInput,
          colorId: colorInput == "" ? null : colorInput,
          capacityId: capacityInput == "" ? null : capacityInput,
          imageArray: selectedImages,
          moreProduct: moreProductId,
          relatedProduct: relatedProductId,
          additionalInfo,
        },
      };

      // console.log("moreProductId =>", moreProductId);
      // console.log("relatedProductId =>", categoryId, subCategoryId, childrenCategoryId);

      setIsLoading(true);
      // return "ok";

      axios
        .request(config)
        .then((response) => {
          if ("success" in response.data) {
            setIsLoading(false);
            setFileKey((prevKey) => prevKey + 1);
            setSelectedImages([]);
            setImageArr(response.data.success.data.imageArray);

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
            setFileKey((prevKey) => prevKey + 1);
            setSelectedImages([]);

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

  return (
    <Card title="Update Product">
      <div>
        <div className="main-box">
          <div className="one">
            <div className="row">
              <div className="col-md-4 form-group">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={productInput}
                  onChange={(e) => {
                    setProductInput(e.target.value);
                    setProductError("");
                  }}
                  placeholder="Product Title"
                />

                {productError && <ErrorMessage message={productError} />}
              </div>

              <div className="col-md-4 form-group">
                <select
                  onChange={(e) => setBrandInput(e.target.value)}
                  value={brandInput}
                  className="form-select"
                >
                  <option value="">All Brand</option>
                  {brands.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.brandName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 form-group">
                <select
                  onChange={handleChangeCategory}
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

                {categoryError && <ErrorMessage message={categoryError} />}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mt-3 form-group">
                <select
                  onChange={handleChangeSubCategory}
                  value={subCategoryId}
                  className="form-select"
                >
                  <option value="">All Sub Category</option>
                  {subSategories.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.subCategory}
                    </option>
                  ))}
                </select>

                {subCategoryError && (
                  <ErrorMessage message={subCategoryError} />
                )}
              </div>

              <div className="col-md-4 mt-3 form-group">
                <select
                  onChange={handleChangeChildrenCategory}
                  value={childrenCategoryId}
                  className="form-select"
                >
                  <option value="">All Children Category</option>
                  {childrenCategory.map((option) => (
                    <option key={option.link} value={option.link}>
                      {option.title}
                    </option>
                  ))}
                </select>

                {childrenCategoryError && (
                  <ErrorMessage message={childrenCategoryError} />
                )}
              </div>

              <div className="col-md-4 mt-3 form-group">
                <input type="text" className="form-control" disabled />
              </div>
            </div>

            <div className="row changeRow">
              <div className="col-md-4 form-group mt-3">
                <div className="imageControll">
                  {imageArr.map((el) => (
                    <Image width={60} key={el} src={`${imageBaseURL}/${el}`} />
                  ))}
                </div>

                <input
                  className="form-control"
                  type="file"
                  key={fileKey}
                  multiple
                  onChange={handleInputFile}
                />
              </div>

              <div className="col-md-4 form-group mt-3">
                <select
                  name="capacityId"
                  onChange={(e) => setCapacityInput(e.target.value)}
                  value={capacityInput}
                  className="form-select"
                >
                  <option value="">Capacity</option>
                  {capacity.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.capacityName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 form-group mt-3">
                <Select
                  mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  placeholder="All Tags"
                  value={defaultSelected}
                  onChange={handleChangeTags}
                  options={tags}
                  optionRender={(option) => <Space>{option.data.desc}</Space>}
                />

                {tagError && <ErrorMessage message={tagError} />}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 form-group mt-3">
                <input
                  type="text"
                  name="sku"
                  className="form-control"
                  value={skuInput}
                  onChange={(e) => {
                    setSkuInput(e.target.value);
                  }}
                  placeholder="Product SKU"
                />
              </div>

              <div className="col-md-4 form-group mt-3">
                <Select
                  mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  placeholder="More Product"
                  value={moreProductSelect}
                  onChange={handleChangeMoreProduct}
                  options={moreProduct}
                  optionRender={(option) => <Space>{option.data.label}</Space>}
                />
              </div>

              <div className="col-md-4 form-group mt-3">
                <Select
                  mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Related Product"
                  value={relatedProductSelect}
                  onChange={handleChangeRelatedProduct}
                  options={relatedProduct}
                  optionRender={(option) => <Space>{option.data.label}</Space>}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 form-group mt-3">
                <input
                  type="text"
                  name="amount"
                  className="form-control"
                  value={amountInput}
                  onChange={(e) => {
                    setAmountInput(e.target.value);
                    setAmountError("");
                  }}
                  placeholder="Product Price"
                />

                {amountError && <ErrorMessage message={amountError} />}
              </div>

              <div className="col-md-4 form-group mt-3">
                <select
                  name="colorId"
                  onChange={(e) => setColorInput(e.target.value)}
                  value={colorInput}
                  className="form-select"
                >
                  <option value="">All Color</option>
                  {colors.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.colorName.split(",")[0]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 form-group mt-3">
                <textarea
                  className="form-control"
                  name="shortDesc"
                  rows={1}
                  value={shortDesc}
                  onChange={(e) => {
                    setShortDesc(e.target.value);
                    setShortDescError("");
                  }}
                  placeholder="Short Description"
                />
                {shortDescError && <ErrorMessage message={shortDescError} />}
              </div>
            </div>

            <div className="form-group mt-3">
              <textarea
                className="form-control"
                name="description"
                rows={5}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionError("");
                }}
                placeholder="Description"
              />

              {descriptionError && <ErrorMessage message={descriptionError} />}
            </div>

            <div className="form-group mt-3">
              <textarea
                className="form-control"
                name="additionalInfo"
                rows={5}
                value={additionalInfo}
                onChange={(e) => {
                  setAdditionalInfo(e.target.value);
                }}
                placeholder="Additional Information"
              />
            </div>

            <div className="mt-3">
              <div className="text-center">
                {isLoading ? (
                  <div className="spinner-border" role="status"></div>
                ) : (
                  <button
                    onClick={handleUpdateProduct}
                    className="btn btn-primary"
                  >
                    Update Product
                  </button>
                )}
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

export default EditProduct;
