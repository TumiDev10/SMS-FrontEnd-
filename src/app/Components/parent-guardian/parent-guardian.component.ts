import { Component, OnInit } from '@angular/core';
import { ParentGuardianService } from '../../Services/parent-guardian.service';

@Component({
  selector: 'app-parent-guardian',
  templateUrl: './parent-guardian.component.html',
  styleUrls: ['./parent-guardian.component.css']
})
export class ParentGuardianComponent implements OnInit {
importParents() {
throw new Error('Method not implemented.');
}
handleFileInput($event: Event) {
throw new Error('Method not implemented.');
}

  parentsGuardians: any[] = [];
  newParentGuardian: any = {};

  constructor(private parentGuardianService: ParentGuardianService) { }

  ngOnInit(): void {
    this.getParentsGuardian();
  }

  getParentsGuardian(): void {
    this.parentGuardianService.getParentGuardian()
      .subscribe(
        (response) => {
          this.parentsGuardians = response;
          console.log('Parent/Guardians:', this.parentsGuardians);
        },
        (error) => {
          console.error('Error fetching parent/guardians:', error);
        }
      );
  }

  addParentGuardian(): void {
    this.parentGuardianService.createParentGuardian(this.newParentGuardian) 
      .subscribe(
        (response) => {
          console.log('Parent/Guardian added:', response);
          // Refresh parent/guardian list
          this.getParentsGuardian();
        },
        (error) => {
          console.error('Error adding parent/guardian:', error);
        }
      );
  }

  updateParentGuardian(parentGuardian: any): void {
    this.parentGuardianService.updateParentGuardian(parentGuardian.parentId, parentGuardian.studentId, parentGuardian)
      .subscribe(
        (response) => {
          console.log('Parent/Guardian updated:', response);
        },
        (error) => {
          console.error('Error updating parent/guardian:', error);
        }
      );
  }

  deleteParentGuardian(parentId: number, studentId: number): void {
    this.parentGuardianService.deleteParentGuardian(parentId, studentId)
      .subscribe(
        (response) => {
          console.log('Parent/Guardian deleted:', parentId, studentId);
          // Refresh parent/guardian list
          this.getParentsGuardian();
        },
        (error) => {
          console.error('Error deleting parent/guardian:', error);
        }
      );
  }

}