import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CountriesService {
  #countriesCached$?: Observable<string[]>; 

  readonly #http = inject(HttpClient);

  readonly #URL: string = "https://restcountries.com/v3.1/all";

  #fetchCountries(): Observable<string[]> {
    if (!this.#countriesCached$) {
      this.#countriesCached$ = this.#getCountries();
    }
    return this.#countriesCached$;
  }

  #getCountries(): Observable<string[]> {
    return this.#http.get<any[]>(this.#URL).pipe(
      map((data) => data.map((country) => country.name.common)),
      shareReplay(1)
    );
  }

  filterCountries(query: string): Observable<string[]> {
    return this.#fetchCountries().pipe(
      map((countries) =>
        countries.filter((country) =>
          country.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }
}
