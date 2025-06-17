import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    const [orderSuccess, setOrderSuccess] = useState(false);
    if (data.length === 0 && !orderSuccess) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 text-info'>
                    The Cart is Empty!
                </div>
            </div>
        );
    }
    const handleCheckOut = async () => {
        try {
            let userEmail = localStorage.getItem("userEmail");

            let response = await fetch("http://localhost:5000/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });
            if (response.status === 200) {
                dispatch({ type: "DROP" });
                setOrderSuccess(true);
            } else {
                setOrderSuccess(false);
            }
        } catch (error) {
            setOrderSuccess(false);
        }
    };
    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>

                {orderSuccess && (
                    <div className="alert alert-info text-center fs-5" role="alert">
                        ✅ Order placed successfully!
                    </div>
                )}

                {!orderSuccess && (
                    <>
                        <table className='table table-hover'>
                            <thead>
                                <tr className='fs-4'>
                                    <th scope='col' className='text-info'>#</th>
                                    <th scope='col' className='text-info'>Name</th>
                                    <th scope='col' className='text-info'>Quantity</th>
                                    <th scope='col' className='text-info'>Option</th>
                                    <th scope='col' className='text-info'>Amount</th>
                                    <th scope='col' className='text-info'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((food, index) => (
                                    <tr key={index}>
                                        <th scope='row' className='text-info'>{index + 1}</th>
                                        <td className='text-info'>{food.name}</td>
                                        <td className='text-info'>{food.qty}</td>
                                        <td className='text-info'>{food.size}</td>
                                        <td className='text-info'>Rs {food.price}/-</td>
                                        <td>
                                            <button type="button" className="btn p-0">
                                                <DeleteIcon
                                                    className="text-danger"
                                                    onClick={() => dispatch({ type: "REMOVE", index })}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            <h1 className='fs-2 text-info'>Total Price: Rs {totalPrice}/-</h1>
                        </div>
                        <div>
                            <button className='btn bg-info text-white mt-5' onClick={handleCheckOut}>
                                Check Out
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}