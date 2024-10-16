/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import {
  CreateToDoValidationType,
  GetToDosValidationType,
  UpdateToDoValidationType,
} from "dummy-todo-api/v1/todo/validation";
import { ToDo, GetTodosResponse } from "dummy-todo-api/v1/todo/controller";

export class ToDosService {
  /**
   * create
   * @param body
   * @returns any Successful response
   * @throws ApiError
   */
  public static updateTodo(
    body: UpdateToDoValidationType["body"],
    params: UpdateToDoValidationType["params"],
  ): CancelablePromise<ToDo> {
    return __request(OpenAPI, {
      method: "PUT",
      url: `/todos/${params.id}`,
      body,
      mediaType: "application/json",
    });
  }

  /**
   * create
   * @param requestBody
   * @returns any Successful response
   * @throws ApiError
   */
  public static createTodo(requestBody?: CreateToDoValidationType["body"]): CancelablePromise<ToDo> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/todos",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * create
   * @param requestBody
   * @returns any Successful response
   * @throws ApiError
   */
  public static getTodos(requestBody?: GetToDosValidationType["query"]): CancelablePromise<GetTodosResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/todos",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
