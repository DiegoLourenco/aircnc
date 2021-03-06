import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

export default function Dashboard({ history }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");

      const response = await api.get("/dashboard", {
        headers: { user_id }
      });

      setSpots(response.data);
    }
    loadSpots();
  }, []);

  function handleEditSpot(spot) {
    history.push(`/spots/${spot._id}`);
  }

  async function handleDestroySpot(spot_id) {
    await api.delete(`/spots/${spot_id}`);
    const spotsFiltered = spots.filter(spot => spot._id !== spot_id);
    setSpots(spotsFiltered);
  }

  return (
    <>
      <ul className="spots-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}>
              <div className="options">
                <button
                  className="btn-icon"
                  title="Editar"
                  onClick={() => handleEditSpot(spot)}
                >
                  <Edit htmlColor="#fff" fontSize="large" />
                </button>
                <button
                  className="btn-icon"
                  title="Remover"
                  onClick={() => handleDestroySpot(spot._id)}
                >
                  <Delete htmlColor="#fff" fontSize="large" />
                </button>
              </div>
            </header>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : "Gratuito"}</span>
          </li>
        ))}
      </ul>

      <Link to="/spots/new">
        <button className="btn btn-primary">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
