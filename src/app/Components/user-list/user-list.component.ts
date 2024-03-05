import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
updateUser(arg0: any) {
throw new Error('Method not implemented.');
}

  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(
        (response) => {
          this.users = response.map((user: any) => {
            return {
              userIsd: user.userId,
              username: user.username,
              role: user.role
            };
          });
          console.log('Users:', this.users);
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id)
      .subscribe(
        () => {
          console.log('User deleted:', id);
          // Refresh user list
          this.getUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
  }

  

}