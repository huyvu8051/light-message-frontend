import {Conversation} from '../service/conversation.service'

export interface CursorPagingResponseDTO<T> {
  data: T[]
  nextCursor: string
}

export interface CursorPagingView<T> {
  data: Map<number, T>
  nextCursor: string
}


export interface Identifiable {
  id: number
}

export function append<T extends Identifiable>(cpv: CursorPagingView<T>, c: CursorPagingResponseDTO<T>): CursorPagingView<T> {
  const data = cpv.data
  c.data.forEach(e => data.set(e.id, e))
  return {
    data,
    nextCursor: c.nextCursor
  }
}

