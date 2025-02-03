import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  standalone: true,
  name: 'conversationDatetime'
})
export class ConversationDatetimePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const now = new Date();

    // Tính khoảng cách giữa hai ngày (milliseconds)
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60); // Chuyển sang giờ

    if (diffInHours < 24 && date.toDateString() === now.toDateString()) {
      // Nếu dưới 24 giờ & cùng ngày, hiển thị giờ:phút
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // Nếu hơn 24 giờ, hiển thị ngày/tháng (không cần năm)
      return date.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
    }
  }
}
