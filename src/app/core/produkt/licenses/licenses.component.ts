import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  catchError,
  finalize,
  Observable,
  Subject,
  takeUntil,
  throwError,
} from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
}

@Component({
  selector: 'app-licenses',
  imports: [],
  templateUrl: './licenses.component.html',
  styleUrl: './licenses.component.css',
})
export class LicensesComponent {
  products: Product[] | null = null;
  loading = false;
  error: string | null = null;

  private apiUrl = 'http://localhost:3000/licenseString';
  private destroy$ = new Subject<void>(); // 用于取消订阅

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  // 核心数据获取方法
  loadProducts(category?: string): void {
    this.loading = true;
    this.error = null;

    // 构建查询参数
    const params = new HttpParams()
      .set('category', category || '')
      .set('_limit', '10');

    this.http
      .get<Product[]>(this.apiUrl, { params })
      .pipe(
        takeUntil(this.destroy$), // 组件销毁时自动取消请求
        finalize(() => (this.loading = false)), // 无论成功失败都会执行
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: (data) => (this.products = data),
        error: (err) => console.error('详细错误日志:', err),
      });
  }

  // 统一错误处理
  private handleError(error: any): Observable<never> {
    this.error = error.message || 'Server error';
    // this.notifyError(this.error); // 可集成通知服务

    // 返回用户友好的错误消息
    return throwError(
      () =>
        new Error(
          error.status === 404 ? 'Data not found' : 'Please try again later'
        )
    );
  }

  // 可选：与Toast服务集成
  private notifyError(message: string): void {
    // 这里可以调用第三方通知库或自定义服务
    console.error('Error notification:', message);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
