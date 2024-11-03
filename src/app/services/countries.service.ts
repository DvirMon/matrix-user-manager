import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of, map, shareReplay } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CountriesService {
  #countriesCached$?: Observable<string[]>; // Cache the observable itself

  http = inject(HttpClient);

  fetchCountries(): Observable<string[]> {
    if (!this.#countriesCached$) {
      this.#countriesCached$ = this.#getCountries();
    }
    return this.#countriesCached$;
  }

  #getCountries(): Observable<string[]> {
    return this.http.get<any[]>("https://restcountries.com/v3.1/all").pipe(
      map((data) => data.map((country) => country.name.common)),
      shareReplay(1)
    );
  }

  filterCountries(query: string): Observable<string[]> {
    return this.fetchCountries().pipe(
      map((countries) =>
        countries.filter((country) =>
          country.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }
}
