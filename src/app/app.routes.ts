import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderListingComponent } from './components/order-listing/order-listing.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent,
        pathMatch:'full'
    },
    {
        path:'create-order',
        component:OrderFormComponent,
        pathMatch:'full'
    },
    {
        path:'order-listing',
        component:OrderListingComponent,
        pathMatch:'full'
    },
    
];
