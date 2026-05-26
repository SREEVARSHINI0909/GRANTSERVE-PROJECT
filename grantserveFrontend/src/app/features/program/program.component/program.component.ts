import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../../shared/components/footer/footer';
import { ScrollToTopComponent } from '../scroll-to-top.component/scroll-to-top.component';
import { ToastComponent } from '../../../shared/components/ui/toast.component/toast.component';

@Component({
  selector: 'app-program',
  imports: [RouterOutlet, Footer, ScrollToTopComponent, ToastComponent],
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css'],
  standalone: true
})
export class ProgramComponent {
}