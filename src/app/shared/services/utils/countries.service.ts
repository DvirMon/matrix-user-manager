import { HttpClient, HttpHeaders } from "@angular/common/http";
import { computed, inject, Injectable, ResourceRef } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CountriesResponse } from "./types";

@Injectable({
  providedIn: "root",
})
export class CountriesService {
  readonly #http = inject(HttpClient);

  readonly #URL = "https://restcountries.com/v3.1/all";

  readonly apiUrl = environment.apiUrl;

  readonly headers = new HttpHeaders({
    "X-RapidAPI-Key": environment.rapidAPI,
    "X-RapidAPI-Host": "countries-states-and-cities.p.rapidapi.com",
  });

  #countriesResource = rxResource({ loader: () => this.#getCountries() });

  countries = computed(() => this.#countriesResource.value() || []);


  // countries = computed(
  //   () =>
  //     this.#countriesResource.value()?.list.map((country) => country.name) || []
  // );


  getRapidCountries(): Observable<Object> {
    const apiUrl = this.apiUrl + "/countries";
    return this.#http.get<CountriesResponse>(apiUrl, { headers: this.headers });
  }

  getCountriesResource(): ResourceRef<string[]> {
    return rxResource({ loader: () => this.#getCountries() });
  }

  getCountryDetails(name: string) {
    return this.#getCountryDetails(name);
  }

  #getCountryDetails(name: string) {
    return this.#http.get<any[]>(`https://restcountries.com/v3.1/name/${name}`);
  }

  #getCountries(): Observable<string[]> {
    return this.#http
      .get<any[]>(this.#URL)
      .pipe(map((data) => data.map((country) => country.name.common)));
  }

  filterCountries(query: string): string[] {
    return this.countries().filter((country: string) =>
      country.toLowerCase().startsWith(query.toLowerCase())
    );
  }
}
