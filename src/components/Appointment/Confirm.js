import React from "react";

import Button from "components/Button";

// Note that in line 14 props.day is included, this is intentional, and is for spots remaing to be updated
export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancel} danger>
          Cancel
        </Button>
        <Button onClick={event => props.onConfirm(props.id, props.day)} danger>
          Confirm
        </Button>
      </section>
    </main>
  );
}
