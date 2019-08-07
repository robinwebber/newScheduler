import React from 'react';
import "components/Appointment/styles.scss"
import Header from 'components/Appointment/Header'
import Empty from 'components/Appointment/Empty'
import Show from 'components/Appointment/Show'

export default function Appointment(props) {

 
  return (
    <React.Fragment >
    <Header time={props.time}/>
    {props.interview ? 
      <Show student={props.interview.student} onEdit={props.onEdit} onDelete={props.onDelete} interviewer={props.interview.interviewer} /> 
    : 
      <Empty onAdd={props.onAdd}/>
    }
    </ React.Fragment>
  );
}