function DeliveryCard(props) {
  const { svgName, svgWidth, svgHeight, heading, text } = props;
  return (
    <article className="delivery-card">
      <svg className="delivery-card__svg" width={svgWidth} height={svgHeight}>
        <use href={`./images/icons.svg#${svgName}`}></use>
      </svg>
      <h3 className="delivery-card__heading">{heading}</h3>
      <p className="delivery-card__paragraph">{text}</p>
    </article>
  );
}

export { DeliveryCard };
