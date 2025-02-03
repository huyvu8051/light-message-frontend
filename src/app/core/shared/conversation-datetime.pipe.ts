import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  standalone: true,
  name: 'conversationDatetime'
})
export class ConversationDatetimePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const now = new Date();

    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24 && date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
    }
  }
}
