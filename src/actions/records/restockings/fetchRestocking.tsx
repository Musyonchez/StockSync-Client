// actions/restockingActions.ts
import { Restocking } from '../../../types/restocking'; // Assuming you have a restocking type

export const fetchRestockingRequest = (  id: string, company: string, type: string) => ({
  type: 'FETCH_RESTOCKING_REQUEST',
  payload:  { id, company, type }
});

export const fetchRestockingSuccess = (restocking: Restocking) => ({
  type: 'FETCH_RESTOCKING_SUCCESS',
  payload: restocking
});

export const fetchRestockingFailure = (error: string) => ({
  type: 'FETCH_RESTOCKING_FAILURE',
  payload: error
});
