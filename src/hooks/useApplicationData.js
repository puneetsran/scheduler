import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: "SET_DAY", day }); // value: day??
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      dispatch({
        type: "SET_APPLICATION_DATA",
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });

    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.onopen = function(event) {
      webSocket.send("ping");
    };

    webSocket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      console.log("ping1", message);
      if (message.type === "SET_INTERVIEW") dispatch({ ...message });
      if (message.type === "SET_SPOTS") dispatch({ ...message });
      console.log("ping2", message);
    };
  }, []);

  function spotsRemaining(id, action) {
    let spotStatus = 1;
    if (action) spotStatus = -1;

    let updatedSpots = state.days.map(day => {
      const current = day.appointments.filter(day => day === id);
      if (current) {
        return { ...day, spots: day.spots + spotStatus };
      } else return day;
    });
    dispatch({ type: "SET_SPOTS", value: updatedSpots });
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(dispatch({ type: "SET_INTERVIEW", interview, id }))
      .then(spotsRemaining(id, true));
  }

  function cancelInterview(id) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(dispatch({ type: "SET_INTERVIEW", id, interview: null }))
      .then(spotsRemaining(id, false));
  }

  return { state, setDay, bookInterview, cancelInterview };
}
