import React, { useState, useRef, memo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const List = ({ title, data, addData, updateData, removeData }) => {
    const [isTyping, setTyping] = useState(false);
    const inputRef = useRef(null);

    const onChange = (id, event) => {
        if (!id && !isTyping && event.target.value) setTyping(true);

        if (id && !event.target.value) {
            let dataCopy = [...data];
            removeData(dataCopy, id, title);
        };
    };

    const onBlur = (id, event) => {
        if (isTyping) setTyping(false);
        let dataCopy = [...data];
        let { value } = event.target;

        if (value) {
            if (!id) {
                addData(dataCopy, value, title);

                inputRef.current.value = null;
                setTimeout(() => inputRef.current.focus());
            } else {
                updateData(dataCopy, id, value, title);
            };
        } else if (id) {
            removeData(dataCopy, id, title);
        };
    };

    return <div className='flex horizontal-center column'>
        <h2>{title}</h2>

        <Scrollbars style={{ height: '75vh' }}>
            <div className='flex content column'>
                {
                    !data.length ? null :
                        data.map(({ id, value }, index) => {
                            return <div className='item flex' key={id}>
                                <span className='item-count'>{index + 1}.</span>
                                <input
                                    type='text'
                                    onBlur={(event) => onBlur(id, event)}
                                    onChange={(event) => onChange(id, event)}
                                    defaultValue={value}
                                />
                            </div>
                        })
                }
                <div className='item flex'>
                    <span className='item-count'>{data.length + 1}.</span>
                    <input
                        type='text'
                        ref={inputRef}
                        onChange={(event) => onChange(null, event)}
                        onBlur={(event) => onBlur(null, event)}
                    />
                </div>
                {
                    isTyping && <div className='item flex'>
                        <span className='item-count'>{data.length + 2}.</span>
                        <input type='text' />
                    </div>
                }
            </div>
        </Scrollbars>
    </div>
};

export default memo(List);