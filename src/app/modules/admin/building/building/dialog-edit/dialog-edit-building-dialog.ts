import {
    ChangeDetectionStrategy,
    ElementRef,
    Inject,
    ViewChild,
} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogModule,
} from '@angular/material/dialog';
import { BuildingService } from '../building.service';
import { Building } from '../building.types';
import { SharedModule } from 'app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PermissionPipe } from 'app/pipes/PermissionPipe';

@Component({
    selector: 'inventory-list',
    templateUrl: './dialog-edit-building-dialog.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        SharedModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        PermissionPipe,
    ],
})
export class DialogEditBuildingDialog {
    @ViewChild('fileInput') el: ElementRef;
    contactForm: FormGroup;
    building: Building;
    type: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<DialogEditBuildingDialog>,
        private _formBuilder: FormBuilder,
        private _buildingService: BuildingService
    ) {}

    ngOnInit(): void {
        this.building = this.data['data'] || null;
        this.type = this.data['type'];
        this.contactForm = this._formBuilder.group({
            addressId: [''],
            statecode: [''],
            address: [''],
            zipcode: [''],
            city: [''],
            statename: ['', [Validators.required]],
        });
        if (this.type === 'edit') {
            this.contactForm.patchValue(this.building);
        }
    }

    saveClicked() {
        if (this.type === 'edit') {
            this._buildingService.updateProduct(
                this.building.addressId,
                this.contactForm.value
            );
        }
        if (this.type === 'new') {
            this._buildingService.createProduct(this.contactForm.value);
        }
        this.dialogRef.close({ done: true });
    }
}
