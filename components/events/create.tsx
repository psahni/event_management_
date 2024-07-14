import React from "react";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Event } from "types/event"

export default function Create(props: { event: Event }) {
  const router = useRouter();
  const event = props?.event;

  const validationSchema = Yup.object().shape({
    eventName: Yup.string()
        .required('Event Name is required'),
    eventDescription: Yup.string()
        .required('Event Description is required'),
    startdatetime: Yup.date()
        .required('Start Date Time is required'),
    enddatetime: Yup.date().required('End Date Time is required')
  });


  const formOptions = { resolver: yupResolver(validationSchema) };
  const { handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data: any) {
    console.log("data = ", data)

    return false
  }

  return (
    <div>
      <h3>Create Event</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <label className="label">Event Name</label>
            <input name="eventName" type="text" className={`form-control`}></input>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="label">Event Description</label>
            <textarea name="eventDescription"  rows={10} className={`form-control`}></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="label">Start Date Time</label>
            <input type="datetime-local" id="startdatetime" className={`form-control`} name="startdatetime"></input>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="label">End Date Time</label>
            <input type="datetime-local" id="enddatetime" className={`form-control`} name="enddatetime"></input>
          </div>
        </div>
        <div className="row">
          <div className="col button">
            <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
              {
                formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>
              }
              Save
            </button>
          </div>
        </div>
      </form>
      <style jsx>{`
      .row {
          display: flex;
          padding: 1rem;
          flex-direction: row;
          .col {
              display: flex;
             .label {
                font-weight: 600;
                width: 150px;
                display: inline-block;
             }
            &.button {
              margin-left: 10.5rem;
            }
            .form-control {
              &input {
                height: 1.5rem;
              }
              margin-left: 20px;
              width: 20rem;
             }
          }
        }
      `}
    </style>
    </div>
  )
}