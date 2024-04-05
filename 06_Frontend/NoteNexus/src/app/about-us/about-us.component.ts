import { Component, ElementRef, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  viewport!: HTMLElement;
  cloudBG: string = 'http://www.clicktorelease.com/blog/css3dclouds/cloud.png';
  world!: HTMLDivElement;
  width: number = 0;
  height: number = 0;
  imgLayers: { image: HTMLImageElement; data: any }[] = [];
  numClouds: number = 5;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.viewport = this.elementRef.nativeElement.querySelector('#container');
    this.world = document.createElement('div');
    this.world.setAttribute('id', 'sky');
    this.viewport.appendChild(this.world);
    const margin = 300;
    this.width = this.viewport.offsetWidth - margin;
    this.height = this.viewport.offsetHeight - margin;

    const initialPositions = [
      -this.width / 2 + this.width * 0.05,
      -this.width / 2 + this.width * 0.2,
      0,
      this.width / 2 + this.width * 0.05,
      this.width / 2 + this.width * 0.35,
    ];
    for (let i = 0; i < this.numClouds; i++) {
      this.createCloud(initialPositions[i]);
    }
    this.updateZoom(1500);
    this.update();
  }

  createCloud(x: number): void {
    const cloud = {
      x: 0,
      y: 0,
      z: 0,
      xSpeed: 0,
    };

    cloud.x = x;
    cloud.y = this.height / 2 - Math.random() * this.height;
    cloud.z = 400 - Math.random() * 512;
    cloud.xSpeed = 0.2 + 0.05 * Math.random();

    for (let i = 0; i < 5 + Math.round(Math.random() * 10); i++) {
      const image = new Image();
      image.src = this.cloudBG;
      image.className = 'cloudLayer';

      const imgData = {
        x: cloud.x + 0.2 * (256 - Math.random() * 512),
        y: cloud.y + 0.2 * (256 - Math.random() * 512),
        z: cloud.z + 100 - Math.random() * 200,
        a: Math.random() * 360,
        s: 0.25 + Math.random(),
        xSpeed: cloud.xSpeed,
        rSpeed: 0.1 * Math.random(),
      };

      image.onload = () => {
        const t = `translateX(${imgData.x}px) translateY(${imgData.y}px) translateZ(${imgData.z}px) rotateZ(${imgData.a}deg) scale(${imgData.s})`;
        image.style.transform = t;
        image.style.zIndex = Math.floor(imgData.z).toString();
        this.world.appendChild(image);
        this.imgLayers.push({ image, data: imgData });
      };
    }
  }

  update(): void {
    const length = this.imgLayers.length;
    if (length < this.numClouds * 7) {
      console.log('creating cloud');
      this.createCloud(-this.width - 100);
    }

    for (let i = length - 1; i >= 0; i--) {
      const layer = this.imgLayers[i].image;
      if (!layer) {
        continue;
      }
      const imgData = this.imgLayers[i].data;
      imgData.x += imgData.xSpeed;
      imgData.a += imgData.rSpeed;

      if (imgData.x > this.width + 300) {
        console.log('deleting layer', i);
        this.world.removeChild(layer);
        this.imgLayers.splice(i, 1);
        continue;
      }

      const t = `translateX(${imgData.x}px) translateY(${imgData.y}px) translateZ(${imgData.z}px) rotateZ(${imgData.a}deg) scale(${imgData.s})`;
      layer.style.transform = t;
    }

    requestAnimationFrame(this.update.bind(this));
  }

  updateZoom(zoom: number): void {
    const t = `translateZ(${zoom}px)`;
    this.world.style.transform = t;
    $('.cloudLayer').css('opacity', 1);

    if (zoom >= 1) {
      zoom -= 5;
      requestAnimationFrame(this.updateZoom.bind(this, zoom));
    }
  }
}
