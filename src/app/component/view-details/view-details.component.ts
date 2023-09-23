import { Component, OnInit } from '@angular/core';
import { ViewDetailsService } from './view-details.service';
import { jsDocComment } from '@angular/compiler';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NavigationComponent } from '../navigation/navigation.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  view_in_header = "CareerShot"
  breakpoint: any=2;

  length = 0;
  pageSize = 6;
  pageSizeOptions = [4, 6, 10];

  currentPageData:any = []
  currentPageNumber = 0;
  currentPageSize = 6;  

  my_data:any = [];
  typehr: boolean = false;
  typefinance: boolean = false;
  typesoftware: boolean = false;
  typegovt: boolean = false;

  currentLocation = "";

  status_open: boolean = false;
  status_close: boolean = false;
  status_all: boolean = false;

  location_india: boolean = false;
  location_blr: boolean = false;
  location_hyd: boolean = false;

  available_company_name: any = [];
  available_location: any = [];

  skill_required_visibility = true;

  is_filter_applied: boolean = false;
  selected_job_type: any = [];
  selected_status: any = [];
  selected_location: any = [];
  selected_company: string = "";

  previous_selected_location: string = "";

  constructor(private service: ViewDetailsService) { }


  ngOnInit(): void {
    this.my_data = [];
    if(this.typehr || this.typegovt || this.typefinance || this.typesoftware || this.status_open || this.status_close || 
      this.selected_location.length > 0 || this.selected_company !== ""){
      this.is_filter_applied = true;
    }
    else{
      this.is_filter_applied = false;
    }

    if(this.is_filter_applied){
      this.currentPageData = [];
      this.getDataWithFilter();
      // this.currentPageNumber = 0;
      // this.my_data = this.getDataWithoutFilter();      
    }
    else{
      this.getDataWithoutFilter();
      this.available_company_name = [...new Set(this.available_company_name)];
      this.available_location = [...new Set(this.available_location)];
    }

    this.currentPageData = this.my_data.slice(0, this.pageSize);
    this.currentPageData = this.currentPageData.splice(0, this.pageSize);
    this.length = this.my_data.length;

    this.available_company_name = [...new Set(this.available_company_name)];
    this.my_data = this.my_data.reverse();

    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    
  }

  getDataWithoutFilter(){
    this.my_data = [];
    this.currentPageData = [];
    this.service.getData().subscribe(data => {
      for(let x of data['data']){
        // jd: new JobDetails();
        var jobDetailsObject = {
          "company_name": x.company_name,
          "position": x.position,
          "req_experience": x.req_experience,
          "link": x.link,
          "company_logo": x.company_logo,
          "skill_vis_check": x.skill_vis_check,
          "req_skills": x.req_skills,
          "location": x.location,
          "status": x.status,
          "job_type": x.job_type
        };

        this.my_data.push(jobDetailsObject);
        this.available_company_name.push(x['company_name']);
        this.available_location.push(x['location']);
        if(this.currentPageData.length < this.pageSize){
          this.currentPageData.push(jobDetailsObject);
        }
        

        this.length += 1;

        this.available_location = [...new Set(this.available_location)];
        
      }
    });

    return this.my_data;
  }

  getDataWithFilter(){

    this.currentPageData = [];

    this.service.getData().subscribe(data => {
      for(let x of data['data']){
        // jd: new JobDetails();
        var jobDetailsObject = {
          "company_name": x.company_name,
          "position": x.position,
          "req_experience": x.req_experience,
          "link": x.link,
          "company_logo": x.company_logo,
          "skill_vis_check": x.skill_vis_check,
          "req_skills": x.req_skills,
          "location": x.location,
          "status": x.status,
          "job_type": x.job_type
        };

        if(this.selected_company !== "" && this.selected_job_type.length > 0 && this.selected_location.length > 0 && this.selected_status.length > 0){
          if(this.service.getFilteredDataForNameStatusLocationJobType(jobDetailsObject, this.selected_company, 
            this.selected_status, this.selected_location, this.selected_job_type)){
              this.my_data.push(jobDetailsObject);
              if(this.currentPageData.length < this.pageSize){
                this.currentPageData.push(jobDetailsObject);
                this.length += 1;
              }
            }
        }
        else if(this.selected_company !== "" && this.selected_status.length > 0 && this.selected_location.length > 0){
          if(this.service.getFilteredDataForNameStatusLocation(jobDetailsObject, this.selected_company, this.selected_status, 
            this.selected_location)){
              this.my_data.push(jobDetailsObject);
              if(this.currentPageData.length < this.pageSize){
                this.currentPageData.push(jobDetailsObject);
                this.length += 1;
              }
            }
        }
        else if(this.selected_company !== "" && this.selected_status.length > 0 && this.selected_job_type.length > 0){
          if(this.service.getFilteredDataForNameStatusJobType(jobDetailsObject, this.selected_company, this.selected_status, 
            this.selected_job_type)){
              this.my_data.push(jobDetailsObject);
              if(this.currentPageData.length < this.pageSize){
                this.currentPageData.push(jobDetailsObject);
                this.length += 1;
              }
            }
        }
        else if(this.selected_company !== "" && this.selected_location.length > 0 && this.selected_job_type.length > 0){
          if(this.service.getFilteredDataForNameLocationJobType(jobDetailsObject, this.selected_company, this.selected_location, 
            this.selected_job_type)){
              this.my_data.push(jobDetailsObject);
              if(this.currentPageData.length < this.pageSize){
                this.currentPageData.push(jobDetailsObject);
                this.length += 1;
              }
            }
        }
        else if(this.selected_status.length > 0 && this.selected_location.length > 0 && this.selected_job_type.length > 0){
          if(this.service.getFilteredDataForStatusLocationJobType(jobDetailsObject, this.selected_status, this.selected_location, 
            this.selected_job_type)){
              this.my_data.push(jobDetailsObject);
              if(this.currentPageData.length < this.pageSize){
                this.currentPageData.push(jobDetailsObject);
                this.length += 1;
              }
            }
        }
        else if(this.selected_company !== "" && this.selected_status.length > 0){
          if(this.service.getFilteredDataForNameStatus(jobDetailsObject, this.selected_company, this.selected_status)){
            this.my_data.push(jobDetailsObject);
            if(this.currentPageData.length < this.pageSize){
              this.currentPageData.push(jobDetailsObject);
              this.length += 1;
            }
          }
        }
        else if(this.selected_location.length > 0 && this.selected_job_type.length > 0){
          if(this.service.getFilteredDataForLocationJobType(jobDetailsObject, this.selected_location, this.selected_job_type)){
            this.my_data.push(jobDetailsObject);
            if(this.currentPageData.length < this.pageSize){
              this.currentPageData.push(jobDetailsObject);
              this.length += 1;
            }
          }
        }
        else if(this.selected_company !== "" && this.selected_job_type.length > 0){
          if(this.service.getFilteredDataForNameJobType(jobDetailsObject, this.selected_company, this.selected_job_type)){
            this.my_data.push(jobDetailsObject);
            if(this.currentPageData.length < this.pageSize){
              this.currentPageData.push(jobDetailsObject);
              this.length += 1;
            }
          }
        }
        else if(this.selected_company !== "" &&  this.selected_location.length > 0){
          if(this.service.getFilteredDataForNameLocation(jobDetailsObject, this.selected_company, this.selected_location)){
            this.my_data.push(jobDetailsObject);
            if(this.currentPageData.length < this.pageSize){
              this.currentPageData.push(jobDetailsObject);
              this.length += 1;
            }
          }
        }
        else if(this.selected_status.length > 0 && this.selected_job_type.length > 0){
          if(this.service.getFilteredDataForStatusJobType(jobDetailsObject, this.selected_status, this.selected_job_type)){
            this.my_data.push(jobDetailsObject);
            if(this.currentPageData.length < this.pageSize){
              this.currentPageData.push(jobDetailsObject);
              this.length += 1;
            }
          }
        }
        else if(this.selected_status.length > 0 && this.selected_location.length > 0){
          if(this.service.getFilteredDataForStatusLocation(jobDetailsObject, this.selected_status, this.selected_location)){
            this.my_data.push(jobDetailsObject);
            if(this.currentPageData.length < this.pageSize){
              this.currentPageData.push(jobDetailsObject);
              this.length += 1;
            }
          }
        }
        else if(this.selected_company !== ""){
          if(this.service.getFilteredDataForName(jobDetailsObject, this.selected_company)){
            this.my_data.push(jobDetailsObject);
            if(this.currentPageData.length < this.pageSize){
              this.currentPageData.push(jobDetailsObject);
              this.length += 1;
            }
          }
        }
        else if(this.selected_status.length > 0){
          if(this.service.getFilteredDataForStatus(jobDetailsObject, this.selected_status)){
            this.my_data.push(jobDetailsObject);
            if(this.currentPageData.length < this.pageSize){
              this.currentPageData.push(jobDetailsObject);
              this.length += 1;
            }
          }
        }
        else if(this.selected_location.length > 0){
          console.log()
          if(this.service.getFilteredDataForLocation(jobDetailsObject, this.selected_location)){
            this.my_data.push(jobDetailsObject);
            if(this.currentPageData.length < this.pageSize){
              this.currentPageData.push(jobDetailsObject);
              this.length += 1;
            }
          }
        }
        else if(this.selected_job_type.length > 0){
          console.log(">> ", this.service.getFilteredDataForJobType(jobDetailsObject, this.selected_job_type));
          if(this.service.getFilteredDataForJobType(jobDetailsObject, this.selected_job_type)){
            this.my_data.push(jobDetailsObject);
            if(this.currentPageData.length < this.pageSize){
              this.currentPageData.push(jobDetailsObject);
              this.length += 1;
            }
          }
        }

      }
    
      

  });
      
  }

  getMappedData(x: any){
    this.length += 1;
    var jobDetailsObject = {
      "company_name": x.companyName,
      "position": x.position,
      "req_experience": x.reqExperience,
      "link": x.link,
      "company_logo": x.companyLogo,
      "skill_vis_check": x.skillVisCheck,
      "req_skills": x.reqSkills,
      "location": x.location,
      "status": x.status,
      "job_type": x.jobType
    }
    return jobDetailsObject;
  }

  getButtonClick(link: string){
    // alert(link);
    window.open(link);
  }

  onMouseOver(company_name: any){
    let i=0;
    for(let data of this.my_data){
      if(data.company_name === company_name ){
        this.my_data[i].skill_vis_check = true;
        
      }
      i+=1;
    }

  }

  onMouseOut(company_name: any){
    let i=0;
    for(let data of this.my_data){
      if(data.company_name === company_name ){
        this.my_data[i].skill_vis_check = false;
        
      }
      i+=1;
    }
  }

  check_type(job_type: any){
    if(job_type == 'software')
    {
      this.typesoftware = !this.typesoftware;
      if(this.typesoftware == false && this.selected_job_type.indexOf("software") > -1){
        const index = this.selected_job_type.indexOf("software");
        this.selected_job_type.splice(index, 1);
      }
      else{
        this.selected_job_type.push("software");
      }
      
    }
    else if(job_type == "finance"){
      this.typefinance = !this.typefinance;
      if(this.typefinance == false && this.selected_job_type.indexOf("finance") > -1){
        const index = this.selected_job_type.indexOf("finance");
        this.selected_job_type.splice(index, 1);
      }
      else{
        this.selected_job_type.push("finance");
      }

    }
    else if(job_type == "hr"){
      this.typehr = !this.typehr;
      if(this.typehr == false && this.selected_job_type.indexOf("hr") > -1){
        const index = this.selected_job_type.indexOf("hr");
        this.selected_job_type.splice(index, 1);
      }
      else{
        this.selected_job_type.push("hr");
      }
    }
    else if(job_type == "govt"){
      this.typegovt = !this.typegovt;
      if(this.typehr == false && this.selected_job_type.indexOf("govt") > -1){
        const index = this.selected_job_type.indexOf("govt");
        this.selected_job_type.splice(index, 1);
      }
      else{
        this.selected_job_type.push("govt");
      }
    }
    this.ngOnInit();
  }

  check_status(status_type: any){
    if(status_type == 'all')
    {
      
    }
    else if(status_type == "open"){
      this.status_open = !this.status_open;
      if(this.status_open == false && this.selected_status.indexOf("open") > -1){
        const index = this.selected_status.indexOf("open");
        this.selected_status.splice(index, 1)
      }
      else{
        this.selected_status.push("open");
      }
    }
    else if(status_type == "close"){
      this.status_close = !this.status_close;
      if(this.status_close == false && this.selected_status.indexOf("close") > -1){
        const index = this.selected_status.indexOf("close");
        this.selected_status.splice(index, 1)
      }
      else{
        this.selected_status.push("close");
      }
    }
    this.ngOnInit();
  }

  check_location(location: any){
    if(location == 'NCR')
    {
      this.location_india = !this.location_india;
      if(this.location_india == false && this.selected_location.indexOf("NCR") > -1){
        const index = this.selected_location.indexOf("NCR");
        this.selected_location.splice(index, 1)
      }
      else{
        this.selected_location.push("NCR");
      }
    }
    else if(location == "blr"){
      this.location_blr = !this.location_blr;
      if(this.location_blr == false && this.selected_location.indexOf("blr") > -1){
        const index = this.selected_location.indexOf("blr");
        this.selected_location.splice(index, 1)
      }
      else{
        this.selected_location.push("blr");
      }
    }
    else if(location == "hyd"){
      this.location_hyd = !this.location_hyd;
      if(this.location_hyd == false && this.selected_location.indexOf("hyd") > -1){
        const index = this.selected_location.indexOf("hyd");
        this.selected_location.splice(index, 1)
      }
      else{
        this.selected_location.push("hyd");
      }
    }
    this.ngOnInit();
  }

  getLocation(e: any): void{
    let find = this.available_location.find((x: any) => x === e.target.value);
    if(find){
      if(this.previous_selected_location !== ""){
        const index = this.selected_location.indexOf(this.previous_selected_location);
        this.selected_location.splice(index, 1);
      }
      this.selected_location.push(find);
      this.previous_selected_location = find;
    }
    else {
      const index = this.selected_location.indexOf(this.previous_selected_location);
      this.selected_location.splice(index, 1);
      this.previous_selected_location = "";
    }
    this.ngOnInit();
  }

  getCompany(e: any): void{
    if(e.target.value){
      this.selected_company = this.available_company_name.find((x: any) => x === e.target.value);
    }
    else{
      this.selected_company = "";
    }
    this.ngOnInit();
  }

  resetFilter(){
    window.location.reload();
  }

  getDataForName(job_details: any){
    var my_data: any = [];
    for(let job_detail of job_details){
      if(job_detail["name"] == this.selected_company){
        my_data.push(job_detail);
      }
    }
    return my_data;
  }

  getDataForType(job_details: any){
    var my_data: any = [];
    for(let job_detail of job_details){
      if(this.selected_job_type.indexOf(job_detail["type"]) > -1){
        my_data.push(job_detail);
      }
    }
    return my_data;
  }

  getDataForLocation(job_details: any){
    var my_data: any = [];
    for(let job_detail of job_details){
      if(this.selected_location.indexOf(job_detail["location"]) > -1){
        my_data.push(job_detail);
      }
    }
    return my_data;
  }

  getDataForStatus(job_details: any){
    var my_data: any = [];
    for(let job_detail of job_details){
      if(this.selected_status.indexOf(job_detail["status"]) > -1){
        my_data.push(job_detail);
      }
    }
    return my_data;
  }

  onPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.my_data.length){
      endIndex = this.my_data.length;
    }

    this.currentPageNumber = event.pageIndex;
    this.currentPageSize = event.pageSize;
    this.pageSize = this.currentPageSize;

    this.currentPageData = this.my_data.slice(startIndex, endIndex);
    console.log(this.currentPageData);
    console.log(this.currentPageSize);
    console.log(startIndex, endIndex);
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 768) ? 1 : 2;
  }

}
