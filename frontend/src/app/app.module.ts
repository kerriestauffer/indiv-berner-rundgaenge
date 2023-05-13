import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MapComponent } from './map/map.component';
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import { PoiInfoboxComponent } from './poi-infobox/poi-infobox.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, MapComponent, PoiInfoboxComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
