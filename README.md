# openStreetMap-d3-tile
![2016-09-21 19 20 34](https://cloud.githubusercontent.com/assets/1988660/18707360/a532c5b0-8030-11e6-8674-45974831a4a7.png)

Dummy geo data is around Tokyo Tower on open street map :tokyo_tower:


##Dummy Data

###Tokyo Tower
```js
// Tokyo Tower Geo Data
const location = {
  latitude: 35.658581,
  longitude: 139.745433
}
```
The center of this map is Tokyo Tower.

### How to make dummy data
```js

const locationsCount = 500

const locations = d3.range(locationsCount).map(() => {

  const wiggleScale = 0.01
  const lng = location.longitude + wiggle(wiggleScale)
  const lat = location.latitude + wiggle(wiggleScale)

  return {
    type: "Feature",
    geometry: {type: "Point", coordinates: [+lng, +lat]}
  }

})

function wiggle(scale) {
  return d3.randomNormal()() * scale
}
```
It is easy to make dummy data if you use [d3.randomNormal](https://github.com/d3/d3-random/blob/master/README.md#randomNormal).

##Tile Style

```js
image.enter().append('image')
.attr("xlink:href", (d) => {
  return "http://www.toolserver.org/tiles/bw-mapnik/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";

  // another styles
  // return "http://" + "abc"[d[1] % 3] + ".tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
})
```

I used monochrome style. If you modify image url, you can change other tile style :+1:

#Usage

##Start
```
$npm start
```

##Build
```
$npm run production
```

#Reference
- [d3/d3-tile: Compute the quadtree tiles to display in a rectangular viewport.](https://github.com/d3/d3-tile)
- [Raster & Vector IV - bl.ocks.org](http://bl.ocks.org/mbostock/9535021)

#License
MIT
