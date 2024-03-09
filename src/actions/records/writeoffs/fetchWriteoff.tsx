// actions/writeoffActions.ts
import { Writeoff } from '../../../types/writeoff'; // Assuming you have a writeoff type

export const fetchWriteoffRequest = (  id: string, company: string, type: string) => ({
  type: 'FETCH_WRITEOFF_REQUEST',
  payload:  { id, company, type }
});

export const fetchWriteoffSuccess = (writeoff: Writeoff) => ({
  type: 'FETCH_WRITEOFF_SUCCESS',
  payload: writeoff
});

export const fetchWriteoffFailure = (error: string) => ({
  type: 'FETCH_WRITEOFF_FAILURE',
  payload: error
});
