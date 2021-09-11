import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

export interface Board {
  mac: String,
  patient: String
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  constructor(private http: HttpClient) { }

  /**
   * Handle http operation that failed and let the app continue
   * @param operation - Name of the operation that failed
   * @param result - Optional value to return as the observable result
   * @private
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // Print the error
      console.error(error);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  /**
   * This function insert a new board in the system
   * @param {Board} board - Data of new board
   */
  insert(board: Board): Observable<any> {
    const body = {board: board.mac, patient: board.patient};
    return this.http.post(`${baseUrl}/insertBoard`, body).pipe(
      catchError(this.handleError<any>('insertBoard'))
    );
  }

}
