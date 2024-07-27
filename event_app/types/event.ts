export interface Event {
  _id?: string
  name: string
  description: string
  venue: string
  ticketsAvailable: number
  startDateTime: Date
  endDateTime: Date
  publish?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface EventFormValues {
  _id?: string
  name: string
  venue: string
  ticketsAvailable: number
  description: string
  startDateTime: string
  endDateTime: string
}