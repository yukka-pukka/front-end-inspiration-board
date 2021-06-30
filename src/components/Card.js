
import React from 'react';
import PropTypes from 'prop-types';
import './Card.css'

const Card = (props) => {
    const { card } = props
    return <section>
        <p>{card.message}</p>
        <p>{card.likes_count}</p>
    </section>
};

export default Card;


