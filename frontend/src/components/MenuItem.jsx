import React from 'react';

const MenuItem = ({item, addToCart}) => {
    const handleAddToCart = () => {
        addToCart(item);
    };

    return (
        <div>
            <h3>{item.name}</h3>
            <p>Price: ${item.price.$numberDecimal}</p>
            <button onClick={handleAddToCart}>Add to cart</button>
        </div>
    );
};

export default MenuItem;
