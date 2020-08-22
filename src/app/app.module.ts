import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faShoppingCart, faUser, faArrowLeft, faPlusCircle, faMinusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListItemComponent } from './product-list/product-list-item/product-list-item.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartComponent } from './cart/cart.component';
import { SigninFormComponent } from './auth/signin-form/signin-form.component';
import { ChangeProductQuantityComponent } from './shared/change-product-quantity/change-product-quantity.component';
import { environment } from '../environments/environment';
import { ProfileComponent } from './auth/profile/profile.component';
import { AuthEffects } from './auth/store/auth.effects';
import { OrderHistoryComponent } from './auth/order-history/order-history.component';
import { ProductListEffects } from './product-list/store/product-list.effects';
import { CheckoutFormComponent } from './cart/checkout-form/checkout-form.component';
import { CartEffects } from './cart/store/cart.effects';
import { FirebaseTimePipe } from './shared/pipes/firebase-time.pipe';
import { OrderHistoryDetailsComponent } from './auth/order-history/order-history-details/order-history-details.component';
import * as fromApp from './store/app.reducer';
import * as fromAppMetareducers from './store/app.metareducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductListItemComponent,
    ProductCardComponent,
    CartComponent,
    SigninFormComponent,
    ChangeProductQuantityComponent,
    ProfileComponent,
    OrderHistoryComponent,
    CheckoutFormComponent,
    FirebaseTimePipe,
    OrderHistoryDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot(fromApp.appReducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
      metaReducers: fromAppMetareducers.metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, ProductListEffects, CartEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faUser, faShoppingCart, faPlus, faArrowLeft, faPlusCircle, faMinusCircle, faTimes);
  }
}
