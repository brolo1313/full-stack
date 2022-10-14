import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    
  },

];

export const homeRouting = RouterModule.forChild(homeRoutes);
