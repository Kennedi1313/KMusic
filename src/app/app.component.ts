import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KMusic';

  track: {
    name: string,
    path: string
  }[] = [];

  ngOnInit() {
    this.track = JSON.parse(localStorage['playlist']);

  }

  readFileAsText(file){
    return new Promise((resolve, reject) => {
        let fr = new FileReader();

        fr.onload = () => {

          this.track.push({
              name: file.name,
              path: (<string> fr.result)
            });

            //localStorage['playlist'] = JSON.stringify(this.track);
        };

        fr.onerror = function(){
            reject(fr);
        };

        fr.readAsDataURL(file);
    });
}

  openFile(event: any) {
      var input = event.target;
      let readers = [];

      Array.from(input.files).forEach((file: Blob, index) => {
        readers.push(this.readFileAsText(file));
      })

      // only trigger the promises
      Promise.all(readers).then((values) => {});
  };

  setTrack() {

  }
}
