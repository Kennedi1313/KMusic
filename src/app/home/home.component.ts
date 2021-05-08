import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import {Howl, Howler} from 'howler';

interface Track {
  name: string,
  path: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  @Input('track') track: Track[] = null;

  playlist: Track[] = [

  ];

  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  duration = 0;
  progress = 0;
  @ViewChild('range') range: MatSlider

  constructor() { }

  ngOnInit(): void {
    this.playlist = this.track;
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  start(track: Track) {
    if(this.player) {
      this.player.stop();
    }

    this.player = new Howl({
      src: [track.path],
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = track;
        this.duration = this.player.duration();
        this.updateProgress();
      },
      onend: () => {
        this.next();
      }
    })
    this.player.play();
  }

  togglePlayer(pause) {

    if(this.activeTrack === null){
      this.start(this.playlist[0]);
      return null;
    }

    this.isPlaying = !pause;
    if(pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  next() {
    let index = this.playlist.indexOf(this.activeTrack);
    if(index != this.playlist.length - 1) {
      this.start(this.playlist[index + 1]);
    } else {
      this.start(this.playlist[0])
    }
  }

  prev() {
    let index = this.playlist.indexOf(this.activeTrack);
    if(index > 0) {
      this.start(this.playlist[index - 1]);
    } else {
      this.start(this.playlist[this.playlist.length - 1])
    }
  }

  seek() {
    console.log("moveu")
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    let seek: number = +this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000);
  }

}
