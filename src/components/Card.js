import React from 'react';


function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
        <article className="element">
          <button className="element__trash-img" type="button"></button>
        <img className="element__img" src={props.card.link} alt={props.card.name} style={{ backgroundImage: `url(${props.card.link})`}} onClick={handleClick}/>
          <div className="element__description">
          <h2 className="element__heading">{props.card.name}</h2>
            <div className="element__container">
              <button className="element__icon" type="button"></button>
            <div className="element__likes-num">{props.card.likes.length}</div>
              </div>
            </div>
        </article>
  )
}

export default Card;