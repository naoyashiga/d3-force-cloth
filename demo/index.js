const d3 = require("d3")

class Viz {
  constructor() {

    this.ticked = this.ticked.bind(this)
    this.dragSubject = this.dragSubject.bind(this)
    this.dragStarted = this.dragStarted.bind(this)
    this.dragged = this.dragged.bind(this)
    this.dragEnded = this.dragEnded.bind(this)
    this.drawLink = this.drawLink.bind(this)
    this.drawNode = this.drawNode.bind(this)

    const n = 20

    this.nodes = d3.range(n * n).map((i) => {
      return {
        index: i
      }
    })

    this.links = []

    for (let y = 0; y < n; ++y) {
      for(let x = 0; x < n; ++x) {
        if(y > 0) {
          this.links.push({
            source: (y - 1) * n + x,
            target: y * n + x
          })
        }

        if(x > 0) {
          this.links.push({
            source: y * n + (x - 1),
            target: y * n + x
          })
        }
      }
    }


    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = this.width
    this.canvas.height = this.height


    this.simulation = d3.forceSimulation(this.nodes)
    .force('charge', d3.forceManyBody().strength(-30))
    .force('link', d3.forceLink(this.links).strength(1).distance(20).iterations(10))
    .on('tick', this.ticked)

    d3.select(this.canvas)
    .call(d3.drag()
      .container(this.canvas)
      .subject(this.dragSubject)
      .on('start', this.dragStarted)
      .on('drag', this.dragged)
      .on('end', this.dragEnded))
  }

  ticked() {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.save()
    this.context.translate(this.width / 2, this.height / 2)

    this.context.beginPath()
    this.links.forEach(this.drawLink)
    this.context.strokeStyle = '#aaa'
    this.context.stroke()

    this.context.beginPath()
    this.nodes.forEach(this.drawNode)
    this.context.fill()
    this.context.strokeStyle = '#fff'
    this.context.stroke()

    this.context.restore()

  }

  dragSubject() {
    return this.simulation.find(d3.event.x - this.width / 2, d3.event.y - this.height / 2)
  }

  dragStarted() {

    if(!d3.event.active) {
      this.simulation.alphaTarget(0.3).restart()
    }

    d3.event.subject.fx = d3.event.subject.x
    d3.event.subject.fy = d3.event.subject.y

  }

  dragged() {
    d3.event.subject.fx = d3.event.x
    d3.event.subject.fy = d3.event.y
  }

  dragEnded() {
    if(!d3.event.active) {
      this.simulation.alphaTarget(0)
    }

    d3.event.subject.fx = null
    d3.event.subject.fy = null
  }

  drawLink(d) {
    this.context.moveTo(d.source.x, d.source.y)
    this.context.lineTo(d.target.x, d.target.y)

  }

  drawNode(d) {
    this.context.moveTo(d.x + 3, d.y)
    this.context.arc(d.x, d.y, 3, 0, 2 * Math.PI)
  }

}

new Viz()
