import React, {useState} from 'react';
import {Button, TextArea} from '@douyinfe/semi-ui';

const Cart = ({ items }) => {
    const [notes, setNotes] = useState('');

    const total = items.reduce((sum, item) => sum + parseFloat(item.price.$numberDecimal), 0);

    const handleSubmitOrder = () => {
        // Implement your order submission logic here
        console.log('Order submitted:', items, notes);
    };

    const cartStyle = {
        background: '#dddddd',
        borderRadius: '10px',
        padding: '15px',
        marginRight: '30px',
    };

    const tableStyle = {
        width: '100%',
        textAlign: 'left',
    };

    const lineStyle = {
        height: '1px',
        border: '0',
        borderTop: '1px solid #ccc',
        margin: '1em 0',
    };

    return (
        <div style={cartStyle}>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {items.length === 0 ? (
                    <tr>
                        <td colSpan="3">Empty</td>
                    </tr>
                ) : (
                    items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>${item.price.$numberDecimal}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            <hr style={lineStyle} />
            <h4>Subtotal: ${total.toFixed(2)}</h4>
            <h4>Tax: ${(total * 0.13).toFixed(2)}</h4>
            <div>

                <TextArea autosize maxCount={200} value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Add special notes..." showClear/>
            </div>
            <br/>
            <div className="btn-margin-right">
                <Button onClick={handleSubmitOrder}>Submit Order</Button>
            </div>

        </div>
    );
};

export default Cart;