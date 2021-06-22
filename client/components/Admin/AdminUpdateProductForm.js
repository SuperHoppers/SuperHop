import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AdminUpdateProductForm = (props) => {
    return (
        <div className="form">
            <form>
                <ul className="form__container">
                    <li>
                        <h2>Update Product</h2>
                    </li>
                    {/* <li>{error && <div>{error.response.data}</div>}</li> */}
                    <li>
                        <label htmlFor="name">Product Name:</label>
                        <input name="name" type="text" />
                    </li>

                    <li>
                        <label htmlFor="price">Price:</label>
                        <input name="price" type="text" />
                    </li>

                    <li>
                        <label htmlFor="inventory">Inventory/Stock:</label>
                        <input name="inventory" type="text" />
                    </li>

                    <li>
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" type="text" />
                    </li>

                    <li>
                        <label htmlFor="image">Image:</label>
                        <textarea name="image" type="text" />
                        {/* {uploading && <div>Uploading...</div>} */}
                    </li>

                    <li>
                        <button type="submit" className="primary__btn">
                            Update Changes
                        </button>
                    </li>

                    <li>
                        {/* Back to Admin Product List */}
                        {/* <Link to="/admin/products"> */}
                        <button className="secondary__btn">Back</button>
                        {/* </Link> */}
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default AdminUpdateProductForm;
