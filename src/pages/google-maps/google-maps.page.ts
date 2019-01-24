import { Component } from '@angular/core';

import { IMarker, IPoint } from './interfaces';

@Component({
	templateUrl: 'google-maps.html'
})
export class GoogleMapsPage {
	public markers: IMarker[];
	public origin: IPoint;
	public zoom: number;

	constructor() {
		this.initMarkers();
		this.origin = {
			lat: 42.8208,
			lng: 13.6361
		};
		this.zoom = 9;
	}

	public clickedMarker(label: string) {
		window.alert(`clicked the marker: ${label || ''}`);
	}

	private initMarkers(): void {
		this.markers = [{
			lat: 42.8208,
			lng: 13.6361,
			label: 'C'
		}, {
			lat: 42.8208,
			lng: 13.6361,
			label: 'I'
		}, {
			lat: 42.8208,
			lng: 13.6361,
			label: 'A'
		}];
	}
}
