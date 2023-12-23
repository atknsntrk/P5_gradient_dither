class Anim {

    constructor() {
      this.bayerMatrix = [
        [0, 8, 2, 10], 
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5]
      ]
      this.rows = tex.height
      this.c1 = color(0)
      this.c2 = color(99)
    }

    render() {

      tex.background(0);
      tex.clear()

      tex.push()
      for(let i = 0; i < this.rows; i++) {
        let n = map(i, 0, this.rows, 0, 1)
        let c = lerpColor(this.c1, this.c2, n) 
        tex.stroke(c)
        tex.line(i, 0, i, 64)
      }
      tex.pop()

      this.dither()
    }

    dither() {
      tex.loadPixels();

      for(let y = 1; y < tex.height; y++) {
        for(let x = 1; x < tex.width; x++) {
          let idx = (x + y * tex.height) * 4
          let redOld = tex.pixels[idx + 0]
          let greenOld = tex.pixels[idx + 1]
          let blueOld = tex.pixels[idx + 2]

          let redNew = this.apply_bayer(redOld, x%4, y%4)
          let greenNew = this.apply_bayer(greenOld, x%4, y%4)
          let blueNew = this.apply_bayer(blueOld, x%4, y%4)

          tex.pixels[idx + 0] = redNew
          tex.pixels[idx + 1] = greenNew
          tex.pixels[idx + 2] = blueNew
        }
      }
      tex.updatePixels()
    }

    apply_bayer(value, x, y) {
      let threshold = this.bayerMatrix[x][y]

      if (value > threshold* 6) {
        return 255;
      } else {
        return 0
      }
    }

}