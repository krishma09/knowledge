import { Routes,RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './category/addcategory.component';
import { AnswerComponent } from './answer/answer.component';
import { AddanswerComponent } from './answer/addanswer.component';
import { CommentComponent } from './comment/comment.component';
import {  AddcommentComponent } from './comment/addcomment.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { AdddiscussionComponent } from './discussion/adddiscussion.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AddfeedbackComponent } from './feedback/addfeedback.component';
import { CmntlinkComponent } from './discussion/cmntlink.component';
import { UserComponent } from './user/user.component';
import { AdduserComponent } from './user/adduser.component';
import { TestComponent } from './test/test.component';
import { AddtestComponent } from './test/addtest.component';
import { QuestionComponent } from './question/question.component';
import { AddquestionComponent } from './question/addquestion.component';
import { AnslinkComponent } from './question/anslink.component';
import { TestdetailsComponent } from './testdetails/testdetails.component';
import { AddtestdetailsComponent } from './testdetails/addtestdetails.component';


const krishma:Routes=[


{path:'',pathMatch:'full',redirectTo:'/allCategory'},
{path:'allCategory',component:CategoryComponent},
{path:'addCategory',component:AddcategoryComponent},
{path:'allAnswer',component:AnswerComponent},
{path:'addAnswer',component:AddanswerComponent},
{path:'allComment',component:CommentComponent},
{path:'addComment',component:AddcommentComponent},
{path:'allDiscussion',component:DiscussionComponent},
{path:'addDiscussion/:pk_d_id',component:AdddiscussionComponent},
{path:'allFeedback',component:FeedbackComponent},
{path:'addFeedback',component:AddfeedbackComponent},
{path:'addComment/:pk_c_id',component:AddcommentComponent},
{path:'addAnswer/:pk_ans_id',component:AddanswerComponent},
{path:'addCategory/:pk_cat_id',component:AddcategoryComponent},
{path:'addFeedback/:pk_f_id',component:AddfeedbackComponent},
{path:'cmntlink/:pk_d_id',component:CmntlinkComponent},
{path:'allUser',component:UserComponent},
{path:'addUser/:pk_email_id',component:AdduserComponent},
{path:'allTest',component:TestComponent},
{path:'addTest/:pk_t_id',component:AddtestComponent},
{path:'allQuestion',component:QuestionComponent},
{path:'addQuestion/:pk_q_id',component:AddquestionComponent},
{path:'anslink/:pk_q_id',component:AnslinkComponent},
{path:'allTestdetails',component:TestdetailsComponent},
{path:'addTestdetails/:pk_test_details_id',component:AddtestdetailsComponent}
];

export const krishma1=RouterModule.forRoot(krishma);