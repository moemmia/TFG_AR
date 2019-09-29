import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppFacade, CriteriaDetail} from '../../tools/appfacade';
import {LoaderController} from '../../tools/loadercontroller';
import { ArrayKit } from '../../tools/arraykit';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';

@Component({
  selector: 'app-eval-selection',
  templateUrl: './eval-selection.page.html',
  styleUrls: ['./eval-selection.page.scss'],
})
export class EvalSelectionPage implements OnInit {

  lorem = "Lorem ipsum dolor sit amet consectetur adipiscing elit class metus aliquet, platea ullamcorper nibh aptent placerat varius sociis lobortis. Euismod volutpat sollicitudin ultricies donec nec eu tincidunt proin senectus, cum conubia fusce himenaeos faucibus mattis risus iaculis, ut litora netus suscipit ac sagittis potenti vulputate.";

  list = [
    {
      title: 'perception',
      name: 'perception',
      text: this.lorem
    },
    {
      title: 'ergonomics',
      name: 'ergonomics',
      text: this.lorem
    },
    {
      title: 'presence',
      name: 'presence',
      text: this.lorem
    },
    {
      title: 'availability',
      name: 'availability',
      text: this.lorem
    },
    {
      title: 'easy to use',
      name: 'easy',
      text: this.lorem
    }];

  id: any;
  currentUserId:string;

  constructor(private loaderController: LoaderController,private arraykit: ArrayKit,private appfacade:AppFacade, private fireAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.loaderController.show();
    let user=this.fireAuth.auth.currentUser;
    if(user!=null){
      this.currentUserId = this.fireAuth.auth.currentUser.uid;
    }else{
      this.fireAuth.auth.onAuthStateChanged((user) => {
       if (user) {
         this.currentUserId = user.uid;
       }
      });
    }

    route.params.subscribe(
      (params) => {
        this.id = params['id'];
        this.checkCriteria();

      },
    );
  }

  checkCriteria(){
    this.appfacade.getAppById(this.id).snapshotChanges().subscribe(
      x => {
        let data:any =  x.payload.data();
        let criteria = this.arraykit.objectToArray(data.criteria);
        criteria.forEach(
        cr => {
          console.log(cr)
          this.changeList(cr.name,cr.active);
        });
        this.loaderController.hide();
      }
    );
  }

  changeList(criteria,active){
    $("#"+criteria+"-check").attr('checked',active);
    $("#"+criteria+"-check").attr('disabled',!active);
    if(!active){
      $("#"+criteria+"-name").attr('color','medium');
    }
  }

  show(id){
      $("#"+id+"-text").attr("hide",$("#"+id+"-text").attr("hide")=="true"?false:true);
      $("#"+id+"-arrow").attr("name",$("#"+id+"-text").attr("hide")=="true"?"arrow-dropdown":"arrow-dropup");
  }

  ngOnInit(){

  }
}
