import { SUBMIT_INGREDIENTS,SUBMIT_SPIRITS,SUBMIT_TIKI} from "./actionTypes";

let nextTodoId = 0;

export const ingredientsResponse = content => ({
  type: SUBMIT_INGREDIENTS,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const spiritsResponse = id => ({
  type: SUBMIT_SPIRITS,
  payload: { id }
});


export const tikiResponse = id => ({
  type: SUBMIT_TIKI,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
