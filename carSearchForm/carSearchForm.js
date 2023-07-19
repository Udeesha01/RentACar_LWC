import { LightningElement, track, wire } from 'lwc';
import getCarTypes from '@salesforce/apex/CarSearchFormController.getCarTypes';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CarSearchForm extends NavigationMixin(LightningElement) {

    //js file is making a server side call to return car types from server, hence creating apex class 

    //carTypes is an array of object with label and value pair

    @track carTypes;

    //getCarTypes is the wire adapter which wires its result to wiredCarType fuction

    @wire(getCarTypes)
    wiredCarType({data, error}){
        if(data){
            this.carTypes = [{value:'', label:'All Types'}];  //default element of array 
            data.forEach(element => {
                const carType = {};
                carType.label = element.Name; //since carTypes is array of label and value pair but from server we are getting array of  name, id so we will be manipulating the data
                carType.value = element.Id;
                this.carTypes.push(carType);
            });
        } else if(error){
            this.showToast('ERROR', error.body.message, 'error');
        }
    }

    handleCarTypeChange(event){

        const carTypeId = event.detail.value;
        const carTypeSelectionChangeEvent = new CustomEvent('cartypeselect', {detail : carTypeId});
        this.dispatchEvent(carTypeSelectionChangeEvent);

    }

    createNewCarType(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName : 'Car_Type__c',
                actionName : 'new'
            }
        });
    }



    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
}