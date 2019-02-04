import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { CategorydataService } from './shared/categorydata.service';
import { AddcategoryComponent } from './category/addcategory.component';
import { HeaderComponent } from './header.component';
import { krishma1 } from './app.routing';
import { AnswerdataService } from './shared/answerdata.service';
import { AnswerComponent } from './answer/answer.component';
import { AddanswerComponent } from './answer/addanswer.component';
import { CommentdataService } from './shared/commentdata.service';
import { CommentComponent } from './comment/comment.component';
import { AddcommentComponent } from './comment/addcomment.component';
import { DiscussiondataService } from './shared/discussiondata.service';
import { DiscussionComponent } from './discussion/discussion.component';
import { AdddiscussionComponent } from './discussion/adddiscussion.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AddfeedbackComponent } from './feedback/addfeedback.component';
import { FeedbackdataService } from './shared/feedbackdata.service';
import { UserdataService } from './shared/userdata.service';
import { CmntlinkComponent } from './discussion/cmntlink.component';
import { CategoryfilterPipe } from './category/categoryfilter.pipe';

import { PaginatePipe } from './ng2paging/paginate.pipe';
import { PaginationService } from './ng2paging/pagination.service';
import { PaginationControlsComponent } from './ng2paging/pagination-controls.component';
import { PaginationControlsDirective } from './ng2paging/pagination-controls.directive';

import { UserComponent } from './user/user.component';
import { AdduserComponent } from './user/adduser.component';
import { TestComponent } from './test/test.component';
import { AddtestComponent } from './test/addtest.component';
import { TestdataService } from './shared/testdata.service';
import { DiscussionfilterPipe } from './discussion/discussionfilter.pipe';
import { QuestiondataService } from './shared/questiondata.service';
import { QuestionComponent } from './question/question.component';
import { AddquestionComponent } from './question/addquestion.component';
import { AnslinkComponent } from './question/anslink.component';
import { QuestionfilterPipe } from './question/questionfilter.pipe';
import { SubcatdataService } from './shared/subcatdata.service';
import { TestdetailsdataService } from './shared/testdetailsdata.service';
import { TestdetailsComponent } from './testdetails/testdetails.component';
import { AddtestdetailsComponent } from './testdetails/addtestdetails.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    AddcategoryComponent,
    HeaderComponent,
    AnswerComponent,
    AddanswerComponent,
    CommentComponent,
    AddcommentComponent,
    DiscussionComponent,
    AdddiscussionComponent,
    FeedbackComponent,
    AddfeedbackComponent,
    CmntlinkComponent,
    CategoryfilterPipe,
    PaginatePipe,
    PaginationControlsComponent,
    PaginationControlsDirective,
    UserComponent,
    AdduserComponent,
    TestComponent,
    AddtestComponent,
    DiscussionfilterPipe,
    QuestionComponent,
    AddquestionComponent,
    AnslinkComponent,
    QuestionfilterPipe,
    TestdetailsComponent,
    AddtestdetailsComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    krishma1
  ],
  providers: [PaginationService,CategorydataService,AnswerdataService,QuestiondataService,
  CommentdataService,DiscussiondataService,FeedbackdataService,UserdataService,TestdataService,SubcatdataService,TestdetailsdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
