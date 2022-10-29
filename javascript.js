const gamesURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"

const req = new XMLHttpRequest();
            req.open("GET",gamesURL, true);
            req.send();
            req.onload = function(){
              const json = JSON.parse(req.responseText);
              const categorias = json["children"]

let canvas = d3.select("#canvas")

let legend = d3.select("#legend")

let tooltip = d3.select("body")
                .append("div")
                .attr("id", "tooltip")
                .style("visibility", "hidden")
                .style("position", "absolute");

let hierarchy = d3.hierarchy(json, (d) => {
  return d["children"]
}).sum((d) => {
  return d["value"]
}).sort((d1, d2) => {
  return d2["value"] - d1["value"]
})

let createTreeMap = d3.treemap()
                      .size([950, 650])

const tiles = hierarchy.leaves();

createTreeMap(hierarchy)

let block = canvas.selectAll("g")
                  .data(tiles)
                  .enter()
                  .append("g")
                  .attr("transform", (d) => {
                    return "translate (" + d["x0"] + ", " + d["y0"] + ")"
                  })

   block.append("rect")
        .attr("class","tile")
        .attr("fill", (d) => {
          let category = d["data"]["category"]
          switch (category) {
           case "Wii":
            return "rgb(76, 146, 195)"
             break;
           case "DS":
           return "rgb(190, 210, 237)"
             break;
           case "X360":
           return "rgb(255, 153, 62)"
             break;
           case "GB":
           return "rgb(255, 201, 147)"
             break;
           case "PS3":
           return "rgb(86, 179, 86)"
             break;
           case "NES":
           return "rgb(173, 229, 161)"
             break;
           case "PS2":
           return "rgb(255, 173, 171)"
             break;
           case "3DS":
           return "rgb(163, 120, 111)"
             break;
           case "PS4":
           return "rgb(208, 176, 169)"
             break;
           case "SNES":
           return "rgb(222, 82, 83)"
             break;
           case "PS":
           return "rgb(169, 133, 202)"
             break;
           case "N64":
           return "rgb(233, 146, 206)"
             break;
           case "GBA":
           return "rgb(153, 153, 153)"
             break;
           case "XB":
           return "rgb(210, 210, 210)"
             break;
           case "PC":
           return "rgb(201, 202, 78)"
             break;
           case "2600":
           return "rgb(209, 192, 221)"
             break;
           case "PSP":
           return "rgb(249, 197, 219)"
             break;
           case "XOne":
           return "rgb(226, 226, 164)"
             break;
           default:
             return "black"
         }
        })
        .attr("data-name", (d) => d["data"]["name"])
        .attr("data-category", (d) => d["data"]["category"])
        .attr("data-value", (d) => d["data"]["value"])
        .attr("width", (d) => {
          return d["x1"] - d["x0"]
        })
        .attr("height", (d) => {
          return d["y1"] - d["y0"]
        })
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible")
                 .style('top', event.pageY - 50 + 'px')
                 .style('left', event.pageX + 20 + 'px')
                 .attr("data-value", d["data"]["value"]);

          tooltip.html(
            d["data"]["name"] + "<br />" + "$ " + d["data"]["value"] + " million" + "<br />" + d["data"]["category"]
          )
        })
        .on("mouseout", (event, d) => {
          tooltip.style("visibility", "hidden")
        })

    block.append("text")
         .text((d) => {
           return d["data"]["name"]
         })
         .attr("x", 5)
         .attr("y", 20)
         .style("font-size", "13")

console.log(tiles)
legend.selectAll("rect")
      .data(categorias)
      .enter()
      .append("rect")
      .attr("class","legend-item")
      .attr("width", "20px")
      .attr("height", "20px")
      .attr("x", (d, i) => {
        if (i < 6) {
          return "0px"
        } else if (i < 12) {
          return "150px"
        } else if (i < 18) {
          return "300px"
        }
      })
      .attr("y", (d, i) => {
        if (i < 6) {
          return i * 40
        } else if (i < 12) {
          return (i - 6) * 40
        } else if (i < 18) {
          return (i - 12) * 40
        }
      })
      .attr("fill", (d) => {
        let category = d["name"]
        switch (category) {
         case "Wii":
          return "rgb(76, 146, 195)"
           break;
         case "DS":
         return "rgb(190, 210, 237)"
           break;
         case "X360":
         return "rgb(255, 153, 62)"
           break;
         case "GB":
         return "rgb(255, 201, 147)"
           break;
         case "PS3":
         return "rgb(86, 179, 86)"
           break;
         case "NES":
         return "rgb(173, 229, 161)"
           break;
         case "PS2":
         return "rgb(255, 173, 171)"
           break;
         case "3DS":
         return "rgb(163, 120, 111)"
           break;
         case "PS4":
         return "rgb(208, 176, 169)"
           break;
         case "SNES":
         return "rgb(222, 82, 83)"
           break;
         case "PS":
         return "rgb(169, 133, 202)"
           break;
         case "N64":
         return "rgb(233, 146, 206)"
           break;
         case "GBA":
         return "rgb(153, 153, 153)"
           break;
         case "XB":
         return "rgb(210, 210, 210)"
           break;
         case "PC":
         return "rgb(201, 202, 78)"
           break;
         case "2600":
         return "rgb(209, 192, 221)"
           break;
         case "PSP":
         return "rgb(249, 197, 219)"
           break;
         case "XOne":
         return "rgb(226, 226, 164)"
           break;
         default:
           return "black"
       }
      })
legend.selectAll("text")
      .data(categorias)
      .enter()
      .append("text")
      .text((d) => d["name"])
      .attr("x", (d, i) => {
        if (i < 6) {
          return "30px"
        } else if (i < 12) {
          return "180px"
        } else if (i < 18) {
          return "330px"
        }
      })
      .attr("y", (d, i) => {
        if (i < 6) {
          return 15 + i * 40
        } else if (i < 12) {
          return 15 + (i - 6) * 40
        } else if (i < 18) {
          return 15 + (i - 12) * 40
        }
      })

console.log(categorias)

}
