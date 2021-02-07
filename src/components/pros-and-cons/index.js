import React, { useState, useCallback, memo, lazy } from 'react';
import { v4 as uuidv4 } from 'uuid';

const List = lazy(() => import(/* webpackChunkName: "pros-and-cons-content" */ './list'));

import './style.scss';

const ProsAndCons = ({ title }) => {
    const [prosData, setProsData] = useState([]);
    const [consData, setConsData] = useState([]);

    const addData = useCallback(
        (data, value, type) => {
            type === 'Pros' ? setProsData([...data, { id: uuidv4(), value }]) : setConsData([...data, { id: uuidv4(), value }]);
        }, []
    );

    const updateData = useCallback(
        (data, id, value, type) => {
            let foundedProsIndex = data.findIndex(data => data.id === id);

            if (foundedProsIndex !== -1) {
                data[foundedProsIndex].value = value;
                type === 'Pros' ? setProsData(data) : setConsData(data);
            };
        }, []
    );

    const removeData = useCallback(
        (data, id, type) => {
            let foundedProsIndex = data.findIndex(data => data.id === id);

            if (foundedProsIndex !== -1) {
                data.splice(foundedProsIndex, 1);
                type === 'Pros' ? setProsData(data) : setConsData(data);
            };
        }, []
    );

    return <div className='pros-and-cons flex column'>
        <div className='title flex horizontal-center'>
            <h2>{title}</h2>
        </div>

        <div className='content flex'>
            <List
                title='Pros'
                data={prosData}
                addData={addData}
                updateData={updateData}
                removeData={removeData}
            />
            <List
                title='Cons'
                data={consData}
                addData={addData}
                updateData={updateData}
                removeData={removeData}
            />
        </div>
    </div>
};

export default memo(ProsAndCons);