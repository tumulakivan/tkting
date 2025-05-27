import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { AxiosError } from "axios";
import { useAuth } from "../contexts/AuthContext";
import styles from "./ParkingMap.module.css";

interface User {
  idNumber: string;
  firstName: string;
  lastName: string;
  type: string;
}

interface ParkingSlot {
  slotId: number;
  status: boolean;
  user: User | null;
}

interface ParkingArea {
  areaId: number;
  areaName: string;
  totalSlots: number;
  availableSlots: number;
  parkingSlots: ParkingSlot[];
}

const ParkingMap: React.FC = () => {
  const [parkingAreas, setParkingAreas] = useState<ParkingArea[]>([]);
  const [error, setError] = useState<string>("");
  const [userOccupiedSlot, setUserOccupiedSlot] = useState<number | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchParkingAreas();
  }, [user]);

  const fetchParkingAreas = async () => {
    try {
      const response = await axios.get("/parkingArea/");
      setParkingAreas(response.data);

      // Find if user is already occupying a slot
      let foundOccupiedSlot = false;
      response.data.forEach((area: ParkingArea) => {
        area.parkingSlots.forEach((slot) => {
          if (slot.status && slot.user?.idNumber === user?.idNumber) {
            setUserOccupiedSlot(slot.slotId);
            foundOccupiedSlot = true;
          }
        });
      });
      if (!foundOccupiedSlot) {
        setUserOccupiedSlot(null);
      }
    } catch (error) {
      setError("Failed to fetch parking areas");
      console.error("Failed to fetch parking areas:", error);
    }
  };

  const handleSlotClick = async (slot: ParkingSlot) => {
    try {
      if (slot.user?.idNumber === user?.idNumber) {
        // Vacating our slot
        const response = await axios.put(
          `/parkingSlot/updateUser/${slot.slotId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setUserOccupiedSlot(null);
          await fetchParkingAreas();
        }
      } else if (!slot.status && !userOccupiedSlot) {
        // Occupying an empty slot
        const response = await axios.put(
          `/parkingSlot/updateUser/${slot.slotId}?userIdNumber=${user?.idNumber}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setUserOccupiedSlot(slot.slotId);
          await fetchParkingAreas();
        }
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        switch (axiosError.response.status) {
          case 404:
            setError("Slot or user not found");
            break;
          case 400:
            setError("You already have another parking slot assigned");
            break;
          default:
            setError("Failed to update parking slot");
        }
      } else {
        setError("Failed to update parking slot");
      }
      console.error("Error updating parking slot:", error);
    }
  };

  const isSlotClickable = (slot: ParkingSlot): boolean => {
    if (!user) return false;

    // Case 1: It's our occupied slot (we can click to vacate)
    if (slot.status && slot.user?.idNumber === user.idNumber) {
      return true;
    }

    // Case 2: It's an empty slot and we haven't occupied any slot
    if (!slot.status && !userOccupiedSlot) {
      return true;
    }

    // All other cases are not clickable
    return false;
  };

  return (
    <div className={styles.parkingMap}>
      <h1 className={styles.title}>Parking Map</h1>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {parkingAreas.map((area) => (
        <div key={area.areaId} className={styles.parkingArea}>
          <h2>{area.areaName}</h2>
          <div className={styles.parkingSlots}>
            {area.parkingSlots.map((slot) => (
              <div
                key={slot.slotId}
                className={`${styles.parkingSlot} ${
                  slot.status ? styles.occupied : styles.available
                } ${isSlotClickable(slot) ? styles.clickable : ""} ${
                  slot.user?.idNumber === user?.idNumber
                    ? styles.userOccupied
                    : ""
                }`}
                onClick={() => isSlotClickable(slot) && handleSlotClick(slot)}
              >
                <div className={styles.slotId}>#{slot.slotId}</div>
                {slot.status && (
                  <div className={styles.slotDetails}>
                    <div className={styles.userInfo}>
                      ID: {slot.user?.idNumber || "Unknown"}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.areaStats}>
            Available: {area.availableSlots} / {area.totalSlots}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParkingMap;
