import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-load-exam',
  templateUrl: './load-exam.component.html',
  styleUrls: ['./load-exam.component.css']
})
export class LoadExamComponent implements OnInit {

  catId: any;
  exams: any;
  expanded: boolean[] = [];

  constructor(private route:ActivatedRoute,
              private examService:ExamService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catId = params['catId'];
      if(this.catId == 0) {
        console.log("Cargando todos los exámenes");
        this.examService.getEnabledExams().subscribe(
          (data) => {
            this.exams = data;
            this.expanded = new Array(this.exams.length).fill(false);
            console.log(this.exams);
          },
          (error) => {
            console.log(error);
          }
        )
      } else {
        console.log("Cargando un exámen en específico");
        this.examService.getEnabledExamsOfACategory(this.catId).subscribe(
          (data:any) => {
            this.exams = data;
            console.log(this.exams);
          },
          (error) => {
            console.log(error);
          }
        )
  
      }
    }); 
  }

  toggleExpansion(index: number): void {
  this.expanded[index] = !this.expanded[index];
  }
  /*
  toggleExpansion(index: number, descriptionElement: HTMLElement): void {
    this.expanded[index] = !this.expanded[index];

    if (this.expanded[index]) {
      this.positionReadMore(descriptionElement);
    }
  }

  positionReadMore(descriptionElement: HTMLElement): void {
    const readMoreElement = document.querySelector('.expanded') as HTMLElement;

    if (readMoreElement && descriptionElement) {
      const descriptionHeight = descriptionElement.scrollHeight;
      readMoreElement.style.top = descriptionHeight + 'px';
    }
  }*/

  isDescriptionLong(description: string): boolean {
    const maxHeight = 40;
    const dummyElement = document.createElement('div');
    dummyElement.innerHTML = description;
    dummyElement.style.position = 'absolute';
    dummyElement.style.visibility = 'hidden';
    dummyElement.style.height = 'auto';
    dummyElement.style.width = '300px'; // Ajusta esto según tus necesidades
    dummyElement.style.maxHeight = maxHeight + 'px';
    dummyElement.style.overflow = 'hidden';
    document.body.appendChild(dummyElement);

    const isOverflowing = dummyElement.scrollHeight > maxHeight;

    document.body.removeChild(dummyElement);

    return isOverflowing;
  }

}
