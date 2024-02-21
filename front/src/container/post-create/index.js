import "./index.css";

import FieldForm from "../../component/field-form";
import Grid from "../../component/grid";
import { useState } from "react";

import { Alert, Loader, LOAD_STATUS } from "../../component/load";

export default function Container({
  onCreate,
  placeholder,
  button,
  id = null,
}) {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (value) => {
    alert(value);
  };

  const sendData = async (dataToSend) => {
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      const res = await fetch("http://localhost:4000/post-create", {
        method: "POST",
        headers: { "Content-type": "application.json" },
        body: convertData(dataToSend),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(null);

        if (onCreate) onCreate();
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  const convertData = ({ value }) =>
    JSON.stringify({
      text: value,
      username: "user",
      postId: id,
    });

  return (
    <Grid>
      <FieldForm
        placeholder={placeholder}
        button={button}
        onSubmit={handleSubmit}
      />
    </Grid>
  );
}
