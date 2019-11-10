import React, { useState, useEffect, useContext } from "react";
import ReactMapGl, { NavigationControl, Marker } from "react-map-gl";
import { Icon } from "semantic-ui-react";
import "mapbox-gl/dist/mapbox-gl.css";

import Context from "../../state/context";
import { CREATE_DRAFT, UPDATE_DRAFT, GET_PINS } from "../../state/types";
import Blog from "./Blog";
import api from "../../util/apiConnection";
import { differenceInMinutes, isDate } from "date-fns";

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
  useEffect(() => {
    const getPins = async () => {
      const pins = await api.get("/pins");
      dispatch({ type: GET_PINS, payload: pins.data });
    };
    getPins();
  }, []);
  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    const [longitude, latitude] = lngLat;

    if (!state.draft) {
      dispatch({ type: CREATE_DRAFT });
    }
    dispatch({ type: UPDATE_DRAFT, payload: { longitude, latitude } });
  };
  const highlightNew = pin => {
    const date = new Date(pin.createdAt);
    const isNew = differenceInMinutes(Date.now(), Number(date)) <= 30;
    return isNew ? "green" : "purple";
  };
  return (
    <div className="map-container">
      <ReactMapGl
        id="map"
        width="100%"
        height="calc(100vh - 68px)"
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
        {state.pins.map(pin => (
          <Marker
            key={pin._id}
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <Icon name="map pin" size="big" color={highlightNew(pin)} />
          </Marker>
        ))}
      </ReactMapGl>
      <Blog />
    </div>
  );
};
export default Map;
