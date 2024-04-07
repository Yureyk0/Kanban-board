import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { List } from "../../types/List";
import { Task } from "../../types/Task";
import { Board } from "../../types/Board";
import { Audit } from "../../types/Audit";

export const taskBoardApi = createApi({
  reducerPath: "taskBoaedApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_CLIENT_PROD || "http://localhost:3000",
  }),
  tagTypes: ["Lists", "BoardNames", "OneBoard", "Audit"],
  endpoints: (builder) => ({
    getAllBoards: builder.query<Partial<Board>[], void>({
      query: () => "boards",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "BoardNames" as const, id })),
              { type: "BoardNames", id: "BOARD_NAMES" },
            ]
          : [{ type: "BoardNames", id: "BOARD_NAMES" }],
    }),
    getOneBoard: builder.query<Board, string>({
      query: (id) => {
        return {
          url: `boards/${id}`,
          method: "GET",
        };
      },
      providesTags: () => [{ type: "OneBoard", id: "ONE_BOARD" }],
    }),
    updateBoard: builder.mutation<Board, Partial<Board>>({
      query(data) {
        const { id, nameBoard } = data;
        return {
          url: `boards/${id}`,
          method: "PATCH",
          body: { nameBoard },
        };
      },
      invalidatesTags: ["BoardNames", "OneBoard"],
    }),
    deleteBoard: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `boards/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["BoardNames", "OneBoard"],
    }),
    addBoard: builder.mutation<Board, Partial<Board>>({
      query(body) {
        return {
          url: `boards`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["BoardNames"],
    }),
    addList: builder.mutation<List, Partial<List>>({
      query(body) {
        return {
          url: `lists`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["OneBoard"],
    }),
    updateList: builder.mutation<List, Partial<List>>({
      query(data) {
        const { id, nameList } = data;
        return {
          url: `lists/${id}`,
          method: "PATCH",
          body: { nameList },
        };
      },
      invalidatesTags: ["OneBoard"],
    }),
    deleteList: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `lists/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["OneBoard"],
    }),
    updateTask: builder.mutation<Task, Partial<Task>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `tasks/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["OneBoard", "Audit"],
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query(body) {
        return {
          url: `tasks`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["OneBoard", "Audit"],
    }),
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `tasks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["OneBoard", "Audit"],
    }),
    getAllAudit: builder.query<Audit[], void>({
      query: () => "audit",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Audit" as const, id })),
              { type: "Audit", id: "AUDIT" },
            ]
          : [{ type: "Audit", id: "AUDIT" }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  endpoints,
  useAddListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetAllBoardsQuery,
  useGetOneBoardQuery,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useAddBoardMutation,
  useGetAllAuditQuery,
} = taskBoardApi;
