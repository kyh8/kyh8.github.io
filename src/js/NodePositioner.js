export class NodePositioner {
  static getPositions(numNodes: number, radius: number): Array<Object> {
    const positions = [];
    for (let index = 0; index < numNodes; index++) {
      let bottom;
      let left;
      if (numNodes > 1) {
        const angle = Math.PI/(numNodes - 1);
        bottom = radius * Math.sin(angle * index);
        left = radius * Math.cos(angle * index);
      } else {
        bottom = radius;
        left = 0;
      }
      positions.push({
        bottom,
        left,
      });
    }
    return positions;
  }
}

module.exports = NodePositioner;
