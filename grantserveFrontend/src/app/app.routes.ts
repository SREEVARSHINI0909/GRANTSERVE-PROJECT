// import { Routes } from '@angular/router'; 
// import { Login } from './features/Auth/component/login.component/login.component';
// import { authGuard } from './core/guards/auth-guard';
// import { ProgramComponent } from './features/program/program.component/program.component';
// import { ProgramFormComponent } from './features/program/program-form.component/program-form.component';
// import { AddBudgetComponent } from './features/program/add-budget.component/add-budget.component';
// import { ReviewerDashboard } from './features/review/reviewer-dashboard/reviewer-dashboard.component';
// import { ProgramListComponent } from './features/Applications/program-list.component/program-list.component';
// import { ReviewFormComponent } from './features/review/reviewer-dashboard/review-form.component';
// import { ViewProgramComponent } from './features/program/view-program.component/view-program.component';
// import { ResearcherprofileComponent } from './features/researcher/researcherprofile/researcherprofile.component';
// import { ManagerAssignmentComponent } from './features/review/manager-assignment/manager-assignment';
// import { ProgramDashboardComponent } from './features/program/program-dashboard.component/program-dashboard.component';

// // --- NEW IMPORT FOR DASHBOARD ---
// // Remove '.component' from the end of the path
// import { ResearcherDashboardComponent } from './features/researcher/researcherdashboard/researcherdashboard.component';
// export const routes: Routes = [
//     {
//         path: '',
//         component: Login
//     },
//     {
//         path: 'register',
//         loadComponent: () => import('./features/Auth/component/register.comoponent/register.comoponent').then(m => m.RegisterComoponent)
//     },
//     {
//         path: 'home',
//         canActivate: [authGuard],
//         loadComponent: () => import('./features/home-layout/home-layout').then(m => m.HomeLayout)
//     },
//     {
//         path: 'home/programs',
//         canActivate: [authGuard],
//         component: ProgramListComponent
//     },
//     {
//     path : 'create-application',
//     loadComponent: () => import('./features/New_Application/create-application/create-application').then(m => m.CreateApplication)
//     },
//     {
//         path: 'home/programs/:id',
//         canActivate: [authGuard],
//         component: ViewProgramComponent
//     },
//     {
//         path: 'home/profile',
//         canActivate: [authGuard],
//         component: ResearcherprofileComponent
//     },
//     {
//         path: 'profile',
//         canActivate: [authGuard],
//         loadComponent: () => import('./features/user-profile/user-profile.component/user-profile.component').then(m => m.UserProfileComponent)
//     },
//     {
//         path: 'applications',
//         canActivate: [authGuard],
//         loadComponent: () => import('./features/Applications/applications.component/applications.component').then(m => m.ApplicationsComponent)
//     },
//     {
//         path: 'proposals/:id',
//         canActivate: [authGuard],
//         loadComponent: () => import('./features/Applications/proposal.component/proposal.component').then(m => m.ProposalComponent)
//     },

//     // --- Manager & Admin Restricted Routes ---
//     {
//         path: 'programs',
//         component: ProgramComponent, // This component should have a <router-outlet>
//         canActivate: [authGuard],
//         data: { roles: ['MANAGER', 'ADMIN', 'RESEARCHER'] },
//         children: [
//             {
//                 path: '', // Matches "/programs"
//                 component: ProgramDashboardComponent,
//                 data: {
//                     roles: ['MANAGER', 'ADMIN']
//                 }
//             },
//             {
//                 path: 'add-budget',
//                 component: AddBudgetComponent,
//                 canActivate: [authGuard],
//                 data: { roles: ['MANAGER', 'ADMIN'] }
//             },
//             {
//                 path: 'create', // Matches "/programs/create"
//                 component: ProgramFormComponent,
//                 data: { roles: ['MANAGER', 'ADMIN'] }
//             },
//             {
//                 path: 'edit/:id', // Matches "/programs/edit/123"
//                 component: ProgramFormComponent,
//                 data: { roles: ['MANAGER', 'ADMIN'] }
//             },
//             {
//                 path: ':id', // Matches "/programs/123" - MUST BE LAST
//                 component: ViewProgramComponent
//             }
//         ]
//     },

//     // --- Reviewer Restricted Routes ---
//     {
//         path: 'reviewer-dashboard',
//         component: ReviewerDashboard,
//         canActivate: [authGuard],
//         data: { roles: ['REVIEWER'] }
//     },

//     { 
//         path: 'review-form', 
//         component: ReviewFormComponent,
//         canActivate: [authGuard],
//         data: { roles: ['REVIEWER'] }
//     },

//   {
//     path: 'disbursements',
//     canActivate: [authGuard],
//     loadComponent: () => import('./features/disbursement/disbursement.component/disbursement.component')
//         .then(m => m.DisbursementComponent)
//   },
//   {
//     path: 'manager/disbursements',
//     canActivate: [authGuard],
//     loadComponent: () => import('./features/disbursement/manager-disbursement.component/manager-disbursement.component')
//         .then(m => m.ManagerDisbursementComponent),
//     data: { roles: ['MANAGER', 'ADMIN'] }
//   },

