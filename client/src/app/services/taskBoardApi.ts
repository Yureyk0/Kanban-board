import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { List } from "../../types/List";
import { Task } from "../../types/Task";
import { History } from "../../types/History";

export const taskBoardApi = createApi({
  reducerPath: "taskBoaedApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_CLIENT_PROD || "http://localhost:3000",
  }),
  tagTypes: ["Lists", "History"],
  endpoints: (builder) => ({
    getAllLists: builder.query<List[], void>({
      query: () => "lists",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Lists" as const, id })),
              { type: "Lists", id: "LIST" },
            ]
          : [{ type: "Lists", id: "LIST" }],
    }),

    addList: builder.mutation<List, Partial<List>>({
      query(body) {
        return {
          url: `lists`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Lists"],
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
      invalidatesTags: ["Lists"],
    }),
    deleteList: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `lists/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Lists"],
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
      invalidatesTags: ["Lists"],
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query(body) {
        return {
          url: `tasks`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Lists"],
    }),
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `tasks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Lists"],
    }),
    getOneTask: builder.query<Task, string>({
      query: (id) => {
        return {
          url: `tasks/${id}`,
          method: "GET",
        };
      },
    }),
    getHistory: builder.query<History[], void>({
      query: () => {
        return {
          url: `history`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "History" as const, id })),
              { type: "History", id: "History" },
            ]
          : [{ type: "History", id: "History" }],
    }),
    addHistory: builder.mutation<History, Partial<History>>({
      query(body) {
        return {
          url: `history`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Lists", "History"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  endpoints,
  useGetAllListsQuery,
  useAddListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetOneTaskQuery,
  useAddHistoryMutation,
  useGetHistoryQuery,
} = taskBoardApi;
