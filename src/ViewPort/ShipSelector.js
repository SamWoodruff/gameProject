import React, { useState } from "react";
import { connect } from "react-redux";
import { changeShip } from "../reduxConfig/actions";
import { ships } from "../SpaceShip/images/shipData";

const ShipSelector = ({ changeShip }) => {
  const [selectedShip, setSelectedShip] = useState(-1);
  const selectShip = (ship, index) =>{
    setSelectedShip(index)
    changeShip(ship.src)
  }
  return (
    <div className="shipSelector">
      <br />
      {ships.map((ship,index) => (
        <div
          className={
            selectedShip === index ? "selected" : "unselected"
          }
          key={ship.id}
          onClick={
            () => selectShip(ship,index)
          }
        >
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
