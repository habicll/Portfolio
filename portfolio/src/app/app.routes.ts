import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProjectsComponent } from './pages/projects/projects';
import { TimelineComponent } from './pages/timeline/timeline';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'projects', component: ProjectsComponent },
    { path: 'timeline', component: TimelineComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '' },
];
