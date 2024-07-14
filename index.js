const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

inquirer
  .prompt([
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters:',
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'TEXT COLOR: Enter a color keyword:',
    },
	{
        type: 'input',
        name: 'shapeColor',
        message: 'SHAPE COLOR: Enter a color keyword:',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'square', 'triangle'],
    },
    
  ])
  .then(answers => {
    // function that takes the answers and creates an SVG content
    const svgContent = createSVG(answers);
    writeToFile(svgContent);
  });

 // Save to logo.svg
 function writeToFile(svgContent) {
 fs.writeFileSync('logo.svg', svgContent);
 console.log('Congratulations, you have Generated a logo.svg!');
 };

//createSVG function 
function createSVG(answers) {
    const { shape, shapeColor, text, textColor } = answers;
    let shapeSvg = '';

    switch (shape) {
        case 'circle':
            shapeSvg = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
            break;// Prevents the execution from falling through to the next case
            
        case 'square':
            shapeSvg = `<rect x="60" y="35" width="175" height="175" fill="${shapeColor}" />`;
            break;
            
        case 'triangle':
            shapeSvg = `<polygon points="0,200 300,200 150,0" fill="${shapeColor}" />`;
            break;    
    }

  // Adding text to the SVG
  const textSvg = `<text x="150" y="125" fill="${textColor}" text-anchor="middle" font-size="60">${text}</text>`;

  return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${shapeSvg}${textSvg}</svg>`;
}

