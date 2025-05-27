import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextToSpeechService {
  constructor(private http: HttpClient) {}

  speakText(text: string) {
    const url = 'https://voicerss-text-to-speech.p.rapidapi.com/';
    const headers = new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'ecfbad8544msh453241bd58cf44ep16fe62jsn8cc0b5af0636',
      'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com',
    });

    const body = new URLSearchParams({
      key: '9a94dd7a32e7441e87382becb1a8396f', 
      hl: 'en-us',
      src: text,
      r: '0',
      c: 'mp3',
      f: '8khz_8bit_mono',
    });

    this.http
      .post(url, body.toString(), { headers, responseType: 'blob' })
      .subscribe((audioResponse) => {
        console.log(audioResponse)
        const audioUrl = URL.createObjectURL(audioResponse);
        const audio = new Audio(audioUrl);
        audio.play();
      });
  }
}
