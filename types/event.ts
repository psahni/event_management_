export interface Event {
  _id?: string
  name: string
  description: string
  startDateTime: Date
  endDateTime: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface EventFormValues {
  _id?: string
  name: string
  description: string
  startDateTime: string
  endDateTime: string
}