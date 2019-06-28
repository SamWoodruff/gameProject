import React from "react";
import { blasters } from "../Projectile/blasterTypes";
import { connect } from "react-redux";
import { updateEquippedWeapon } from "../reduxConfig/actions";
const WeaponsHUD = ({ currentScore, selectedWeapon, updateEquippedWeapon }) => {
    console.log(blasters)
  const keyPress = e => {
    if (e.keyCode === 49) if(currentScore >= blasters[0].points)updateEquippedWeapon(blasters[0]);
    if (e.keyCode === 50) if(currentScore >= blasters[1].points)updateEquippedWeapon(blasters[1]);
    if (e.keyCode === 51) if(currentScore >= blasters[2].points)updateEquippedWeapon(blasters[2]);
  };
  window.addEventListener("keydown", keyPress.bind(this));
  return (
    <div>
      {blasters.map(blaster => (
       currentScore >= blaster.points &&(
        <div
          key={blaster.name}
          className={
            blaster.name === selectedWeapon.name ? "selectedWeapon" : ""
          }
        >

          {blaster.name}
        </div>
       )
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  selectedWeapon: state.selectedWeapon,
  currentScore: state.currentScore,
});

const mapDispatchToProps = dispatch => ({
  updateEquippedWeapon: weapon => dispatch(updateEquippedWeapon(weapon))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeaponsHUD);
