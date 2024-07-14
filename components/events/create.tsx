import React from "react";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Event } from "types/event"
import { DateDiffInDays } from  "helpers/utility"

export default function Create(props: { event: Event }) {
  const router = useRouter();
  const event = props?.event;

  const validationSchema = Yup.object().shape({
    eventName: Yup.string()
        .required('Event Name is required'),
    eventDescription: Yup.string()
        .required('Event Description is required'),
    startdatetime: Yup.date()
        .required('Start Date Time is required')
        .typeError("Invalid Date")
        .test("should be greater", "Start Date Time must be after 3 days", (value) => {
          const today = new Date()
          const selectedDate = new Date(value)
          const daysDiff = DateDiffInDays(today, selectedDate)
          return daysDiff >= 3
        }),
    enddatetime: Yup.date()
        .required('End Date Time is required')
        .typeError("Invalid Date")
  });


  const formOptions = { resolver: yupResolver(validationSchema) };
  const { handleSubmit, register, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data: any) {
    console.log("data = ", data)
    alert("Hello")
  }

  return (
    <div>
      <h3>Create Event</h3>
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <div className="row">
          <label className="label">Event Name</label>
          <div className="col">
            <input type="text" {...register('eventName')}  className={`form-control`}></input>
            <span className="invalid-feedback">{errors.eventName?.message}</span>
          </div>
        </div>
        <div className="row">
          <label className="label">Event Description</label>
          <div className="col">
            <textarea {...register('eventDescription')} rows={10} className={`form-control`}></textarea>
            <span className="invalid-feedback">{errors.eventDescription?.message}</span>
          </div>
        </div>
        <div className="row">
          <label className="label">Start Date Time</label>
          <div className="col">
            <input 
              type="datetime-local" 
              id="startdatetime" 
              className={`form-control`}
              {...register('startdatetime')}
            >
            </input>
            <span className="invalid-feedback">{errors.startdatetime?.message}</span>
          </div>
        </div>
        <div className="row">
          <label className="label">End Date Time</label>
          <div className="col">
            <input 
              type="datetime-local" 
              id="enddatetime" 
              className={`form-control`} 
              {...register('enddatetime')}
            >
            </input>
            <span className="invalid-feedback">{errors.enddatetime?.message}</span>
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
          .label {
              font-weight: 600;
              width: 150px;
              display: inline-block;
          }
          .col {
              display: flex;
              flex-direction: column;
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
            .invalid-feedback {
              color: darkred;
              margin-left: 1.2rem;
            }
          }
        }
      `}
    </style>
    </div>
  )
}