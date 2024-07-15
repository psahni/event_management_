import React from "react";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Event } from "types/event"
import { DateDiff, getDateString } from  "helpers/utility"
import eventService  from "services/event.service"

export default function Create(props?: { event?: Event }) {
  
  const router = useRouter();
  const event = props?.event;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Event Name is required'),
    description: Yup.string()
        .required('Event Description is required'),
    startDateTime: Yup.date()
        .required('Start Date Time is required')
        .typeError("Invalid Date")
        .test("should be greater", "Start Date Time must be after 3 days", (_, ctx) => {
          const ev = ctx.parent
          let startdate = new Date()
          let selectedDate = formOptions.defaultValues.startDateTime
    
          if (ev._id) {
            startdate = new Date(ev.createdAt)
          }
    
          const { diffDays } = DateDiff(startdate, selectedDate)
        
          return diffDays >= 3
        }),
    endDateTime: Yup.date()
        .required('End Date Time is required')
        .typeError("Invalid Date")
        .test("should be greater", "Difference between start date time and end date time must be atleast 2 hours", (_, ctx) => {
          const startdatetime =  formOptions.defaultValues.startDateTime
          if (startdatetime.toString() == "Invalid Date") return ctx.createError({ message: "Invalid start date time"})

          const selectedDate =  formOptions.defaultValues.endDateTime
          if (selectedDate < startdatetime) return ctx.createError({ message: "end date time must be greater than start date time"})

          const { diffHours } = DateDiff(startdatetime, selectedDate)
          return diffHours >= 2
        }),
  });

  const formOptions = { 
    resolver: yupResolver(validationSchema), 
    defaultValues: event ? event : {name: '', description: '', startDateTime: new Date(), endDateTime: new Date()},
    values: event
  };

  const { handleSubmit, register, formState } = useForm(formOptions);
  const { errors } = formState;

  async function handleChange(dateFieldName: 'startDateTime' | 'endDateTime', e: any) {
    if (!e.target['validity'].valid) return;

    formOptions.defaultValues[dateFieldName] = e.target.value
  }

  async function onSubmit(data : Event) {
    const {startDateTime, endDateTime } = formOptions.defaultValues
    Object.assign(data, {startDateTime, endDateTime})

    debugger
    let savedEvent;
    if (event && event._id) {
      savedEvent = await eventService.updateEvent(data, event._id)
    } else {
      savedEvent = await eventService.createEvent(data)
    }
  
    console.log(savedEvent, "event")
    if (savedEvent._id) {
      router.push('/');
    } 
  }

  return (
    <div>
      <h3>Create Event</h3>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="row">
          <label className="label">Event Name</label>
          <div className="col">
            <input type="text" {...register('name')}  className={`form-control`}></input>
            <span className="invalid-feedback">{errors.name?.message}</span>
          </div>
        </div>
        <div className="row">
          <label className="label">Event Description</label>
          <div className="col">
            <textarea {...register('description')} rows={10} className={`form-control`}></textarea>
            <span className="invalid-feedback">{errors.description?.message}</span>
          </div>
        </div>
        <div className="row">
          <label className="label">Start Date Time</label>
          <div className="col">
            <input 
              type="datetime-local" 
              id="startdatetime" 
              className={`form-control`}
              defaultValue={getDateString(formOptions.defaultValues.startDateTime)}
              onChange={(e) => handleChange('startDateTime', e)}
            >
            </input>
            <span className="invalid-feedback">{errors.startDateTime?.message}</span>
          </div>
        </div>
        <div className="row">
          <label className="label">End Date Time</label>
          <div className="col">
            <input 
              type="datetime-local" 
              id="enddatetime" 
              className={`form-control`}
              defaultValue={getDateString(formOptions.defaultValues.endDateTime)}
              onChange={(e) => handleChange('endDateTime', e)}
            >
            </input>
            <span className="invalid-feedback">{errors.endDateTime?.message}</span>
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