import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError, finalize, delay } from "rxjs/operators";
import Swal from "sweetalert2";

@Injectable()
export class LoadInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Iniciamos loading
    console.log(LoadInterceptor);
    Swal.fire({
      title: "Loading!",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    return next.handle(request).pipe(
      delay(5000),
      finalize(() => Swal.close())
    );
  }
}
