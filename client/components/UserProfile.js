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
        username: "cody",
        totalPrice: 600,
        paidStatus: "completed",
        paidAt: "2/2/21",
        deliveredAt: "2/6/21"
    }
];

export class UserProfile extends React.Component {
    // componentDidMount() {}

    render() {
        // this.props.user
        // const {username, email, address, phoneNumber} = this.props.user
        return (
            <>
                <div className="user__profile">
                    <h2>My Profile</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>USERNAME</th>
                                <th>EMAIL</th>
                                <th>ADDRESS</th>
                                <th>PHONENUMBER</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* {username} */}
                                <td>cody</td>
                                {/* {email} */}
                                <td>cody@gmail.com</td>
                                {/* {address} */}
                                <td>123 St</td>
                                <td>12345</td>
                                <td>
                                    {/* <Link t0='/user/:userId/edit'> */}
                                    <button>Edit</button>
                                    {/* </Link> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="user__order">
                    <h2>My Order History</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>User</th>
                                <th>Total Price</th>
                                <th>Paid Status</th>
                                <th>Paid At</th>
                                <th>Delivered At</th>
                                <th>ACTION</th>
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
                                    <td>
                                        {/* <Link to="/orders/users/:userId/:orderId"> */}
                                        <button>DETAILS</button>
                                        {/* </Link> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

// const mapState = (state) => {
//     return {};
// };

// const mapDispatch = (dispatch) => {
//     return {};
// };

export default UserProfile;
