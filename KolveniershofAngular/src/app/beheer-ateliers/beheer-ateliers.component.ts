import { Component, OnInit, ViewChild } from '@angular/core';
import { AtelierService } from '../services/atelier.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Atelier } from '../models/atelier.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-beheer-ateliers',
  templateUrl: './beheer-ateliers.component.html',
  styleUrls: ['./beheer-ateliers.component.scss']
})
export class BeheerAteliersComponent implements OnInit {
  public ateliersLoaded = false;
  public ateliers = new Array<Atelier>();
  public atelierLijst = new MatTableDataSource<Atelier>();
  public kolommen: string[] = ['nummer', 'picto', 'naam', 'bewerken'];

  @ViewChild('ateliertabel', {read: MatSort}) sort: MatSort;

  constructor(
    private router: Router,
    private atelierService: AtelierService
    ) { }

  ngOnInit() {
    this.atelierService
    .getAteliers()
    .pipe(
      finalize(() => {
        this.ateliersLoaded = true;
      })
    )
    .subscribe(entry => {
      this.ateliers = entry;
      this.atelierLijst.data = this.ateliers;
      setTimeout(() => {
        this.atelierLijst.sort = this.sort;
      });
    });
  }

  public getUrl(): string {
    return `${environment.imageUrl}`;
  }

  public redirect(atelier: Atelier): void {
    this.router.navigate([`/ateliers/${atelier.atelierId}`]);
  }

  public nieuwAtelier(): void {
    this.router.navigate([`/ateliers/`]);
  }

  public verwijderAtelier(atelier: Atelier) {
    if(confirm('Bent u zeker dat u het atelier ' + atelier.naam + ' wilt verwijderen?')) {
      this.atelierService
      .deleteAtelier(atelier.atelierId)
      .subscribe(response => {
        alert('Atelier ' + atelier.naam + ' werd verwijderd.');
      },
      error => {},
      () => {
        window.location.reload();
      });
    }
  }
}
