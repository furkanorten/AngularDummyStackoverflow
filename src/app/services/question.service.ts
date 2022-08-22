import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService{

  public user: any

  constructor(private baseService: BaseService) {
    super(baseService.http)
  }

  public postQuestion(questionObj:any) {
    return this.postReq('/questions', questionObj)
  }

  public getQuestions() {
    return this.getReq('/questions')
  }

  public getQuestion(id:string) {
    return this.getReq('/questions/'+id)
  }

  public updateQuestion(newObj: any) {
    return this.putReq('/questions/'+newObj.id, newObj)
  }

}
