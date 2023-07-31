export interface PaginationProperties {
  total_count: number;
  total_page: number;
  limit: number;
  current_page: number;
  order_by: string;
  order_type: string;
  next_page: number | null;
  prev_page: number | null;
}

export class PaginationQuery {
  limit: number;
  page: number;
  order_type: "desc" | "asc";
  order_by: string;
}
