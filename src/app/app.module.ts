import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { environment } from "src/environments/environment";
import { TopBarModule } from "./shared/modules/topBar/topBar.module";
import { PersistanceService } from "./shared/services/persistance.service";
import { AuthInterceptor } from "./shared/services/authintercepter.service";
import { GlobalFeedModule } from "./globalFeed/globalFeed.module";
import { StoreRouterConnectingModule, routerReducer } from "@ngrx/router-store";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    TopBarModule,
    HttpClientModule,
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
    GlobalFeedModule,
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
