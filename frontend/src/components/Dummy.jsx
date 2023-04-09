import React from 'react';


import './styles.css'

const Dummy = React.forwardRef((props, ref) => {

return (
    <div ref = {ref} className='image'>
        <img src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"/>
    </div>

)});

export default Dummy;