type ITrack = {title:string} | null

abstract class AudioDevice {
  protected isPlaying: boolean = false
  protected currentTrack: ITrack = null

  constructor(){}

  play(track: ITrack):void {
    this.currentTrack = track
    this.isPlaying = true
    this.handlePlayCurrentAudioTrack()
  }

  abstract handlePlayCurrentAudioTrack(): void
}

class Boombox extends AudioDevice {
  constructor(){
    super()
  }

  handlePlayCurrentAudioTrack(){
    // Play through the boombox speakers
  }
}