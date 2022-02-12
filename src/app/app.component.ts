import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import * as jsPlumbBrowserUI  from '@jsplumb/browser-ui'
import { data } from './data';
import {FlowchartConnector} from '@jsplumb/connector-flowchart'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('diagram') diagram: any; 
  states:any= [];
  instance: any;
  zValue:number = 0.75;

  ngOnInit(){
    this.getStates();    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.instance.repaintEverything();
  }
  @HostListener('mousewheel', ['$event'])
    scroll(event: any) {
        console.log("Entered mouse wheel:",event);
        if(event.wheelDelta>0){
          this.zValue = this.zValue + 0.1;
        }
        else{
          this.zValue = this.zValue - 0.1;
        }
        if(this.zValue > 0){
          this.diagram.nativeElement.style.transform = `scale(${this.zValue})`;
        }   
    } 
  zoom(val:string){
    if(val == 'in'){
      this.zValue = this.zValue + 0.1;
    }else{
      this.zValue = this.zValue - 0.1;
    }
    //this.instance.setZoom(this.zValue, true);
    if(this.zValue > 0){
      this.diagram.nativeElement.style.transform = `scale(${this.zValue})`;
    }
  }

  ngAfterViewInit(): void {
    //console.log("states=>",this.states);
    const instance = jsPlumbBrowserUI.newInstance({
      container:this.diagram.nativeElement,
     // elementsDraggable: false,
     });
     instance.setZoom(this.zValue,true);
     this.instance = instance;
     let arrStates:any = document.getElementsByClassName('nodes');
     if(arrStates.length){
       for(let element of arrStates){
        this.instance.addEndpoint(element,{endpoint:'Blank'}); 
        instance.addToDragGroup(element,...arrStates);
       };      
     }
     let objData = JSON.parse(JSON.stringify(data));

     Object.keys(objData.transitions).forEach((tans)=>{
      console.log(objData.transitions[tans]);
      let transition = objData.transitions[tans];
      let source = document.getElementById(transition.state_from.id) as HTMLElement;
      let target = document.getElementById(transition.state_to.id) as HTMLElement;
      let denied = document.getElementById('denied') as HTMLElement;
      let anchors:any = [ "Top", "Top" ];
      if(transition.name == 'Deny'){
        anchors = [ "Bottom", "Bottom"];
        target = denied;
      }
      this.instance.connect({
          source:source,
          target:target,
          anchors:anchors,
          label:transition.name,
          endpoint:'Blank',
          connector:{
            type: FlowchartConnector.type,
            options: {
              stub: [10, 20],
              gap: 1,
              cornerRadius: 0,
              alwaysRespectStubs: true,
              cssClass:'custom-connector'
            }
          },    
          // overlays:[["Arrow",{location:1,width:10, length:10}]],      
          overlays:[ 
            { type:"Arrow", options:{location:1,width:10,length:10, cssClass:'custom-plainArrow'}},
            { 
                type:"Label", 
                options:{ label:"", location:0.25 } 
            }
          ]
         })
    }); 
     //instance.addEndpoint(el1,{endpoint: 'Dot'});
    //  instance.connect({
    //   source:el,
    //   target:el1
    // })
     //instance.addEndpoint(<any>this.nodes[1]);
    //  this.nodes.forEach(node => {
    //    let element = document.getElementById(node.id) as any;
    //    element.instance = jsPlumbBrowserUI;
    //   // instance.addEndpoint(element, {
    //   //   endpoint: "Dot",  // rectangle, blank, image
    //   //   //anchor: [0, 0.5, -1, 0],
    //   //   //isSource: true,
    //   //   //connectionType: "red-connection"
    //   // });       
    //  });     
     
  //    instance.connect({
  //      source:control1,
  //      target:control2
  //  })
  }

  getStates() {
    let objData = JSON.parse(JSON.stringify(data));
    Object.keys(objData.states).forEach((state)=>{
      this.states.push(objData.states[state]);
    });  
    console.log(this.states);  
  }  

  draggMe(event:any){
    console.log(event);
    if(event.which == 1){
      this.diagram.nativeElement.style.position = 'absolute';
      this.diagram.nativeElement.style.cursor = 'move';
      //this.diagram.nativeElement.style.cursor = 'move';
    }
  }
}


