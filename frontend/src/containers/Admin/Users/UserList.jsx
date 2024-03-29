import React from "react";
import { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../../../actions/userActions";
import Loader from "../../../components/Loader/Loader";
import Message from "../../../components/Message/Message";
import "../styles/Admin.scss";
import { Link } from "react-router-dom";

function UserList({ history }) {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, successDelete, userInfo]);

    const deleteHandler = (id) => {
        if (window.confirm("Bạn có thực sự muốn xóa?")) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <Container>
            <h1>Danh sách khách hàng</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        style={{ fontSize: "14px" }}
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>
                                        <Link to={`mailto:${user.email}`}>
                                            {user.email}
                                        </Link>
                                    </td>
                                    <td>
                                        {user.isAdmin ? (
                                            <i
                                                className="fas fa-check"
                                                style={{ color: "green" }}
                                            ></i>
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/user/${user._id}/edit`}
                                        >
                                            <Button
                                                variant="success"
                                                className="btn-md"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn-md"
                                            style={{ marginLeft: "5px" }}
                                            onClick={() =>
                                                deleteHandler(user._id)
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
}

export default UserList;
