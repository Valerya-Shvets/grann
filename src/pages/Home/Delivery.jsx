import { DeliveryCard } from "../../components/DeliveryCard";

function Delivery() {
  return (
    <section className="delivery-section" id="delivery">
      <div className="container">
        <h2 className="delivery-section__title title">Доставка і оплата</h2>
        <ul className="delivery-section__list">
          <li>
            <DeliveryCard
              svgName="icon-box-delivery"
              svgWidth="75"
              svgHeight="75"
              heading="Самовивіз"
              text="Самовивіз з Металургійного р-ну, м.Кривий Ріг"
            />
          </li>
          <li>
            <DeliveryCard
              svgName="icon-scooter-delivery"
              svgWidth="102"
              svgHeight="70"
              heading="Доставка"
              text="Доставка на таксі (за тарифами служби таксі)"
            />
          </li>
          <li>
            <DeliveryCard
              svgName="icon-payment-delivery"
              svgWidth="80"
              svgHeight="80"
              heading="Передплата"
              text="Передплата на картку в розмірі 50% від суми замовлення"
            />
          </li>
        </ul>
      </div>
    </section>
  );
}

export { Delivery };
