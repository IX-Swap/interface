import React, { useState } from "react";
import { TimePicker } from "@material-ui/pickers";

const StaticTimePicker = () => {
  const [time, changeTime] = useState<Date | null>(new Date());

  return (
    <>
      <TimePicker
        ampm={false}
        renderInput={() => <span>Text sample</span>}
        orientation="landscape"
        openTo="minutes"
        value={time}
        onChange={changeTime}
      />
    </>
  );
};

export default StaticTimePicker;
