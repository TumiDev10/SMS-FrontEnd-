import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: any[] = [];
  newStudent: any = {};
  selectedFile: File | null = null;
  searchKeyword: string = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudent()
      .subscribe(
        (response) => {
          this.students = response;
          console.log('Students:', this.students);
        },
        (error) => {
          console.error('Error fetching students:', error);
        }
      );
  }

  addStudent(): void {
    // Check if a file is selected
    if (this.selectedFile) {
      // Assign the selected file to the new student
      this.newStudent.profilePicture = this.selectedFile.name;
    }

    this.studentService.createStudent(this.newStudent)
      .subscribe(
        (response) => {
          console.log('Student added:', response);
          // Refresh student list
          this.getStudents();
        },
        (error) => {
          console.error('Error adding student:', error);
        }
      );
  }

  updateStudent(student: any): void {
    this.studentService.updateStudent(student.id, student)
      .subscribe(
        (response) => {
          console.log('Student updated:', response);
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id)
      .subscribe(
        (response) => {
          console.log('Student deleted:', id);
          // Refresh student list
          this.getStudents();
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
  }

  // Method to handle file input change
  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      // Assign the selected file to the class variable
      this.selectedFile = fileList[0];
    }
  }

  searchStudents(keyword: string): void {
    this.studentService.getStudent(keyword)
      .subscribe(
        (response) => {
          this.students = response;
          console.log('Students:', this.students);
        },
        (error) => {
          console.error('Error fetching students:', error);
        }
      );
  }
}