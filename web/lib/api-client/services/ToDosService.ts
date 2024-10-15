/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { CreateToDoRequest, CreateToDoResponse } from "../models/ToDos";
export class ToDosService {
  /**
   * create
   * @param requestBody
   * @returns any Successful response
   * @throws ApiError
   */
  public static postTodos(requestBody?: CreateToDoRequest): CancelablePromise<CreateToDoResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/todos",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
