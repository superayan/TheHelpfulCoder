'use client'

import React from 'react';

const GroceryList = () => {
    const [inputValue, setInputValue] = React.useState('');
    const [groceryItems, setGroceryItems] = React.useState([]);

    const handleSubmit = () => {
        const alreadyIncludes = groceryItems.some((item) => item.name === inputValue);
        if (alreadyIncludes) {
            alert(`${inputValue} is already in the list`);
        } else {

            setGroceryItems((prev) => [...prev, {
                name: inputValue,
                count: 1,
                inCart: false
            }])
            setInputValue('');
        }
    }

    const increment = (name) => {
        setGroceryItems((prev) => prev.map((item) => {
            if (item.name === name) {
                return {
                    name: item.name,
                    count: item.count + 1,
                    inCart: false,
                }
            }
            return item;
        }))
    }

    const decrement = (name) => {
        const currentCount = groceryItems.find((item) => item.name === name).count;
        if (currentCount === 1) {
            setGroceryItems((prev) => prev.filter((item) => item.name !== name));
        } else {
            setGroceryItems((prev) => prev.map((item) => {
                if (item.name === name) {
                    return {
                        name: item.name,
                        count: item.count - 1,
                        inCart: false,
                    }
                }
                return item;
            }))
        }
    }

    const addGroceryItemInCart = (name) => {
        setGroceryItems((prev) => prev.map((item) => {
            if (item.name === name)  {
                return {
                    ...item,
                    inCart: !item.inCart
                }
            }
            return item;
        }))
    }
    
    React.useEffect(() => {
        if (groceryItems.length > 0 && groceryItems.every((item) => item.inCart)){
            alert('All items have been added to the car');
        }
    }, [groceryItems]);
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '32px', backgroundColor: '#f7d04f', padding: '20px', borderRadius: '4px', minWidth: '500px', minHeight: '400px'}}>
            <form action={handleSubmit}>
                <label htmlFor='grocery-item-input'>Add an item</label>
                <input
                    type = 'text'
                    id = 'grocery-item-input'
                    maxLength={50}
                    minLength={1}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <button type='submit'>+</button>
            </form>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {
                    groceryItems.map((item) => 
                    <div key={item.name} style={{display: 'flex', flexDirection: 'row', gap: '6px',  alignItems: 'center'}}> 
                        <input type='checkbox' checked={item.inCart} onClick={() => addGroceryItemInCart(item.name)}/>
                        <p>{`${item.name} ${item.count}`}</p>
                        <button onClick={() => increment(item.name)}>+</button>
                        <button onClick={() => decrement(item.name)}>-</button>

                    </div>)
                }

            </div>
        </div>
    )
};

export default GroceryList;