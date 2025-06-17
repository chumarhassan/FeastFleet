import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            setOrderData([]);
            return;
        }
        try {
            const res = await fetch("http://localhost:5000/api/myorderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const response = await res.json();
            if (response.orderData && response.orderData.order_data) {
                setOrderData(response.orderData.order_data);
            } else {
                setOrderData([]);
            }
        } catch (error) {
            setOrderData([]);
        }
    };
    useEffect(() => {
        fetchMyOrder();
    }, []);
    let lastOrderDate = null;
    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData === null ? (
                        <div className="text-center mt-5 fs-3">Loading your orders...</div>
                    ) : orderData.length > 0 ? (
                        orderData.slice(0).reverse().map((orderGroup, groupIndex) => {
                            lastOrderDate = null;
                            return (
                                <React.Fragment key={groupIndex}>
                                    {orderGroup.map((itemData, itemIndex) => {
                                        if (itemData.Order_date) {
                                            lastOrderDate = itemData.Order_date;
                                            return (
                                                <div key={`date-${groupIndex}-${itemIndex}`} className='m-auto mt-5 col-12'>
                                                    <h4 className='text-white'>{lastOrderDate}</h4>
                                                    <hr />
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={`food-${groupIndex}-${itemIndex}`} className='col-12 col-md-6 col-lg-3'>
                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <img src={itemData.img} className="card-img-top" alt={itemData.name} style={{ height: "120px", objectFit: "fill" }} />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{itemData.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                <span className='m-1'>{itemData.qty}</span>
                                                                <span className='m-1'>{itemData.size}</span>
                                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                    Rs{itemData.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <div className="text-center text-info mt-5 fs-3">No Orders Found. Start Feasting!</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}