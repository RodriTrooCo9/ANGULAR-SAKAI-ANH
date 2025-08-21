import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { appRoutes } from './app.routes';
import { AuthInterceptor } from './app/interceptors/auth.interceptor'; // <-- ¡Asegúrate de esta importación!

export const appConfig: ApplicationConfig = {
    providers: [

        provideZoneChangeDetection({ eventCoalescing: true }),//


        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),

        // ¡ESTA ES LA PARTE CLAVE!
        provideHttpClient(
            withFetch(),
            withInterceptors([AuthInterceptor]) // <-- ¡Asegúrate de que tu interceptor esté aquí!
        ),

        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } })
        
    ]
};