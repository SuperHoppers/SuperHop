import React from "react";

const products = [
    {
        id: 1,
        name: "Fire",
        price: 5000,
        description: "ready to go FIRE!",
        inventory: 500
    },
    {
        id: 2,
        name: "water",
        price: 4000,
        description: "BE WATER!",
        inventory: 400
    },
    {
        id: 3,
        name: "ninja",
        price: 3000,
        description: "hahahahaha",
        inventory: 300
    }
];

const AdminProductList = (props) => {
    return (
        <div className="product__list">
            <table className="table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Inventory</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.inventory}</td>
                            <td>{product.description}</td>
                            <td>
                                <button className="button">Edit</button>

                                <button className="button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProductList;
