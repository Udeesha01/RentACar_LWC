import { LightningElement, api, wire, track} from 'lwc';
import getCars from '@salesforce/apex/CarSearchResultComponentController.getCars';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarSearchResult extends LightningElement {

    @api carTypeId; //getting the value from parent component, based on the id we will make server side call and fetch the associated results
    @track cars;
    @track selectedCarId;

    @wire(getCars, {carTypeId : '$carTypeId'})
    wiredCars({data, error}){
        if(data){
            this.cars = data;

        } else if(error){
            this.showToast('ERROR', error.body.message, 'error');
        }
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    carSelectHandler(event){
        const carId = event.detail; //This ID represents the car that was clicked by the user.
        this.selectedCarId = carId;

    }

    get carsFound(){
        if(this.cars){
            return true
        } return false;
    }
    
}