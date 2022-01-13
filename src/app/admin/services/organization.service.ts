import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from 'src/app/core/models/organization';
import { DataService } from 'src/app/shared/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService extends DataService<Organization> {
  constructor(http: HttpClient) {
    super('http://localhost:3000/api/organizations', http);
  }
}
