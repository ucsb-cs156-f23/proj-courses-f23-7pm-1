import React from "react";
import { Form } from "react-bootstrap";
import { yyyyqToQyy } from "main/utils/quarterUtilities.js";
 
const PersonalScheduleDropdown = ({
  schedules,
  scheduleState,
  setScheduleState,
  controlId,
  onChange = null,
  label = "Schedule",
}) => {

  const handleScheduleOnChange = (event) => {
    // console.log("event = ", event);
    const selectedSchedule = event.target.value;
    localStorage.setItem(controlId, selectedSchedule);
    setScheduleState(selectedSchedule);
    if (onChange != null) {
      onChange(event);
    }
  };

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        value={scheduleState}
        onChange={handleScheduleOnChange}
      >
        {schedules.map(function (object, i) {
          const key = `${controlId}-option-${i}`;
          return (
            <option key={key} data-testid={key} value={object.id}>
              {yyyyqToQyy(object.quarter)} {object.name}
            </option>
          );
        })}
      </Form.Control>
    </Form.Group>
  );
};

export default PersonalScheduleDropdown;