// {
//   path: 'manager/disbursements',
//   loadComponent: () => import('./features/disbursement/manager-disbursement.component/manager-disbursement.component')
//     .then(m => m.ManagerDisbursementComponent),
//   canActivate: [authGuard],
//   data: { roles: ['MANAGER', 'ADMIN'] }
// },
// { 
//   path: 'manager/assign', 
//   component: ManagerAssignmentComponent,
//   canActivate: [authGuard],
//   data: { roles: ['MANAGER'] }
// }, // --- Fallback ---
//     { 
//         path: '**', 
//         redirectTo: '' 
//     }
// ];

import { Routes } from '@angular/router';
import { Login } from './features/Auth/component/login.component/login.component';
import { authGuard } from './core/guards/auth-guard';
import { ProgramComponent } from './features/program/program.component/program.component';
import { ProgramFormComponent } from './features/program/program-form.component/program-form.component';
import { AddBudgetComponent } from './features/program/add-budget.component/add-budget.component';
import { ReviewerDashboard } from './features/review/reviewer-dashboard/reviewer-dashboard.component';
import { ProgramListComponent } from './features/Applications/program-list.component/program-list.component';
import { ReviewFormComponent } from './features/review/reviewer-dashboard/review-form.component';
import { ViewProgramComponent } from './features/program/view-program.component/view-program.component';
import { ResearcherprofileComponent } from './features/researcher/researcherprofile/researcherprofile.component';
import { ManagerAssignmentComponent } from './features/review/manager-assignment/manager-assignment';
import { ProgramDashboardComponent } from './features/program/program-dashboard.component/program-dashboard.component';
import { ResearcherDashboardComponent } from './features/researcher/researcherdashboard/researcherdashboard.component';


export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'register',
    loadComponent: () => import('./features/Auth/component/register.comoponent/register.comoponent').then(m => m.RegisterComoponent)
  },

  // --- HOME LAYOUT & CHILDREN (From Your Local) ---
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./features/home-layout/home-layout').then(m => m.HomeLayout),
    children: [
      {
        path: 'dashboard',
        component: ResearcherDashboardComponent
      },
      {
        path: 'profile',
        component: ResearcherprofileComponent
      },
      {
        path: 'programs',
        component: ProgramListComponent
      },
      {
        path: 'programs/:id',
        canActivate: [authGuard],
        component: ViewProgramComponent
      },
      // Logic: Send user to profile immediately after login
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  },

  // --- SHARED FUNCTIONALITY ---
  {
    path: 'create-application',
    loadComponent: () => import('./features/New_Application/create-application/create-application').then(m => m.CreateApplication)
  },
  {
    path: 'user-profile', // Unified naming
    canActivate: [authGuard],
    loadComponent: () => import('./features/user-profile/user-profile.component/user-profile.component').then(m => m.UserProfileComponent)
  },
  {
    path: 'applications',
    canActivate: [authGuard],
    loadComponent: () => import('./features/Applications/applications.component/applications.component').then(m => m.ApplicationsComponent)
  },
  {
    path: 'proposals/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/Applications/proposal.component/proposal.component').then(m => m.ProposalComponent)
  },

  // --- PROGRAM MANAGEMENT (Git Hierarchy) ---
  {
    path: 'programs',
    component: ProgramComponent,
    canActivate: [authGuard],
    data: { roles: ['MANAGER', 'ADMIN', 'RESEARCHER'] },
    children: [
      {
        path: '',
        component: ProgramDashboardComponent,
        data: { roles: ['MANAGER', 'ADMIN'] }
      },
      {
        path: 'add-budget',
        component: AddBudgetComponent,
        data: { roles: ['MANAGER', 'ADMIN'] }
      },
      {
        path: 'create',
        component: ProgramFormComponent,
        data: { roles: ['MANAGER', 'ADMIN'] }
      },
      {
        path: 'edit/:id',
        component: ProgramFormComponent,
        data: { roles: ['MANAGER', 'ADMIN'] }
      },
      {
        path: ':id',
        component: ViewProgramComponent
      }
    ]
  },

  // --- REVIEWER ROUTES ---
  {
    path: 'reviewer-dashboard',
    component: ReviewerDashboard,
    canActivate: [authGuard],
    data: { roles: ['REVIEWER'] }
  },

  {
    path: 'review-form',
    component: ReviewFormComponent,
    canActivate: [authGuard],
    data: { roles: ['REVIEWER'] }
  },
  // { 
  //     path: 'manager/assign', 
  //     component: ManagerAssignmentComponent,
  //     canActivate: [authGuard],
  //     data: { roles: ['MANAGER'] }
  // },

  // --- DISBURSEMENTS ---
  {
    path: 'disbursements',
    canActivate: [authGuard],
    loadComponent: () => import('./features/disbursement/disbursement.component/disbursement.component')
      .then(m => m.DisbursementComponent)
  },
  {
    path: 'manager/disbursements',
    canActivate: [authGuard],
    loadComponent: () => import('./features/disbursement/manager-disbursement.component/manager-disbursement.component')
      .then(m => m.ManagerDisbursementComponent),
    data: { roles: ['MANAGER', 'ADMIN'] }
  },

  {
    path: 'manager/disbursements',
    loadComponent: () => import('./features/disbursement/manager-disbursement.component/manager-disbursement.component')
      .then(m => m.ManagerDisbursementComponent),
    canActivate: [authGuard],
    data: { roles: ['MANAGER', 'ADMIN'] }
  },
  {
    path: 'manager/assign',
    component: ManagerAssignmentComponent,
    canActivate: [authGuard],
    data: { roles: ['MANAGER'] }
  }, // --- Fallback ---
  {
    path: '**',
    redirectTo: ''
  }
];