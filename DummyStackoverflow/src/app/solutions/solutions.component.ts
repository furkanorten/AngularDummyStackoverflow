import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css']
})
export class SolutionsComponent implements OnInit {

  solutionText:string = ''
  questionId: any
  questionObj: any

  constructor(public userService: UserService, public questionService: QuestionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('questionId')
    this.questionService.getQuestion(this.questionId).subscribe(res => {
      this.questionObj = res
    })
  }

  answer() {
    let solutionObj = {
      username: this.userService.user.username,
      solution: this.solutionText,
      plus:[],
      minus:[]
    }
    this.questionObj.solutions.push(solutionObj)
    this.questionService.updateQuestion(this.questionObj).subscribe(res => {
      this.solutionText = ''
    })
  }

  returnBack() {
    this.router.navigateByUrl('/home')
  }

  vote(index: number, val:number) {
    if(val == 1) {
      if(this.questionObj.solutions[index].plus.indexOf(this.userService.user.id) < 0) { // this user if not voted plus before
        this.questionObj.solutions[index].plus.push(this.userService.user.id)
      }
      for(let i=0; i<this.questionObj.solutions[index].minus.length; i++) { // if this user voted minus before, then delete it. because user voted plus
        if(this.questionObj.solutions[index].minus[i] == this.userService.user.id) {
          this.questionObj.solutions[index].minus.splice(i,1)
        }
      }
    }
    else {
      if(this.questionObj.solutions[index].minus.indexOf(this.userService.user.id) < 0) { // this user if not voted minus before
        this.questionObj.solutions[index].minus.push(this.userService.user.id)
      }
      for(let i=0; i<this.questionObj.solutions[index].plus.length; i++) { // if this user voted plus before, then delete it. because user voted minus
        if(this.questionObj.solutions[index].plus[i] == this.userService.user.id) {
          this.questionObj.solutions[index].plus.splice(i,1)
        }
      }
    }
    this.questionService.updateQuestion(this.questionObj).subscribe(res => {
      this.solutionText = ''
    })
  }

}
