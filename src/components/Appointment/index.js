import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    //make an object
    const interviewMadeFromChildFormAndToBePassedToParent = {
      student: name,
      interviewer
    };
    transition(STATUS);
    props
      .bookInterview(props.id, interviewMadeFromChildFormAndToBePassedToParent)
      .then(() => transition(SHOW));
  };

  const remove = id => {
    console.log("id from index.js remove", id);
    // transition(EMPTY);
    transition(STATUS);
    props.removeInterview(id).then(() => transition(EMPTY));
  };

  const confirmRemove = () => {
    transition(CONFIRM);
  };
  return (
    <React.Fragment>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onDelete={confirmRemove}
          id={props.id}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === STATUS && <Status />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this interview?"
          onCancel={() => back()}
          onConfirm={remove}
          id={props.id}
        />
      )}
    </React.Fragment>
  );
}
