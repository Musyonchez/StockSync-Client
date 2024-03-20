// actions/writeoffActions.ts
import { Writeoff } from '../../../types/writeoff'; // Assuming you have a writeoff type

export const fetchWriteoffsRequest = (company: string, type: string, take: number, skip: number) => ({
  type: 'FETCH_WRITEOFFS_REQUEST',
  payload: { company, type, take, skip }
});

export const fetchWriteoffsSuccess = (writeoffs: Writeoff) => ({
  type: 'FETCH_WRITEOFFS_SUCCESS',
  payload: writeoffs
});

export const fetchWriteoffsFailure = (error: string) => ({
  type: 'FETCH_WRITEOFFS_FAILURE',
  payload: error
});
