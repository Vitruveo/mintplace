import React, { useRef } from 'react';
import "../styles/slider.css";

const Slider = ({ maxValue, defaultValue, onChange  }) => {
    const sliderEl = useRef(null);
    const MAX_VALUE = maxValue;
    const DEFAULT_VALUE = defaultValue;

    const changeHandler = (event) => {
        const value = event ? event.target.value : DEFAULT_VALUE;
        const progress = (value/MAX_VALUE) * 100;
        const thumbPosition = `calc(${progress}% - 7.5px)`;
        sliderEl.current.style.background = `linear-gradient(to right, #7043e4 ${progress}%, #f3ebfe ${progress}%)`;
        sliderEl.current.style.setProperty('--thumb-position', thumbPosition); 
        onChange(Number(value));
    };

   
    return (

        <div className="slider-wrapper">

            <div className="range" style={{padding: '0 0'}}>
                <input
                    type="range"
                    min="1"
                    max={MAX_VALUE}
                    defaultValue={DEFAULT_VALUE}
                    id="range"
                    onChange={changeHandler}
                    ref={sliderEl}
                />
            </div>
            
        </div>
    );
};

export default Slider;