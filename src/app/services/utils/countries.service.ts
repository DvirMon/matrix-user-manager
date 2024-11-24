import { HttpClient } from "@angular/common/http";
import {
  computed,
  inject,
  Injectable,
  ResourceRef,
  Signal,
} from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { map, Observable, shareReplay } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CountriesService {
  #countriesCached$?: Observable<string[]>;

  readonly #http = inject(HttpClient);

  readonly #URL: string = "https://restcountries.com/v3.1/all";

  #countriesResource = rxResource({ loader: () => this.#getCountries() });

  countries = computed(() => this.#countriesResource.value() || []);

  getCountriesResource(): ResourceRef<string[]> {
    return rxResource({ loader: () => this.#getCountries() });
  }

  #getCountries(): Observable<string[]> {
    return this.#http
      .get<any[]>(this.#URL)
      .pipe(map((data) => data.map((country) => country.name.common)));
  }

  filterCountries(query: Signal<string>): Signal<string[]> {
    return computed(() =>
      this.countries().filter((country: string) =>
        country.toLowerCase().startsWith(query().toLowerCase())
      )
    );
  }
}
