import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module'; // Import your routing module
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AuthInterceptor } from '../app/auth/auth.interceptor';
import { MyMoviesComponent } from './my-movies/my-movies.component';


@NgModule({
  declarations: [
    AppComponent,
    MyMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    SharedModule,
    AuthModule,
    MoviesModule,
    HttpClientModule
    
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }