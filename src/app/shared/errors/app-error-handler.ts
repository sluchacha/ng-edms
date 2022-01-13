import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppError } from './app-error';

/**
 * For global error handling - replaces the default ErrorHandler
 * Add this to your providers in the main module
 * E.g. providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }]
 *
 * Ref: https://github.com/scttcper/ngx-toastr/issues/179
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector) {
    super();
  }

  // Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  private displayError(message: string) {
    this.toastrService.error(message, 'Error', {
      closeButton: true,
      timeOut: 3000,
      onActivateTick: true,
    });
  }

  handleError(error: any): void {
    if (error instanceof AppError) {
      this.displayError(
        error.originalError.error || error.originalError.message
      );
    } else {
      this.displayError('An unexpected error occurred.');
      console.log(error);
    }
  }
}
