import { useEffect, useState } from "react";
import MapLocation from "./MapLocation";
import "./MapStyle.css";
import DistanceDisplay from "./DistanceDisplay";
import React from "react";

export default function Map() {
  const [locations, setLocations] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);

  useEffect(() => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((dataObject) => {
        dataObject.forEach((entry) => {
          entry.active = false;
        });

        setLocations(dataObject);
      });
  });

  const locationEls = locations.map((location) => (
    <MapLocation
      position={location.position}
      key={location.id}
      active={location.active}
      userSelected={() => {
        selectLocation(location);
      }}
    />
  ));

  let linesList = [];
  //only draw lines if enough selected
  if (selectedPoints.length > 1) {
    for (var i = 0; i < selectedPoints.length - 1; i++) {
      let p1 = selectedPoints[i].position;
      let p2 = selectedPoints[i + 1].position;
      linesList.push(
        <line x1={p1.x} x2={p2.x} y1={p1.y} y2={p2.y} stroke="black"></line>
      );
    }
  }
  function selectLocation(location) {
    location.active = true;
    setLocations([...locations]);

    selectedPoints.push(location);
    setSelectedPoints([...selectedPoints]);
  }

  return (
    <div>
      <DistanceDisplay locations={selectedPoints} />
      <svg width="500" height="500">
        {locationEls}
        {linesList}
      </svg>
    </div>
  );
}
