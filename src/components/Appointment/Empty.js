import React from 'react';

export default function Empty(props) {

  return (
    <main class="appointment__add" onClick={props.onAdd} >
  <img
    class="appointment__add-button"
    src="images/add.png"
    alt="Add"
  />
</main>
  );
} 