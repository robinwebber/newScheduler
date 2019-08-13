import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    console.log("inside save function", props.day);
    transition(STATUS, true);
    props
      .bookInterview(
        props.id,
        interviewMadeFromChildFormAndToBePassedToParent,
        props.day
      )
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const remove = (id, dayFromForm) => {
    // transition(EMPTY);
    transition(STATUS, true);
    props
      .removeInterview(id, dayFromForm)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
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
          onEdit={() => transition(CREATE)}
          day={props.day}
          spots={props.spots}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.interview && props.interview.student}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          interviewer={props.interview && props.interview.interviewer.id}
          day={props.day}
        />
      )}
      {mode === STATUS && <Status />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this interview?"
          onCancel={() => back()}
          onConfirm={remove}
          id={props.id}
          day={props.day}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Could not save interview"} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Could not delete interview"} onClose={() => back()} />
      )}
    </React.Fragment>
  );
}
