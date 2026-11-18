import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

// las rutas indican los roles permitidos en data: { roles: [...] }
export const rolGuard: CanActivateFn = (route) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.estaAutenticadoService()) {
        return router.createUrlTree(["/login"]);
    }

    const roles: string[] = route.data["roles"] ?? [];
    if (roles.length === 0 || roles.includes(authService.obtenerRolService())) {
        return true;
    }

    return router.createUrlTree([authService.rutaInicioService()]);
};
