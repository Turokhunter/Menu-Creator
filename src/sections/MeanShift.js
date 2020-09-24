class MeanShift{
  constructor(){
    this.minDistance = 0.00001;
    this.groupDistance = 0.1;
  }

  cluster(points, kernel_bandwidth){
    var shiftedPoints = points.slice();
    var maxMinDist = 1;
    var iterationNumber = 0;
    var numPoints = shiftedPoints.length;
    var stillShift = new Array(points.length).fill(true);    
    while (maxMinDist > this.minDistance){
      maxMinDist = 0;
      iterationNumber++;
      for(var i = 0; i < numPoints; i++){
        if (stillShift[i] === false){
          continue;
        }
        var p_new = shiftedPoints[i];
        var p_new_start = p_new;
        p_new = this._shift_points(p_new, points, kernel_bandwidth);
        var distance = Math.abs(p_new - p_new_start);
        maxMinDist = Math.max(maxMinDist, distance);
        if(distance < this.minDistance){
          stillShift[i] = false;
        }
        shiftedPoints[i] = p_new;
      }
    }
    var groupAssignment = this._pointGrouper(shiftedPoints);
    return [points, shiftedPoints, groupAssignment];
  }

  _shift_points(point, points, kernel_bandwidth){
    var shift_point = 0.0;
    var scaleFactor = 0.0;
    //  from http://en.wikipedia.org/wiki/Mean-shift
    points.forEach((p_temp)=>{
      var dist = Math.abs(point - p_temp);
      var weight = this._gaussian_kernel(dist, kernel_bandwidth);
      shift_point += p_temp * weight;
      scaleFactor += weight;
    })

    shift_point = shift_point / scaleFactor;
    return shift_point;
  }

  _gaussian_kernel(distance, bandwidth){
    return (1/(bandwidth*Math.sqrt(2*Math.PI))) * Math.exp(-0.5*((distance / bandwidth))**2);
  }

  _pointGrouper(points){
    var groupAssignment = []
    var groups = []
    var groupIndex = 0;
    points.forEach((point)=> {
      //determine distance to group
      const nearestGroup = this._findNearestGroup(point, groups);
      if(nearestGroup === undefined){
        //Create a new group
        groups.push([point]);
        groupAssignment.push(groupIndex);
        groupIndex++;
      } else {
        //add to existing group
        groupAssignment.push(nearestGroup);
        groups[nearestGroup].push(point);
      }
    });
    return groupAssignment;
  }
  _findNearestGroup(point, groups){
    var nearestGroup = undefined
    var index = 0
    groups.forEach((group)=> {
      var distance2Grp = Number.MAX_VALUE;
      group.forEach((p)=>{
        distance2Grp = Math.min(distance2Grp, Math.abs(p - point));
      })
      if(distance2Grp < this.groupDistance){
        nearestGroup = index;//Why keep searching?
      }
      index++;
    })
    return nearestGroup;
  }
 
}

export default MeanShift;