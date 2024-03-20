// actions/restockingActions.ts
import { Restocking } from '../../../types/restocking'; // Assuming you have a restocking type

export const fetchRestockingsRequest = (company: string, type: string, take: number, skip: number) => ({
  type: 'FETCH_RESTOCKINGS_REQUEST',
  payload: { company, type, take, skip }
});

export const fetchRestockingsSuccess = (restockings: Restocking) => ({
  type: 'FETCH_RESTOCKINGS_SUCCESS',
  payload: restockings
});

export const fetchRestockingsFailure = (error: string) => ({
  type: 'FETCH_RESTOCKINGS_FAILURE',
  payload: error
});
