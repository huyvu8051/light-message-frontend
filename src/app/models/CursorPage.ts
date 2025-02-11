export interface CursorPagingResponseDTO<T> {
  data: T[]
  nextCursor: string
}

export interface Identifiable {
  id: number;
  sendAt: string; // ISO-8601 string
}

export function append<T extends Identifiable>(
  cpv: CursorPagingResponseDTO<T>,
  c: CursorPagingResponseDTO<T>
): CursorPagingResponseDTO<T> {
  let map = new Map<number, T>();

  cpv.data.forEach(e => map.set(e.id, e));
  c.data.forEach(e => map.set(e.id, e));

  let sortedArray = Array.from(map.values()).sort((a, b) =>
    b.id - a.id
  );

  return {
    data: sortedArray,
    nextCursor: c.nextCursor
  };
}



export function appendOne<T extends Identifiable>(cpv: CursorPagingResponseDTO<T>, c: T): CursorPagingResponseDTO<T> {
  let map = new Map<number, T>();

  cpv.data.forEach(e => map.set(e.id, e));
  map.set(c.id, c)

  let sortedArray = Array.from(map.values()).sort((a, b) =>
    b.id - a.id
  );



  return {
    data: sortedArray,
    nextCursor: cpv.nextCursor
  };
}

