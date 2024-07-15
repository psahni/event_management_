import React from "react";
import Create from "./create"

export default function Edit(props: { event: Event }) {
  return (
    <Create event={props.event}/>
  )
}