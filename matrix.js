let buffer = [];
let serial;

let pcPort = 'COM3'
let macPort = '/dev/tty.usbmodem132908800'

let bufferLength
const tilesX = 1; 
const tilesY = 1;
const matrixWidth = 64; 
const matrixHeight = 64; 
const numChannels = 3;

let tex;

let anim;

let frames = 100;

function setup() {
  pixelDensity(1);

  createCanvas(640, 640);
  tex = createGraphics(64,64);

  bufferLength = tilesX * matrixWidth * tilesY * matrixHeight * numChannels;

  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);   

  serial.list();                      // list the serial ports
  serial.open(pcPort);    

  //serial.clear()
  anim = new Anim()
}

function draw() {

    anim.render();

    //image(tex, 0,0 )
    tex.loadPixels();
    //background(80);
    let previewSize =10 
    fill(0);
    noStroke();
  
    let idx = 0;
    let id = 0
    for(let i = 0; i < matrixHeight; i++) {
      for(let j = 0; j < matrixWidth; j++) {
        //gonna change this with (i + j * width)*4 for pixels
        buffer[id] = tex.pixels[idx]
        let r = tex.pixels[idx]
        id++;
        idx++;
        buffer[id] = tex.pixels[idx]
        let g = tex.pixels[idx]
        id++;
        idx++
        buffer[id] = tex.pixels[idx]
        let b = tex.pixels[idx]
        id++;
        idx++
        idx++
        fill(r,g,b);
        let y = i * previewSize
        let x = j * previewSize
        
        rect(x, y, previewSize, previewSize);
      }
  
    }
    
    serial.available()
    serial.clear()
    
    serial.write('*');     // The 'data' command
    serial.write(buffer);
}

function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      console.log(i + portList[i]);
    }
  }

function serverConnected() {
    console.log('connected to server.');
  }
   
  function portOpen() {
    console.log('the serial port opened.')
  }
   
  function serialEvent() {
   
  }
   
  function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
  }
   
  function portClose() {
    console.log('The serial port closed.');
  }