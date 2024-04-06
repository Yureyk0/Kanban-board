import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { List } from "../../types/List";
import { Task } from "../../types/Task";
import { Board } from "../../types/Board";

export const taskBoardApi = createApi({
  reducerPath: "taskBoaedApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_CLIENT_PROD || "http://localhost:3000",
  }),
  tagTypes: ["Lists", "BoardNames", "OneBoard"],
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
    // getAllLists: builder.query<List[], void>({
    //   query: () => "lists",
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.map(({ id }) => ({ type: "Lists" as const, id })),
    //           { type: "Lists", id: "LIST" },
    //         ]
    //       : [{ type: "Lists", id: "LIST" }],
    // }),

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
      invalidatesTags: ["OneBoard"],
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query(body) {
        return {
          url: `tasks`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["OneBoard"],
    }),
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `tasks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["OneBoard"],
    }),
    getOneTask: builder.query<Task, string>({
      query: (id) => {
        return {
          url: `tasks/${id}`,
          method: "GET",
        };
      },
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
  useGetOneTaskQuery,
  useGetAllBoardsQuery,
  useGetOneBoardQuery,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useAddBoardMutation,
} = taskBoardApi;
