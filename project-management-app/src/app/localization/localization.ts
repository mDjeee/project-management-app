import {MissingTranslationHandler, MissingTranslationHandlerParams} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";


export class MissingTranslationService implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return `WARN: '${params.key}' is missing in '${params.translateService.currentLang}' locale`;
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}
