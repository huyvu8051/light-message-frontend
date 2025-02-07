export interface CursorPagingResponseDTO<T> {
  data: T[]
  nextCursor: string
}

export interface CursorPagingView<T> {
  data: Map<number, T>
  nextCursor: string
}
