import { Icon, Button } from "semantic-ui-react";
import { differenceInMinutes } from "date-fns";
import useMedia from "use-media";
import ReactMapGl, { NavigationControl, Marker } from "react-map-gl";
import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback
} from "react";

import Context from "../../state/Context";
import api from "../../util/apiConnection";
import {
  CREATE_DRAFT,
  UPDATE_DRAFT,
  GET_PINS,
  SET_PIN
} from "../../state/types";

import "mapbox-gl/dist/mapbox-gl.css";

const initialViewport = {
  latitude: 30.267153,
  longitude: -97.743057,
  zoom: 13
};

const Map = () => {
  const [viewport, setViewport] = useState(initialViewport);
  const { state, dispatch } = useContext(Context);
  //Check if user is on mobile
  const mobile = useMedia({ maxWidth: 650 });

  useEffect(() => {
    const getPins = async () => {
      const pins = await api.get("/pins");
      dispatch({ type: GET_PINS, payload: pins.data });
    };
    getPins();
  }, [dispatch]);

  const handleMapClick = ({ lngLat, leftButton, target }) => {
    //If the user left clicks on the map start a pin draft
    if (!leftButton || target.className === "crosshairs icon") return;
    const [longitude, latitude] = lngLat;

    if (!state.draft) {
      dispatch({ type: CREATE_DRAFT });
    }
    dispatch({ type: UPDATE_DRAFT, payload: { longitude, latitude } });
  };

  const highlightNew = pin => {
    //Highlight pins created in the last 30 minutes
    const date = new Date(pin.createdAt);
    const isNew = differenceInMinutes(Date.now(), Number(date)) <= 30;
    return isNew ? "green" : "purple";
  };

  const getUserPosition = async () => {
    //If geolocation is available
    if ("geolocation" in navigator) {
      //Get user position and move the Viewport to it
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewport({
          ...viewport,
          latitude,
          longitude
        });
      });
    }
  };

  //Set currently select pin
  const setPin = useCallback(
    pin => {
      console.log("setpin");

      dispatch({ type: SET_PIN, payload: pin });
    },
    [dispatch]
  );

  const renderMarkers = useMemo(() => {
    console.log("markers");
    return state.pins.map(pin => (
      <Marker
        key={pin._id}
        latitude={pin.latitude}
        longitude={pin.longitude}
        offsetLeft={-19}
        offsetTop={-37}
        className="marker"
        captureClick={true}
      >
        <Icon
          name="marker"
          size="big"
          color={highlightNew(pin)}
          className="pin"
          onClick={() => setPin(pin)}
        />
      </Marker>
    ));
  }, [state.pins, setPin]);

  return (
    <div className="map-container">
      <ReactMapGl
        id="map"
        width="100%"
        height="calc(100vh - 72px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        onViewportChange={newViewport => setViewport(newViewport)}
        scrollZoom={!mobile}
        onClick={handleMapClick}
        {...viewport}
      >
        <Button
          onClick={getUserPosition}
          icon="crosshairs"
          className="mapboxgl-ctrl-group"
          id="user-pos"
        ></Button>
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
            <Icon name="marker" size="big" color="pink" />
          </Marker>
        )}
        {renderMarkers}
      </ReactMapGl>
    </div>
  );
};
export default Map;
