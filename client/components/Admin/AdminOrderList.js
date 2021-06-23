import React from "react";

const orders = [
    {
        id: 1,
        date: "1/1/21",
        username: "cody",
        totalPrice: 500,
        paidStatus: "completed",
        paidAt: "1/2/21",
        deliveredAt: "1/6/21"
    },
    {
        id: 2,
        date: "2/1/21",
        username: "mario",
        totalPrice: 600,
        paidStatus: "completed",
        paidAt: "2/2/21",
        deliveredAt: "2/6/21"
    },
    {
        id: 3,
        date: "3/1/21",
        username: "aden",
        totalPrice: 700,
        paidStatus: "incompleted",
        paidAt: "",
        deliveredAt: ""
    }
];

class AdminOrderList extends React.Component {

    render(){
        return (
            <div className="order__list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>User</th>
                            <th>Total Price</th>
                            <th>Paid?</th>
                            <th>Paid At</th>
                            <th>Delivered At</th>
                        </tr>
                    </thead>
    
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.username}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.paidStatus}</td>
                                <td>{order.paidAt}</td>
                                <td>{order.deliveredAt}</td>
                                {/* <td>
                                    <button className="button">Edit</button>
                                    <button className="button">Delete</button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default AdminOrderList;
