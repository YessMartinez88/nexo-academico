import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: "./app.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    readonly authService = inject(AuthService);
    title = "Nexo-Academico";
}
