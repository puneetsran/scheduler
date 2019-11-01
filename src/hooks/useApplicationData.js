import { useEffect, useReducer } from "react";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "SET_DAY":
      return { ...state, day: action.day };

    case "SET_APPLICATION_DATA":
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };

    case "SET_INTERVIEW": {
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview || null
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      return { ...state, appointments };
    }

    case "SET_SPOTS": {
      return { ...state, days: action.value };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

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

    const webSocket = new WebSocket("ws://localhost:8001");

    webSocket.onopen = function(event) {
      webSocket.send("Sending data to the server");
    };

    webSocket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      console.log("ping1");
      if (message.type === "SET_INTERVIEW") dispatch({ ...message });
      console.log("ping2");
    };
  }, []);

  function spotsRemaining(id, action) {
    let spotStatus = 1;
    if (action) spotStatus = -1;

    let updatedSpots = state.days.map(day => {
      const current = day.appointments.filter(day => day === id);

      if (current.length > 0) {
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
