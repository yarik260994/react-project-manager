import * as React from 'react';

export default class Toolbar extends React.Component<any, any> {
 constructor(props: any) {
   super(props);
   this.handleZoomChange = this.handleZoomChange.bind(this);
 }

 handleZoomChange(e: any) {
   if(this.props.onZoomChange){
     this.props.onZoomChange(e.target.value)
   }
 }

 render() {
   let zoomRadios = ['Hours', 'Days', 'Months'].map((value) => {
     let isActive = this.props.zoom === value;
     return (
       <label key={value} className={`radio-label ${isActive ? 'radio-label-active': ''}`}>
         <input type='radio'
            checked={isActive}
            onChange={this.handleZoomChange}
            value={value}/>
         {value}
       </label>
     );
   });

   return (
     <div className="zoom-bar">
       <b>View: </b>
         {zoomRadios}
     </div>
   );
 }
}