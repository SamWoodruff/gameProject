import React from "react";
import { connect } from "react-redux";
import { changeShip } from "../reduxConfig/actions";
import { ships } from "../SpaceShip/shipData";
const ShipSelector = ({ changeShip }) => {
  return (
    <div className="shipSelector">
      <br />
      {ships.map(ship => (
        <div key={ship.id} onClick={() => changeShip(ship.src)}>
          <img src={ship.src} alt="" />
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  changeShip: ship => dispatch(changeShip(ship))
});

export default connect(
  null,
  mapDispatchToProps
)(ShipSelector);
