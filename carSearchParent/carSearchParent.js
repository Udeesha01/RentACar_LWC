import { LightningElement, track } from 'lwc';

export default class CarSearchParent extends LightningElement {

    @track carTypeId;

    carTypeSelectHandler(event){
        this.carTypeId = event.detail;
    }
}