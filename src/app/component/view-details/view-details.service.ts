import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
// import * as internal from 'stream';

@Injectable({
  providedIn: 'root'
})
export class ViewDetailsService {

  // filteredURI: any = "http://ec2-34-205-28-102.compute-1.amazonaws.com/api/get-filtered-jobs/";
  // URI: any = "http://ec2-34-205-28-102.compute-1.amazonaws.com/api/get-jobs/";
  URI: any = "assets/data_api.json"
  filteredURI = "assets/data_api.json"

  constructor(private http: HttpClient) { }

  public getData(): Observable<any> {
    return this.http.get(this.URI);
  }


  getFilteredDataForNameStatusLocationJobType(x: any, name: string, statusArray: string[], locationArray: string[], jobType: string[]): any {
    if(x.company_name == name && statusArray.indexOf(x.status) > -1 && locationArray.indexOf(x.location) > -1 && jobType.indexOf(x.job_type) > -1){
        return true;
      }
    return false;
  }

  public getFilteredDataForNameStatusLocation(x: any, name: string, statusArray: string[], locationArray: string[]) : any {
    if(x.company_name == name && statusArray.indexOf(x.status) > -1 && locationArray.indexOf(x.location) > -1){
        return true;
    }
    return false;
  }

  getFilteredDataForNameStatusJobType(x: any, name: string, statusArray: string[], jobType: string[]): any {
    if(x.company_name == name && statusArray.indexOf(x.status) > -1 && jobType.indexOf(x.job_type) > -1){
        return true;
    }
    return false;
  }

  getFilteredDataForNameLocationJobType(x: any, name: string, locationArray: string[], jobType: string[]): any {
    if(x.company_name == name && locationArray.indexOf(x.location) > -1 && jobType.indexOf(x.job_type) > -1){
      return true;
    }
    return false;
  }

  getFilteredDataForStatusLocationJobType(x: any, statusArray: string[], locationArray: string[], jobType: string[]): any {
    if(statusArray.indexOf(x.status) > -1 && locationArray.indexOf(x.location) > -1 && jobType.indexOf(x.job_type) > -1){
      return true;
    }
    return false;
  }

  getFilteredDataForNameStatus(x: any, name: string, statusArray: string[]): any {
    if(x.company_name == name && statusArray.indexOf(x.status) > -1){
      return true;
    }
    return false;
  }

  getFilteredDataForLocationJobType(x: any, locationArray: string[], jobType: string[]): any {
    if(locationArray.indexOf(x.location) > -1 && jobType.indexOf(x.job_type) > -1){
      return true;
    }
    return false;
  }

  getFilteredDataForNameJobType(x: any, name: string, jobType: string[]): any {
    if(x.company_name == name && jobType.indexOf(x.job_type) > -1){
      return true;
    }
    return false;
  }

  getFilteredDataForNameLocation(x: any, name: string, locationArray: string[]): any {
    if(x.company_name == name && locationArray.indexOf(x.location) > -1){
      return true;
    }
    return false;
  }

  getFilteredDataForStatusJobType(x: any, statusArray: string[], jobType: string[]): any {
    if(statusArray.indexOf(x.status) > -1 && jobType.indexOf(x.job_type) > -1){
      return true;
    }
    return false;
  }

  getFilteredDataForStatusLocation(x: any, statusArray: string[], locationArray: string[]): any {
    if(statusArray.indexOf(x.status) > -1 && locationArray.indexOf(x.location) > -1){
      return true;
    }
    return false;
  }
// ============================================================================================================
  getFilteredDataForName(x: any, name: string): any {
    if(x.company_name == name){
      return true;
    }
    return false;
  }

  getFilteredDataForStatus(x: any, statusArray: string[]): any {
    if(statusArray.indexOf(x.status) > -1){
      return true;
    }
    return false;
  }

  getFilteredDataForLocation(x: any, locationArray: string[]): any {
    if(locationArray.indexOf(x.location) > -1){
      return true;
    }
    return false;
  }

  getFilteredDataForJobType(x: any, jobType: string[]): any {
    if(jobType.indexOf(x.job_type) > -1){
      return true;
    }
    return false;
  }

}
