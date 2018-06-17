import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRippleModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DraggableModule } from '@kube-cockpit/draggable';
import { LedModule } from '@kube-cockpit/led';

import { ChatBotService } from './chat-bot.service';
import { ChatBotComponent } from './chat-bot.component';
import { TypingIndicatorComponent } from './components/typing-indicator/typing-indicator.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DraggableModule,
    LedModule,
    FlexLayoutModule,
    MatSelectModule,
    MatToolbarModule,
    MatRippleModule,
    MatBadgeModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule
  ],
  declarations: [ChatBotComponent, TypingIndicatorComponent],
  exports: [ChatBotComponent],
  providers: [ChatBotService]
})
export class ChatBotModule {}
