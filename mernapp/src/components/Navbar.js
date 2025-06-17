import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {
    let data = useCart();
    const [cartView, setCartView] = useState(false);
    const isLoggedIn = localStorage.getItem("authToken");
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        window.location.reload();
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">FeastFleet</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" to="/">Home</Link>
                            </li>
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" to="/myorder">My Orders</Link>
                                </li>
                            )}
                        </ul>
                        <div className='d-flex'>
                            {!isLoggedIn ? (
                                <>
                                    <Link className="btn bg-white text-info mx-1" to="/login">Login</Link>
                                    <Link className="btn bg-white text-info mx-1" to="/createuser">Sign Up</Link>
                                </>
                            ) : (
                                <>
                                    <button className='btn bg-white text-info mx-2' onClick={() => setCartView(true)}>
                                        My Cart{" "}
                                        <Badge pill bg="danger">{data.length}</Badge>
                                    </button>
                                    {cartView && (
                                        <Modal onClose={() => setCartView(false)}>
                                            <Cart />
                                        </Modal>
                                    )}
                                    <button
                                        className="btn bg-white text-info mx-1"
                                        onClick={handleLogout}>
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}