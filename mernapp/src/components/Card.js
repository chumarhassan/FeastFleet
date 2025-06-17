import React, { useRef, useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);
  let finalPrice = qty * parseInt(options[size] || 0);
  const handleAddToCart = async () => {
    const existingFood = data.find(
      (item) => item.id === props.foodItem._id && item.size === size
    );
    if (existingFood) {
      await dispatch({
        type: 'UPDATE',
        id: props.foodItem._id,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    } else {
      await dispatch({
        type: 'ADD',
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };
  return (
    <div className="card mt-3 mx-2" style={{ width: '18rem', maxHeight: '360px' }}>
      <img
        className="card-img-top"
        src={props.foodItem.img}
        alt={props.foodItem.name}
        style={{ objectFit: 'cover', height: '200px' }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <div className="container w-100 d-flex align-items-center">
          <select
            className="m-2 h-100 bg-info rounded"
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value))}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="m-2 h-100 bg-info rounded"
            ref={priceRef}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="d-inline h-100 fs-5">Rs {finalPrice}/-</div>
        </div>
        <hr />
        <button className="btn btn-info ms-2" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
