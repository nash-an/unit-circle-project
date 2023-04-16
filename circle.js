const sections = [
  { start: 0, end: 30, coordinates: "(√3/2, 1/2)", radians: "π/6", tangent: "√3/3", triangle: "30 60 90", image: "https://dr282zn36sxxg.cloudfront.net/datastreams/f-d%3A2137f9260ec56f99d7ee22fc3982e5a841f219551a61f5388f3014c2%2BIMAGE_TINY%2BIMAGE_TINY.1" },
  { start: 30, end: 45, coordinates: "(√2/2, √2/2)", radians: "π/4", tangent: "1", triangle: "45 45 90", image: "https://cdn.discordapp.com/attachments/982453295509557268/1096893389728907274/IMG_4534.png" },
  { start: 45, end: 60, coordinates: "(1/2, √3/2)", radians: "π/3", tangent: "√3", triangle: "90 60 30", image: "https://blog.collegevine.com/wp-content/uploads/2019/01/306090-triangle1.png" },
  { start: 60, end: 90, coordinates: "(0, 1)", radians: "π/2", tangent: "undefined" },
  { start: 90, end: 120, coordinates: "(-1/2, √3/2)", radians: "2π/3", tangent: "-√3" },
  { start: 120, end: 135, coordinates: "(-√2/2, √2/2)", radians: "3π/4", tangent: "-1" },
  { start: 135, end: 150, coordinates: "(-√3/2, 1/2)", radians: "5π/6", tangent: "-√3/3" },
  { start: 150, end: 180, coordinates: "(-1, 0)", radians: "π", tangent: "0"},
  { start: 180, end: 210, coordinates: "(-√3/2, -1/2)", radians: "7π/6", tangent: "√3/3"},
  { start: 210, end: 225, coordinates: "(-√2/2, -√2/2)", radians: "5π/4", tangent: "1" },
  { start: 225, end: 240, coordinates: "(-1/2, -√3/2)", radians: "4π/3", tangent: "√3" },
  { start: 240, end: 270, coordinates: "(0, -1)", radians: "3π/2", tangent: "undefined" },
  { start: 270, end: 300, coordinates: "(1/2, -√3/2)", radians: "5π/3", tangent: "-√3" },
  { start: 300, end: 315, coordinates: "(√2/2, -√2/2)", radians: "7π/4", tangent: "-1" },
  { start: 315, end: 330, coordinates: "(√3/2, -1/2)", radians: "11π/6", tangent: "-√3/3" },
  { start: 330, end: 360, coordinates: "(1, 0)", radians: "2π or 0", tangent: "0"}
];


const canvas = document.getElementById("unitCircle");
const context = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 130;
const counterClockwise = false;


function drawUnitCircle() {
  sections.forEach((section, index) => {
    const startAngleRad = (section.start* Math.PI) / 180;
    const endAngleRad = (section.end* Math.PI) / 180;

    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(
      centerX,
      centerY,
      radius,
      startAngleRad,
      endAngleRad,
      counterClockwise
    );
    context.closePath();
    context.fillStyle = section.selected ? "#fccccb" : "white";
    context.strokeStyle = "black";
    context.lineWidth = section.selected ? 2 : 1;
    context.fill();
    context.stroke();

    // Add text outside of each arc
    const textRadius = radius + 22; // distance from arc
    const textX = centerX + textRadius * Math.cos(startAngleRad);
    const textY = centerY + textRadius * Math.sin(startAngleRad);
    context.fillStyle = section.selected ? "red" : "black";
    context.font = "12px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(
      sections[15-index].end == 360 ? "0, 360" : sections[15-index].end,
      textX,
      textY
    );

    // Restore the canvas state
    context.restore();
  });

  sections.forEach((section) => {
    if (section.end <= 360 && section.end >= 315) {
      const endAngleRad = (section.start* Math.PI) / 180;
      const endX = centerX + radius * Math.cos(endAngleRad);
      const endY = centerY + radius * Math.sin(endAngleRad); // Adjust for flipped canvas
      context.beginPath();
      context.moveTo(endX, endY);
      context.lineTo(endX, centerY);
      context.closePath();
      context.strokeStyle = "red";
      context.lineWidth = 2;
      context.stroke();
    }
  });
}

drawUnitCircle();



canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = rect.bottom - event.clientY;

  let clickedAngleRad = Math.atan2(mouseY - centerY, mouseX - centerX);
  if (clickedAngleRad < 0) {
    clickedAngleRad += 2 * Math.PI;
  }

  sections.forEach((section, index) => {
    const startAngleRad = (section.start* Math.PI) / 180;
    const endAngleRad = (section.end* Math.PI) / 180;

    if (clickedAngleRad >= startAngleRad && clickedAngleRad <= endAngleRad) {
      document.getElementById('output').innerHTML = `
        <h1>Angle ${index+1}</h1>
        <p>Degrees: ${section.end == 360 ? "0, 360" : section.end}</p>
        <p>Radians: ${section.radians}</p>
        <p>Coordinates: ${section.coordinates}</p>
        <p>Tangent: ${section.tangent}</p>
        ${section.triangle ? "<span>Triangle: " + section.triangle + "</span>" : ""}
        ${section.image ? "<div id='image_wrapper'><img src='" + section.image + "'></div>" : ""}
      `
      sections[15-index].selected = true;
    } else {
      sections[15-index].selected = false;
    }
  });

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawUnitCircle();
});