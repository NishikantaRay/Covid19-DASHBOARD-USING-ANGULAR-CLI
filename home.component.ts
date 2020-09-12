import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/modals/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed =0;
  totalActive =0;
  totalDeaths =0;
  totalRecovered =0;
   GoogleChartInterface = {
    chartType: 'PieChart',
    
  }
  ColumnChart:   {
    chartType: 'ColumnChart',
    
  }
  globalData :GlobalDataSummary[];
  constructor(private dataService : DataServiceService) { }
  

  // initChart(){

  //   let datatable =[];
  //   datatable.push(["country","cases"])
  //   this.globalData.forEach(cs=>
  //     {
  //       datatable.push([
  //         cs.country,cs.recovered
  //       ])
  //     })
  //     console.log(datatable);
      
  //   this.ColumnChart= {
  //     chartType: 'ColumnChart',
  //     dataTable: datatable,
  //     //firstRowIsData: true,
  //     options: {
  //       height :500
  //     },
  //   };
  //   this.pieChart= {
  //     chartType: 'PieChart',
  //     dataTable: datatable,
  //     //firstRowIsData: true,
  //     options: {
  //       height :500
  //     },
  //   };
  // }
  ngOnInit(): void {
    this.dataService.getGlobalData()
    .subscribe(
      {
        next : (result)=>{
          console.log(result);
          this.globalData =result;

          result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed)){
              this.totalActive+=cs.active
              this.totalConfirmed+=cs.confirmed
              this.totalDeaths+=cs.deaths
              this.totalRecovered+=cs.recovered
            }
            
          })
          // this.initChart();
        }
      }
    )
  }

}
