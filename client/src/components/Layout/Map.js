import React, { useState, useEffect, useContext } from "react";
import ReactMapGl, { NavigationControl, Marker } from "react-map-gl";
import { Icon } from "semantic-ui-react";
import "mapbox-gl/dist/mapbox-gl.css";

import Context from "../../state/context";
import { CREATE_DRAFT, UPDATE_DRAFT } from "../../state/types";
import Blog from "./Blog";

const initialViewport = {
  latitude: 30.267153,
  longitude: -97.743057,
  zoom: 13,
};
const Map = () => {
  const [viewport, setViewport] = useState(initialViewport);
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    const getUserPosition = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          setViewport({ ...viewport, latitude, longitude });
        });
      }
    };
    getUserPosition();
  }, [viewport]);

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    const [longitude, latitude] = lngLat;

    if (!state.draft) {
      dispatch({ type: CREATE_DRAFT });
    }
    dispatch({ type: UPDATE_DRAFT, payload: { longitude, latitude } });
  };
  return (
    <div>
      <ReactMapGl
        width="100%"
        height="95vh"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiZ25hdGFsaWUiLCJhIjoiY2syc2JibzMwMHl4MzNvbnZxdGE4eThnYiJ9.Y4atD9eDNRJ9FDyPnUmGdQ"
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={handleMapClick}
        {...viewport}
      >
        <NavigationControl
          onViewportChange={newViewport => setViewport(newViewport)}
        />
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <Icon name="map pin" size="big" color="pink" />
          </Marker>
        )}
      </ReactMapGl>
      <Blog />
    </div>
  );
};
export default Map;
